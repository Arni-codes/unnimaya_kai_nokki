"""
AI Chatbot Service Handler for KAI NOKKI
"""

import os
import random
import requests
from .persona import format_jothishyan_prompt
try:
    from system_prompt import VOCABULARY, build_prompt
except ImportError:
    try:
        from ..system_prompt import VOCABULARY, build_prompt
    except Exception:
        VOCABULARY = {}

def call_gemini_api(prompt_text: str, api_key: str) -> str:
    """Invokes Google Gemini API if key is provided"""
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [{"parts": [{"text": prompt_text}]}],
            "generationConfig": {"temperature": 0.85, "maxOutputTokens": 300}
        }
        res = requests.post(url, headers=headers, json=payload, timeout=8)
        if res.status_code == 200:
            data = res.json()
            return data["candidates"][0]["content"]["parts"][0]["text"].strip()
    except Exception as e:
        print(f"Gemini API request failed: {e}")
    return None

def generate_local_persona_response(user_text: str, palm_features: dict = None) -> str:
    """Generates authentic Malayalam humorous response using reference vocabulary"""
    addresses = VOCABULARY.get("addresses", ["എടാ", "മോനെ", "മുത്തേ"])
    nicknames = VOCABULARY.get("nicknames", ["ഉണ്ടം പാണ്ടി", "മൊട്ടത്തലയൻ", "മൺചട്ടി മലരേ", "തക്കുടു"])
    expressions = VOCABULARY.get("expressions", ["അതൊക്കെ പോട്ടെ", "പേടിക്കണ്ട", "എനിക്ക് തോന്നി"])
    english_words = VOCABULARY.get("english_words", ["business", "Instagram", "plan", "delivery"])

    addr = random.choice(addresses)
    nick = random.choice(nicknames)
    expr = random.choice(expressions)
    eng = random.choice(english_words)

    q = user_text.lower()
    if "love" in q or "crush" in q or "കല്യാണം" in q or "പെണ്ണ്" in q:
        return f"{addr} {nick}, love line ഞാൻ സൂക്ഷിച്ചു നോക്കി! {expr}, പ്രണയം ഒക്കെ വരും, പക്ഷെ WhatsApp-ൽ message അയക്കാൻ തുടങ്ങിയാൽ നീ 10 പ്രാവശ്യം edit ചെയ്ത് കളയും. {eng} പോലെ complicated ആക്കാതെ നേരെ പോയി സംസാരിക്ക് മുത്തേ!"
    elif "job" in q or "career" in q or "work" in q or "പണി" in q:
        return f"{addr} {nick}, career path ഞാൻ കണ്ടു. {expr}, നിന്റെ തലയിൽ പുതിയ {eng} ഒക്കെ ദിവസവും വരും. പക്ഷെ വെള്ളിയാഴ്ച വൈകുന്നേരം പണി തീർക്കാൻ നോക്കുമ്പോഴേക്കും laziness കേറി വരും! പേടിക്കണ്ട, promotion ഒക്കെ വഴിയിൽ ഉണ്ട്."
    elif "money" in q or "cash" in q or "പൈസ" in q:
        return f"{addr} {nick}, പൈസ വരാനുള്ള line കിടുക്കൻ ആണ്! പക്ഷെ മൊട്ടത്തലയാ, കയ്യിൽ നിൽക്കില്ല. {eng}, delivery, Swiggy ഒക്കെ ആയി പോകും. {expr}, ഇപ്പൊ ഉള്ള പൈസ എങ്കിലും സൂക്ഷിച്ചു വെക്ക്!"
    elif "foreign" in q or "abroad" in q or "visa" in q or "ഗൾഫ്" in q:
        return f"{addr} {nick}, abroad line നേരെ തെളിയുന്നുണ്ട്! {expr}, flight ticket നിരക്ക് കണ്ടിട്ട് നീ കൊച്ചിയിൽ തന്നെ staycation പ്ലാൻ ചെയ്യരുത്. ധൈര്യമായിട്ട് പോടാ!"
    else:
        return f"{addr} {nick}, കൈ ഒന്ന് നേരെ പിടിക്ക്... {expr}, നിന്റെ {eng} പ്ലാൻ ഒക്കെ ഞാൻ അറിഞ്ഞു! പേടിക്കണ്ട, വലിയ കുഴപ്പം ഒന്നും കാണുന്നില്ല, പക്ഷെ അധികം overthink ചെയ്യല്ലേ മുത്തേ!"

def get_jothishyan_response(user_text, palm_features=None):
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("LLM_API_KEY")

    if api_key:
        prompt = format_jothishyan_prompt(user_text, palm_features)
        ai_reply = call_gemini_api(prompt, api_key)
        if ai_reply:
            return ai_reply

    # High quality Malayalam personality response using reference vocabulary
    return generate_local_persona_response(user_text, palm_features)

