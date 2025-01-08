from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.routes.stats_routes import stats_routes

origins = ["http://localhost", "http://localhost:4200"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stats_routes, prefix="/api/stats")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
