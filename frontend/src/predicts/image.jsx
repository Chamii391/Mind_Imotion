import { useState } from "react";
import { generateImage } from "../services/api";

export default function ImageGenPage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const res = await generateImage(prompt);
    setImageUrl(res.data.image_url);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Mental Health Image Generator
      </h1>

      <textarea
        className="border w-full p-3 mb-4"
        placeholder="Enter a calming prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Generate Image
      </button>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          className="mt-6 rounded shadow"
        />
      )}
    </div>
  );
}
