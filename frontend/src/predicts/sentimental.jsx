import { useState } from "react";
import { predictEmotion } from "../services/api";

export default function SentimentalPage() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!text.trim()) {
      setError("Please enter text");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setEmotion("");

      const res = await predictEmotion(text);
      setEmotion(res.data.emotion);
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Emotion Prediction
      </h1>

      <textarea
        className="w-full border rounded p-3 mb-4"
        rows="4"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handlePredict}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Predict"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {emotion && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-center">
          <p className="text-xl font-semibold">
            Emotion: <span className="text-blue-600">{emotion}</span>
          </p>
        </div>
      )}
    </div>
  );
}
