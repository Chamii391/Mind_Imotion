from flask import Flask, request, jsonify
from flask_cors import CORS
from services.emotion_service import predict_emotion
from services.image_gen_service import generate_image


app = Flask(__name__)
CORS(app)

#hf_lKVXOjffoCNquvVLbcinswszArMwWpvwJGE

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "MindEmotion API is running",
        "endpoint": "POST /predict  (JSON: { text: '...' })"
    })

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True) or {}
    text = data.get("text", "")

    result = predict_emotion(text)
    if "error" in result:
        return jsonify(result), 400

    return jsonify(result)


@app.route("/generate-image", methods=["POST"])
def generate_image_route():
    data = request.get_json(force=True)
    prompt = data.get("prompt", "")
    return jsonify(generate_image(prompt))


if __name__ == "__main__":
    app.run(debug=True)
