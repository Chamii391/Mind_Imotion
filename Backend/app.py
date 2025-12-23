from flask import Flask, request, jsonify
from flask_cors import CORS
from services.emotion_service import predict_emotion
from services.mri_service import predict_mri

app = Flask(__name__)
CORS(app)

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

@app.route("/predict-mri", methods=["POST"])
def predict_mri_route():
    if "file" not in request.files:
        return jsonify({"error": "Upload image with form-data key: file"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    result = predict_mri(file)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
