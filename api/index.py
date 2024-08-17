from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
import os
import firebase_admin
from firebase_admin import credentials, firestore
import json




environment = os.getenv("ENVIRONMENT", "development")

# URL
url = ''
cred = None

if environment=='vercelproduction':
    url = 'https://ecopunto-gilt.vercel.app'
    firebase_credentials = os.getenv("FIREBASE_CREDENTIALS")
    cred = credentials.Certificate(json.loads(firebase_credentials))

if environment=='development':
    url = 'localhost:8000'
    cred = credentials.Certificate("/Users/javi/Documents/workspace/Propelland/ecopunto/api/ecopunto.json")

# Inicializar Firestore

firebase_admin.initialize_app(cred)
db = firestore.client()


# Crear un objeto timezone para GMT+2
gmt_plus_2 = timezone(timedelta(hours=2))

app = FastAPI(
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

class Event(BaseModel):
    event_name: str                 # APP Start, Incident, Quit, Success
    init_page: str                  # Contenedor, Local
    incidencia: str = None          # Contenedor lleno, Contenedor roto, Solicitud cubos, Whatsapp
    actual_page: str = None         # Cualquiera
    apiKey: str


# End point de prueba
@app.get("/api/python")
def hello_world():
    return {"message": environment}

# End point de prueba
@app.get("/api/test")
def test():
    return {"message": environment}

# Track event
@app.post("/api/track-event/")
async def add_event(event: Event):
    if event.apiKey != "ccVr886c888qvhYBg3pMj3oudziHJjMtIlpJgy-wWEA":
        return {"error": "Invalid API key"}
    
    data = {
        "event_name": event.event_name,
        "init_page": event.init_page,
        "incidencia": event.incidencia,
        "actual_page": event.actual_page,
        "apiKey": event.apiKey,
        "timestamp": datetime.now(gmt_plus_2)
    }
    db.collection('events').add(data)
    return {"message": "Event added successfully"}

# Endpoint para obtener todos los eventos
@app.get("/api/events")
async def get_events():    
    events_ref = db.collection('events').stream()
    events = []
    for event in events_ref:
        events.append(event.to_dict())
    return events


#######################

@app.get("/api/metrics/")
async def get_metrics():

    # Aquí NO necesitas inicializar Firestore de nuevo, solo usar `db`
    events_ref = db.collection('events')

    # Número total de conexiones
    total_connections_query = events_ref.where('event_name', '==', 'App Start')
    total_connections = len([doc for doc in total_connections_query.stream()])

    # Conexiones en "Contenedor" y "Local"
    init_page_connections_query = events_ref.where('event_name', '==', 'App Start')
    init_page_connections = {}
    for doc in init_page_connections_query.stream():
        data = doc.to_dict()
        init_page = data.get('init_page')
        if init_page in init_page_connections:
            init_page_connections[init_page] += 1
        else:
            init_page_connections[init_page] = 1

    # Número total de incidencias reportadas
    total_incidents_query = events_ref.where('event_name', '==', 'Incident')
    total_incidents = len([doc for doc in total_incidents_query.stream()])

    # Incidencias reportadas y su conteo
    incident_reports_query = events_ref.where('event_name', '==', 'Incident')
    incident_reports = {}
    for doc in incident_reports_query.stream():
        data = doc.to_dict()
        incidencia = data.get('incidencia')
        if incidencia in incident_reports:
            incident_reports[incidencia] += 1
        else:
            incident_reports[incidencia] = 1

    # Abandonos y en qué página ocurrieron
    abandonments_query = events_ref.where('event_name', '==', 'Quit')
    abandonments = {}
    for doc in abandonments_query.stream():
        data = doc.to_dict()
        actual_page = data.get('actual_page')
        if actual_page in abandonments:
            abandonments[actual_page] += 1
        else:
            abandonments[actual_page] = 1

    # Número total de abandonos
    total_quits = len([doc for doc in abandonments_query.stream()])

    return {
        "total_connections": total_connections,
        "init_page_connections": init_page_connections,
        "total_incidents": total_incidents,
        "incident_reports": incident_reports,
        "abandonments": abandonments,
        "total_quits": total_quits
    }

