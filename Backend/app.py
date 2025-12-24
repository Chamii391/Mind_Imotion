import os
from dotenv import load_dotenv

# 🔹 Load .env FIRST (before importing services)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")
load_dotenv(ENV_PATH)

from flask import Flask, request, jsonify
from flask_cors import CORS

from services.emotion_service import predict_emotion
from services.image_gen_service import generate_image
from services.coping_service import generate_coping_strategies
from services.chat import ask_mental_health_bot

app = Flask(__name__)
CORS(app)

# -------------------- HOME --------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "MindEmotion API is running",
        "endpoints": {
            "emotion": "POST /predict",
            "image": "POST /generate-image",
            "coping": "POST /generate-coping"
        }
    })

# -------------------- EMOTION --------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True) or {}
    text = data.get("text", "")

    result = predict_emotion(text)
    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200

# -------------------- IMAGE GENERATION --------------------
@app.route("/generate-image", methods=["POST"])
def generate_image_route():
    data = request.get_json(force=True)
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "Prompt is empty"}), 400

    return jsonify(generate_image(prompt)), 200

# -------------------- COPING STRATEGIES --------------------
@app.route("/generate-coping", methods=["POST"])
def generate_coping_route():
    data = request.get_json(force=True)
    text = data.get("text", "")

    result = generate_coping_strategies(text)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200

@app.route("/chat", methods=["POST"])
def chat_route():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "")

    reply = ask_mental_health_bot(message)
    return jsonify({"reply": reply}), 200

# -------------------- RUN --------------------
if __name__ == "__main__":
    app.run(debug=True)
