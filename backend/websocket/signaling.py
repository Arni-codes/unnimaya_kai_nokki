"""
WebSocket Signaling Manager for WebRTC Phone Camera Pairing
"""

from typing import Dict, List
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        # roomId -> list of WebSockets
        self.rooms: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.rooms:
            self.rooms[room_id] = []
        self.rooms[room_id].append(websocket)
        print(f"Client joined room {room_id}. Total in room: {len(self.rooms[room_id])}")

    def disconnect(self, websocket: WebSocket, room_id: str):
        if room_id in self.rooms:
            if websocket in self.rooms[room_id]:
                self.rooms[room_id].remove(websocket)
            if not self.rooms[room_id]:
                del self.rooms[room_id]

    async def broadcast_to_room(self, message: str, room_id: str, sender: WebSocket):
        if room_id in self.rooms:
            for connection in self.rooms[room_id]:
                if connection != sender:
                    await connection.send_text(message)

manager = ConnectionManager()
