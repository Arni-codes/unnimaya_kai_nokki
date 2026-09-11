from pathlib import Path
import json

BASE_DIR = Path(__file__).resolve().parent

prompt_path = (BASE_DIR / "persona_prompt.txt") if (BASE_DIR / "persona_prompt.txt").exists() else Path("persona_prompt.txt")
vocab_path = (BASE_DIR / "reference_vocabulary.json") if (BASE_DIR / "reference_vocabulary.json").exists() else Path("reference_vocabulary.json")

PERSONA_PROMPT = prompt_path.read_text(encoding="utf-8")
VOCABULARY = json.loads(vocab_path.read_text(encoding="utf-8"))

def build_prompt(palm_data: dict) -> str:
    return f"""
{PERSONA_PROMPT}

PALM DATA:
{json.dumps(palm_data, ensure_ascii=False, indent=2)}

Generate the palm-reading response now.
"""
