
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
import os
import firebase_admin
from firebase_admin import credentials, firestore

# Inicializar Firestore
cred = credentials.Certificate("ruta/al/archivo/credentials.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

environment = os.getenv("ENVIRONMENT", "development")

# URL
url = ''

if environment=='vercelproduction':
    url = 'https://ecopunto-gilt.vercel.app'

if environment=='development':
    url = 'localhost:8000'

# Crear un objeto timezone para GMT+2
gmt_plus_2 = timezone(timedelta(hours=2))

app = FastAPI(
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Modelo Pydantic para el evento
class Event(BaseModel):
    event_name: str
    init_page: str
    incidencia: str
    actual_page: str
    apiKey: str

# Endpoint para agregar un evento
@app.post("/api/events")
async def add_event(event: Event):
    if event.apiKey != "TU_API_KEY_AQUI":
        return {"error": "Invalid API key"}
    
    data = {
        "event_name": event.event_name,
        "init_page": event.init_page,
        "incidencia": event.incidencia,
        "actual_page": event.actual_page,
        "timestamp": datetime.now(gmt_plus_2)
    }
    db.collection('events').add(data)
    return {"message": "Event added successfully"}

# Endpoint para obtener todos los eventos
@app.get("/api/events")
async def get_events(apiKey: str):
    if apiKey != "TU_API_KEY_AQUI":
        return {"error": "Invalid API key"}
    
    events_ref = db.collection('events').stream()
    events = []
    for event in events_ref:
        events.append(event.to_dict())
    return events
