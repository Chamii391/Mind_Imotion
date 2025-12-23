import urllib.parse

def generate_image(prompt: str):
    if not prompt:
        return {"error": "Prompt is empty"}

    safe_prompt = urllib.parse.quote(prompt)
    image_url = f"https://image.pollinations.ai/prompt/{safe_prompt}"

    return {
        "image_url": image_url
    }
