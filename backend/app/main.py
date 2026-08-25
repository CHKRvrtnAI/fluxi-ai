from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.blueprints import router as blueprints_router
from .core.config import settings

app = FastAPI(
    title="Fluxi API",
    description="Process knowledge platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(blueprints_router, prefix="/api/v1")


@app.on_event("startup")
def startup():
    print(f"Fluxi API starting — ArangoDB configured at {settings.ARANGO_URL}")


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.API_HOST, port=settings.API_PORT)
