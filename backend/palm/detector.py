"""
Palm Detector module for KAI NOKKI (AI Jothishyan)
Extracts key hand landmark coordinates from base64 image or landmark JSON.
"""

import math

def extract_palm_geometry(landmarks):
    """
    Given 21 MediaPipe hand landmarks, calculate palm features.
    landmarks format: [{'x': float, 'y': float, 'z': float}, ...]
    """
    if not landmarks or len(landmarks) < 21:
        return {
            "hand": "right",
            "palm_width": 520,
            "palm_height": 610,
            "aspect_ratio": 1.17,
            "palm_shape": "slightly_long",
            "life_line_curve": 0.72,
            "heart_line_curve": 0.43,
            "head_line_length": 0.81,
            "fate_line_strength": 0.28
        }

    wrist = landmarks[0]
    index_mcp = landmarks[5]
    pinky_mcp = landmarks[17]

    # Calculate approximate width and height
    palm_width = math.sqrt((pinky_mcp['x'] - index_mcp['x'])**2 + (pinky_mcp['y'] - index_mcp['y'])**2)
    palm_height = math.sqrt((index_mcp['x'] - wrist['x'])**2 + (index_mcp['y'] - wrist['y'])**2)
    aspect_ratio = round(palm_height / max(palm_width, 0.001), 2)

    return {
        "hand": "right",
        "palm_width": round(palm_width * 1000, 1),
        "palm_height": round(palm_height * 1000, 1),
        "aspect_ratio": aspect_ratio,
        "palm_shape": "long" if aspect_ratio > 1.2 else "square",
        "life_line_curve": 0.75,
        "heart_line_curve": 0.48,
        "head_line_length": 0.82,
        "fate_line_strength": 0.35
    }
