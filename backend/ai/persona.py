"""
AI Jothishyan Persona Definition & Prompt Templates
"""
from pathlib import Path
import json

try:
    from system_prompt import PERSONA_PROMPT, VOCABULARY, build_prompt
except ImportError:
    try:
        from ..system_prompt import PERSONA_PROMPT, VOCABULARY, build_prompt
    except Exception:
        PERSONA_PROMPT = ""
        VOCABULARY = {}

def format_jothishyan_prompt(user_question, palm_features=None):
    palm_info = palm_features or {}
    prompt = f"""
{PERSONA_PROMPT}

PALM DATA:
{json.dumps(palm_info, ensure_ascii=False, indent=2)}

USER QUESTION / CHAT:
{user_question}

Generate the response in Malayalam script now adhering to the persona:
"""
    return prompt

