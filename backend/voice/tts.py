"""
TTS Audio Generation Module for KAI NOKKI
Supports gTTS (Google Text-to-Speech) with Malayalam / English script fallback.
"""

import os
import io

def generate_tts_audio(text, lang="ml"):
    """
    Generates audio bytes for Malayalam or Manglish text.
    """
    try:
        from gtts import gTTS
        tts = gTTS(text=text, lang=lang if lang in ["ml", "en", "hi"] else "en", slow=False)
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        return fp.read()
    except Exception as e:
        print(f"gTTS generation error: {e}")
        return None
