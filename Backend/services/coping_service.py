import os
import json
from groq import Groq

API_KEY = os.environ.get("GROQ_API_KEY")

if not API_KEY:
    raise RuntimeError("GROQ_API_KEY not found. Check Backend/.env file.")

client = Groq(api_key=API_KEY)

def generate_coping_strategies(text: str):
    text = (text or "").strip()
    if not text:
        return {"error": "Text is empty"}

    prompt = f"""
You are a supportive mental health assistant.

User message:
{text}

Generate exactly 4 safe coping strategies.
Rules:
- Do NOT diagnose
- Do NOT mention medication
- Keep strategies short
Return ONLY JSON in this format:
{{ "strategies": ["...", "...", "...", "..."] }}
"""

    resp = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.6,
        max_tokens=250,
    )

    content = resp.choices[0].message.content.strip()

    try:
        return json.loads(content)
    except:
        return {"strategies": content}
