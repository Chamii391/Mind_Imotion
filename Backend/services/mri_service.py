
import os
import numpy as np
import tensorflow as tf

IMG_SIZE = (224, 224)

# build absolute path: Backend/models/brain_mri_finetuned_model.h5
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "brain_mri_finetuned_model.h5")

model = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = ["no", "yes"]           # 0=no (Normal), 1=yes (Tumor)
LABEL_MAP = {"no": "Normal", "yes": "Tumor"}

def predict_mri(image_file):
    img = tf.keras.utils.load_img(image_file, target_size=IMG_SIZE)
    x = tf.keras.utils.img_to_array(img)
    x = np.expand_dims(x, axis=0)

    # If preprocess_input is already inside your model, DON'T preprocess here.
    prob = float(model.predict(x, verbose=0)[0][0])
    pred = 1 if prob >= 0.5 else 0

    raw_label = CLASS_NAMES[pred]
    return {
        "raw_label": raw_label,
        "label": LABEL_MAP[raw_label],
        "prob_yes": prob
    }
