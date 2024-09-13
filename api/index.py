from fastapi import FastAPI, HTTPException
import requests
from pydantic import BaseModel
import os

app = FastAPI(
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Configura los detalles de autenticación de tu app de Azure AD

# Modelo de respuesta para enviar el token
class TokenResponse(BaseModel):
    access_token: str

@app.get("/api/token", response_model=TokenResponse)
def get_token():
    # Parámetros para la solicitud del token
    url = "https://login.microsoftonline.com/6d3d1871-d11d-4430-bfdb-65c462c4bd2f/oauth2/v2.0/token"

    print("eltonkens")
    print(os.getenv("NEXT_PUBLIC_CRM_CS"))

    params = {'grant_type': 'client_credentials',
    'client_id': 'c1613d8f-2173-4f41-b559-afe735b3a5b9',
    'client_secret': os.getenv("NEXT_PUBLIC_CRM_CS"),
    'scope': 'https://service.flow.microsoft.com//.default'}

    
    try:
        return {"access_token": os.getenv("NEXT_PUBLIC_CRM_CS")}
        # Solicitud a Microsoft para obtener el token
        response = requests.request("POST", url, data=params)
        response.raise_for_status()
        
        token_data = response.json()
        print(token_data)
        return {"access_token": token_data["access_token"]}
    
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Error al obtener el token") from e

