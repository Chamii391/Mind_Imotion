// src/pages/ImageGenPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaImage, 
  FaMagic, 
  FaSpinner,
  FaExclamationCircle,
  FaDownload,
  FaRedo,
  FaHeart,
  FaLightbulb
} from "react-icons/fa";
import { generateImage } from "../services/api";

// Predefined calming prompts
const suggestedPrompts = [
  { emoji: "🌅", text: "Peaceful sunset over calm ocean" },
  { emoji: "🌸", text: "Cherry blossoms in spring garden" },
  { emoji: "🏔️", text: "Serene mountain lake at dawn" },
  { emoji: "🌿", text: "Quiet forest path with sunlight" },
  { emoji: "🌙", text: "Starry night sky over meadow" },
  { emoji: "🌊", text: "Gentle waves on sandy beach" },
];

export default function ImageGenPage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt or select a suggestion");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setImageUrl("");

      const res = await generateImage(prompt);
      setImageUrl(res.data.image_url);
    } catch (err) {
      setError("Unable to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPrompt = (text) => {
    setPrompt(text);
    setError("");
  };

  const handleReset = () => {
    setPrompt("");
    setImageUrl("");
    setError("");
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "calming-image.png";
      link.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4"
          >
            <FaImage className="text-white text-4xl" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Calming Image Generator
          </h1>
          <p className="text-white/80">
            Create peaceful AI-generated visuals for relaxation
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Suggested Prompts */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <FaLightbulb className="text-amber-500" />
              Quick Suggestions
            </label>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelectPrompt(item.text)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${prompt === item.text
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-purple-50 text-purple-700 hover:bg-purple-100 hover:scale-105"
                    }`}
                >
                  <span className="mr-1">{item.emoji}</span>
                  {item.text}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <FaHeart className="text-pink-500" />
              Or describe your calming scene
            </label>
            
            <div className="relative">
              <textarea
                className="w-full h-32 p-5 border-2 border-gray-200 rounded-2xl 
                         focus:border-purple-400 focus:ring-4 focus:ring-purple-100 
                         outline-none transition-all resize-none
                         placeholder:text-gray-400 text-gray-700"
                placeholder="Describe a peaceful scene you'd like to visualize...

For example: 'A tranquil Japanese garden with a small pond, koi fish, and cherry blossoms gently falling...'"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (error) setError("");
                }}
                disabled={loading}
              />
              
              {/* Character Count */}
              <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                {prompt.length} characters
              </div>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
              >
                <FaExclamationCircle className="text-red-500 flex-shrink-0" />
                <p className="text-red-600">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className={`flex-1 px-8 py-4 rounded-xl font-semibold text-white
                        flex items-center justify-center gap-3 transition-all duration-300
                        ${loading || !prompt.trim()
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                        }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FaMagic />
                  Generate Calming Image
                </>
              )}
            </button>

            {(prompt || imageUrl) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleReset}
                className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 
                         rounded-xl font-medium transition-all duration-300 
                         flex items-center gap-2"
              >
                <FaRedo />
                Reset
              </motion.button>
            )}
          </div>

          {/* Loading Animation */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8"
              >
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                  <div className="flex flex-col items-center justify-center">
                    {/* Animated Loading Graphic */}
                    <div className="relative w-32 h-32 mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-purple-200 border-t-purple-500"
                      />
                      <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-4xl"
                        >
                          🎨
                        </motion.span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-medium mb-2">Creating your peaceful image...</p>
                    <p className="text-gray-400 text-sm">This may take a few moments</p>
                    
                    {/* Progress Dots */}
                    <div className="flex gap-2 mt-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 rounded-full bg-purple-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Section */}
          <AnimatePresence>
            {imageUrl && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="mt-8"
              >
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-white shadow-lg">
                  
                  {/* Success Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white text-lg">✨</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Your Calming Image</p>
                        <p className="text-sm text-gray-500">AI-generated peaceful visual</p>
                      </div>
                    </div>
                    
                    {/* Download Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownload}
                      className="px-4 py-2 bg-white text-purple-600 rounded-xl font-medium 
                               shadow-md hover:shadow-lg transition-all duration-300
                               flex items-center gap-2"
                    >
                      <FaDownload />
                      Download
                    </motion.button>
                  </div>
                  
                  {/* Image Display */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img
                      src={imageUrl}
                      alt="Generated calming image"
                      className="w-full h-auto"
                    />
                    
                    {/* Image Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white text-sm opacity-90">
                        "{prompt}"
                      </p>
                    </div>
                  </motion.div>

                  {/* Calming Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-center"
                  >
                    <p className="text-gray-600">
                      Take a moment to breathe and enjoy this peaceful scene 🧘
                    </p>
                  </motion.div>

                  {/* Action Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 flex flex-wrap justify-center gap-2"
                  >
                    {["🧘 Meditate", "🌿 Breathe", "💆 Relax", "✨ Be Present"].map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6"
      >
        <h3 className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
          <span className="text-purple-500">🎨</span> Tips for calming images
        </h3>
        <ul className="text-gray-500 text-sm space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            Include natural elements like water, trees, or sky
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            Mention soft lighting like sunset, dawn, or moonlight
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            Add words like "peaceful", "serene", "gentle", or "tranquil"
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            Think of places that make you feel calm and safe
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}