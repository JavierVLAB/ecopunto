from fastapi import FastAPI

app = FastAPI(docs_url="/api/doc")

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}