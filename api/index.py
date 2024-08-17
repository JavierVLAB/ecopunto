from fastapi import FastAPI
import sqlite3
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
import os

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

# Base de datos de enventos
conn = sqlite3.connect('events.db', check_same_thread=False)
cursor = conn.cursor()


# Crear la tabla para almacenar los eventos si no existe
cursor.execute('''
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT,
        init_page TEXT,
        incidencia TEXT,
        actual_page TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
''')
conn.commit()

class Event(BaseModel):
    event_name: str                 # APP Start, Incident, Quit, Success
    init_page: str                  # Contenedor, Local
    incidencia: str = None          # Contenedor lleno, Contenedor Roto, Solicitud Cubos, Whatsapp
    actual_page: str = None         # Cualquiera


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
async def track_event(event: Event):
    current_time = datetime.now(gmt_plus_2)

    cursor.execute('''
        INSERT INTO events (event_name, init_page, incidencia, actual_page,timestamp)
        VALUES (?, ?, ?, ?, ?)
    ''', (event.event_name, event.init_page, event.incidencia, event.actual_page, current_time))
    conn.commit()
    return {"status": "success", "event": event}

# Endpoint para obtener todos los eventos (para análisis)
@app.get("/api/events/")
async def get_events():

    cursor.execute('SELECT * FROM events')
    events = cursor.fetchall()
    return {"events": events}


#######################

@app.get("/api/metrics/")
async def get_metrics():
    # Número total de conexiones
    cursor.execute('SELECT COUNT(*) FROM events WHERE event_name = "App Start"')
    total_connections = cursor.fetchone()[0]

    # Conexiones en "Contenedor" y "Local"
    cursor.execute('SELECT init_page, COUNT(*) FROM events WHERE event_name = "App Start" GROUP BY init_page')
    init_page_connections = cursor.fetchall()

    # Número total de incidencias reportadas
    cursor.execute('SELECT COUNT(*) FROM events WHERE event_name = "Incident"')
    total_incidents = cursor.fetchone()[0]

    # Incidencias reportadas y su conteo
    cursor.execute('SELECT incidencia, COUNT(*) FROM events WHERE event_name = "Incident" GROUP BY incidencia')
    incident_reports = cursor.fetchall()

    # Abandonos y en qué página ocurriero
    cursor.execute('SELECT actual_page, COUNT(*) FROM events WHERE event_name = "Quit" GROUP BY actual_page')
    abandonments = cursor.fetchall()

    # Abandonos y en qué página ocurrieron
    cursor.execute('SELECT COUNT(*) FROM events WHERE event_name = "Quit"')
    tolal_quits = cursor.fetchone()[0]

    return {
        "total_connections": total_connections,
        "init_page_connections": init_page_connections,
        "total_incidents": total_incidents,
        "incident_reports": incident_reports,
        "abandonments": abandonments,
        "quits": tolal_quits
    }

