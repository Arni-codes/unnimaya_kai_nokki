"""
FastAPI Backend for KAI NOKKI (AI Jothishyan)
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any

from palm.detector import extract_palm_geometry
from palm.analyzer import generate_humorous_observations
from ai.chatbot import get_jothishyan_response
from voice.tts import generate_tts_audio
from websocket.signaling import manager

app = FastAPI(title="KAI NOKKI API", version="1.0.0")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PalmAnalyzeRequest(BaseModel):
    image: Optional[str] = None
    landmarks: Optional[list] = None
    features: Optional[Dict[str, Any]] = None

class ChatRequest(BaseModel):
    question: str
    features: Optional[Dict[str, Any]] = None

class TTSRequest(BaseModel):
    text: str
    lang: Optional[str] = "ml"

@app.get("/api/health")
def health_check():
    return {"status": "online", "app": "KAI NOKKI (AI Jothishyan)"}

@app.post("/api/analyze-palm")
def analyze_palm(req: PalmAnalyzeRequest):
    features = req.features or extract_palm_geometry(req.landmarks)
    reading = generate_humorous_observations(features)
    return {
        "features": features,
        "reading": reading,
        "summary": reading["jothishyanOpening"],
        "audio_url": "/api/tts?text=" + reading["jothishyanOpening"]
    }

@app.post("/api/chat")
def chat_jothishyan(req: ChatRequest):
    answer = get_jothishyan_response(req.question, req.features)
    return {
        "question": req.question,
        "answer": answer,
        "audio_url": "/api/tts?text=" + answer
    }

@app.post("/api/tts")
def tts_endpoint(req: TTSRequest):
    audio_bytes = generate_tts_audio(req.text, req.lang)
    if audio_bytes:
        return Response(content=audio_bytes, media_type="audio/mpeg")
    return {"error": "TTS generation failed"}

@app.websocket("/ws/signaling")
async def websocket_endpoint(websocket: WebSocket):
    # Wait for join message to get room_id
    await websocket.accept()
    room_id = "default"
    try:
        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")
            room_id = data.get("roomId", "default")

            if msg_type == "join":
                await manager.connect(websocket, room_id)
            else:
                await manager.broadcast_to_room(data, room_id, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket, room_id)
