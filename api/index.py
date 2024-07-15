from fastapi import FastAPI

app = FastAPI(
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}