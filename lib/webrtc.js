// WebRTC & WebSocket Connection Handler for Mobile Camera Streaming

export function generateRoomId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KAI-${result}`;
}

export class WebRTCStreamer {
  constructor(roomId, isHost = false, onRemoteStream = null, onStatusChange = null) {
    this.roomId = roomId;
    this.isHost = isHost; // PC is host (receiver), Phone is sender
    this.onRemoteStream = onRemoteStream;
    this.onStatusChange = onStatusChange;
    this.peerConnection = null;
    this.ws = null;
    this.localStream = null;
    this.isConnected = false;
  }

  // Initialize WebRTC Peer Connection
  initPeerConnection() {
    const config = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    };

    this.peerConnection = new RTCPeerConnection(config);

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(
          JSON.stringify({
            type: "candidate",
            roomId: this.roomId,
            candidate: event.candidate,
          })
        );
      }
    };

    this.peerConnection.ontrack = (event) => {
      console.log("Received remote stream track from phone camera!");
      if (this.onRemoteStream && event.streams[0]) {
        this.onRemoteStream(event.streams[0]);
      }
    };

    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection.connectionState;
      console.log("WebRTC Connection State:", state);
      if (this.onStatusChange) {
        this.onStatusChange(state);
      }
      this.isConnected = state === "connected";
    };
  }

  // Connect to WebSocket signaling server
  connectSignaling(wsUrl = "ws://localhost:8000/ws/signaling") {
    try {
      this.initPeerConnection();
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log("Connected to WebRTC signaling server");
        this.ws.send(
          JSON.stringify({
            type: "join",
            roomId: this.roomId,
            role: this.isHost ? "pc_receiver" : "phone_camera",
          })
        );
      };

      this.ws.onmessage = async (message) => {
        const data = JSON.parse(message.data);
        console.log("Signaling message received:", data.type);

        if (data.type === "offer" && this.isHost) {
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);
          this.ws.send(
            JSON.stringify({
              type: "answer",
              roomId: this.roomId,
              answer: answer,
            })
          );
        } else if (data.type === "answer" && !this.isHost) {
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        } else if (data.type === "candidate") {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      };

      this.ws.onerror = (err) => {
        console.warn("WebSocket signaling error (fallback to local webcam/mock):", err);
      };
    } catch (e) {
      console.warn("Signaling initialization failed, fallback to local webcam mode:", e);
    }
  }

  // Mobile phone side: attach camera stream and send offer
  async startMobileCamera(videoElement) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      this.localStream = stream;
      if (videoElement) {
        videoElement.srcObject = stream;
      }

      if (this.peerConnection) {
        stream.getTracks().forEach((track) => this.peerConnection.addTrack(track, stream));

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(
            JSON.stringify({
              type: "offer",
              roomId: this.roomId,
              offer: offer,
            })
          );
        }
      }
      return stream;
    } catch (err) {
      console.error("Camera access error on phone:", err);
      throw err;
    }
  }

  close() {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    if (this.ws) {
      this.ws.close();
    }
  }
}
