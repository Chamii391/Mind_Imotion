import os
import numpy as np
import tensorflow as tf
from transformers import DistilBertTokenizerFast, TFDistilBertForSequenceClassification

# Path to your saved model folder (based on your screenshot)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "models", "mindemotion_task1_model")

# IMPORTANT: keep label order same as training dataset
EMOTION_LABELS = ["sadness", "joy", "love", "anger", "fear", "surprise"]
MAX_LEN = 128

# Load once (fast API)
tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_DIR)
model = TFDistilBertForSequenceClassification.from_pretrained(MODEL_DIR)

def predict_emotion(text: str):
    text = (text or "").strip()
    if not text:
        return {"error": "Text is empty"}

    inputs = tokenizer(
        text,
        return_tensors="tf",
        truncation=True,
        padding="max_length",
        max_length=MAX_LEN
    )

    outputs = model(inputs)
    logits = outputs.logits.numpy()[0]
    probs = tf.nn.softmax(logits).numpy()

    pred_id = int(np.argmax(probs))

    return {
        "text": text,
        "emotion": EMOTION_LABELS[pred_id],
        "confidence": float(probs[pred_id]),
        "all_probabilities": {EMOTION_LABELS[i]: float(probs[i]) for i in range(len(EMOTION_LABELS))}
    }
