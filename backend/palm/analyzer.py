"""
Palm Feature Analyzer for KAI NOKKI (AI Jothishyan)
Converts geometrical features into humorous observations.
"""
import random
try:
    from system_prompt import VOCABULARY
except ImportError:
    try:
        from ..system_prompt import VOCABULARY
    except Exception:
        VOCABULARY = {}

def generate_humorous_observations(features):
    aspect_ratio = features.get("aspect_ratio", 1.17)
    life_curve = features.get("life_line_curve", 0.72)

    addresses = VOCABULARY.get("addresses", ["എടാ", "മോനെ", "മുത്തേ"])
    nicknames = VOCABULARY.get("nicknames", ["ഉണ്ടം പാണ്ടി", "മൊട്ടത്തലയൻ", "മൺചട്ടി മലരേ", "തക്കുടു"])
    expressions = VOCABULARY.get("expressions", ["അതൊക്കെ പോട്ടെ", "പേടിക്കണ്ട", "എനിക്ക് തോന്നി"])

    addr = random.choice(addresses)
    nick = random.choice(nicknames)
    expr = random.choice(expressions)

    opening = f"{addr} {nick}, കൈ ഒന്ന് നേരെ പിടിക്ക്! {expr}, ഈ കൈ കണ്ടപ്പോ തന്നെ ഒരു കാര്യം മനസ്സിലായി... വലിയ പ്രശ്നം ഒന്നും കാണുന്നില്ല, പക്ഷെ love line ആണ് ഇപ്പൊ കിടുക്കൻ!"

    return {
        "overallScore": "94% Chaotic Genius",
        "jothishyanOpening": opening,
        "love": {
            "title": "LOVE & RELATIONSHIPS",
            "icon": "❤️",
            "manglish": "Heart line nokkiyappo oru kaaryam clear aanu... Nee message ayakkunnathinu munpu 17 pravashyam type cheyyum.",
            "advice": "Crush-inte story-kku straight heart emoji idathe meme ayaykkukka."
        },
        "career": {
            "title": "CAREER & AMBITION",
            "icon": "💼",
            "manglish": "Career path straight alla... Google Maps polum rerouting enn kaattum! Brain super powerful aanu, pakse finishing point-il full laziness.",
            "advice": "5 minutes reels kaanunnath stop cheydhal promotion kittum."
        },
        "money": {
            "title": "WEALTH & CASHFLOW",
            "icon": "💰",
            "manglish": "Cash varum... pakse Swiggy-ylum Amazon-ylum Zomato-yilum evide pokum ennathaanu mukhya chodyam!",
            "advice": "Salary varumbol direct FD-yilekku maattu."
        },
        "personality": {
            "title": "MIND & PERSONALITY",
            "icon": "🧠",
            "manglish": "Overthinking ninte braininte premium subscription replacement aanu!",
            "advice": "Night phone off vekku. Brain-nu kurach rest kodu."
        },
        "future": {
            "title": "DESTINY & DESTINATION",
            "icon": "🎯",
            "manglish": "Life long aanu... pakse procrastination athilum long aanu!",
            "advice": "Nale thudangam ennu parayunnath thadayan aaru illathathukondu ennu thudangu!"
        }
    }
