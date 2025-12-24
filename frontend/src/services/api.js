import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Emotion prediction API call
export const predictEmotion = (text) => {
  return api.post("/predict", { text });
};

export const generateImage = (prompt) => {
  return api.post("/generate-image", { prompt });
};

export const generateCoping = (text) =>
  api.post("/generate-coping", { text });



export default api;
