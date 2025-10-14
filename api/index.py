from fastapi import FastAPI, HTTPException
import requests
from pydantic import BaseModel
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Configurar los orígenes permitidos (en este caso, localhost y tu frontend en Vercel)
origins = [
    "http://localhost:3000",  # Permitir solicitudes desde localhost:3000
    "https://ecopunto-gilt.vercel.app",  # Permitir solicitudes desde tu app desplegada en Vercel
]

# Agregar el middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir solo estos orígenes
    allow_credentials=True,  # Permitir el uso de cookies y credenciales
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)
class TokenResponse(BaseModel):
    access_token: str

@app.get("/api/token", response_model=TokenResponse)
def get_token():
    # Parámetros para la solicitud del token
    url = "https://login.microsoftonline.com/6d3d1871-d11d-4430-bfdb-65c462c4bd2f/oauth2/v2.0/token"

    print("eltonkens")
    print(os.getenv("NEXT_PUBLIC_CRM_CS"))

    params = {'grant_type': 'client_credentials',
    'client_id': 'e766a9e0-6b5b-4adb-b9e6-7d26eacfe16f',#'client_id': 'c1613d8f-2173-4f41-b559-afe735b3a5b9',
    'client_secret': os.getenv("NEXT_PUBLIC_CRM_CS"),
    'scope': 'https://service.flow.microsoft.com//.default'}

    
    try:

        # Solicitud a Microsoft para obtener el token
        response = requests.request("POST", url, data=params)
        response.raise_for_status()
        
        token_data = response.json()

        return {"access_token": token_data["access_token"]}
    
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Error al obtener el token") from e

