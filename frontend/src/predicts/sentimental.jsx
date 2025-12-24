// src/pages/SentimentalPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBrain, 
  FaPaperPlane, 
  FaSpinner,
  FaExclamationCircle,
  FaHeart,
  FaRedo
} from "react-icons/fa";
import { predictEmotion } from "../services/api";

// Emotion configurations with emoji and colors
const emotionConfig = {
  happy: { emoji: "😊", label: "Happy", color: "from-yellow-400 to-orange-400", bg: "bg-yellow-50" },
  sad: { emoji: "😢", label: "Sad", color: "from-blue-400 to-blue-600", bg: "bg-blue-50" },
  angry: { emoji: "😠", label: "Angry", color: "from-red-400 to-red-600", bg: "bg-red-50" },
  fear: { emoji: "😨", label: "Fear", color: "from-purple-400 to-purple-600", bg: "bg-purple-50" },
  surprise: { emoji: "😲", label: "Surprise", color: "from-pink-400 to-rose-500", bg: "bg-pink-50" },
  love: { emoji: "🥰", label: "Love", color: "from-rose-400 to-pink-500", bg: "bg-rose-50" },
  neutral: { emoji: "😐", label: "Neutral", color: "from-gray-400 to-gray-600", bg: "bg-gray-50" },
  anxiety: { emoji: "😰", label: "Anxiety", color: "from-amber-400 to-orange-500", bg: "bg-amber-50" },
  joy: { emoji: "🤗", label: "Joy", color: "from-green-400 to-emerald-500", bg: "bg-green-50" },
  default: { emoji: "🧠", label: "Detected", color: "from-rose-500 to-pink-500", bg: "bg-rose-50" }
};

const getEmotionConfig = (emotion) => {
  const key = emotion?.toLowerCase();
  return emotionConfig[key] || { ...emotionConfig.default, label: emotion };
};

export default function SentimentalPage() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setEmotion("");

      const res = await predictEmotion(text);
      setEmotion(res.data.emotion);
    } catch (err) {
      setError("Unable to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setEmotion("");
    setError("");
  };

  const emotionData = getEmotionConfig(emotion);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4"
          >
            <FaBrain className="text-white text-4xl" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Emotion Detection
          </h1>
          <p className="text-white/80">
            Share your thoughts and let AI understand your emotions
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Input Section */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <FaHeart className="text-rose-500" />
              How are you feeling today?
            </label>
            
            <div className="relative">
              <textarea
                className="w-full h-40 p-5 border-2 border-gray-200 rounded-2xl 
                         focus:border-rose-400 focus:ring-4 focus:ring-rose-100 
                         outline-none transition-all resize-none
                         placeholder:text-gray-400 text-gray-700"
                placeholder="Express your thoughts and feelings here... 

For example: 'Today was a challenging day at work. I felt overwhelmed with all the deadlines, but I'm trying to stay positive...'"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (error) setError("");
                }}
                disabled={loading}
              />
              
              {/* Character Count */}
              <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                {text.length} characters
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
              onClick={handlePredict}
              disabled={loading || !text.trim()}
              className={`flex-1 px-8 py-4 rounded-xl font-semibold text-white
                        flex items-center justify-center gap-3 transition-all duration-300
                        ${loading || !text.trim()
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105"
                        }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Analyze My Emotions
                </>
              )}
            </button>

            {(text || emotion) && (
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

          {/* Result Section */}
          <AnimatePresence>
            {emotion && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="mt-8"
              >
                <div className={`${emotionData.bg} rounded-2xl p-8 text-center border-2 border-white shadow-lg`}>
                  
                  {/* Emotion Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className={`w-24 h-24 mx-auto bg-gradient-to-br ${emotionData.color} rounded-3xl flex items-center justify-center mb-6 shadow-xl`}
                  >
                    <span className="text-5xl">{emotionData.emoji}</span>
                  </motion.div>

                  {/* Result Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-gray-500 text-sm mb-2">Detected Emotion</p>
                    <h2 className={`text-3xl font-bold bg-gradient-to-r ${emotionData.color} bg-clip-text text-transparent`}>
                      {emotionData.label}
                    </h2>
                  </motion.div>

                  {/* Supportive Message */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-gray-600"
                  >
                    {getSupportiveMessage(emotion)}
                  </motion.p>

                  {/* Action Suggestions */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 flex flex-wrap justify-center gap-2"
                  >
                    {getActionTags(emotion).map((tag, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm`}
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
          <span className="text-rose-500">💡</span> Tips for better results
        </h3>
        <ul className="text-gray-500 text-sm space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-1">•</span>
            Write in detail about how you're feeling
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-1">•</span>
            Include context about what's causing these emotions
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-400 mt-1">•</span>
            Be honest and express yourself freely
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

// Helper function for supportive messages
const getSupportiveMessage = (emotion) => {
  const messages = {
    happy: "That's wonderful! Keep spreading those positive vibes! 🌟",
    sad: "It's okay to feel this way. Remember, you're not alone. 💙",
    angry: "Take a deep breath. Your feelings are valid. 🌿",
    fear: "Courage isn't the absence of fear. You're stronger than you think. 💪",
    surprise: "Life is full of unexpected moments! Embrace them. ✨",
    love: "Love is a beautiful emotion. Cherish these feelings. 💕",
    neutral: "A balanced state of mind. Perfect for reflection. 🧘",
    anxiety: "Try some deep breathing. This moment will pass. 🌸",
    joy: "Your joy is contagious! Keep shining bright! ☀️"
  };
  
  return messages[emotion?.toLowerCase()] || "Thank you for sharing your feelings with us. 💝";
};

// Helper function for action tags
const getActionTags = (emotion) => {
  const tags = {
    happy: ["🎉 Celebrate", "📝 Journal", "🤝 Share Joy"],
    sad: ["🧘 Meditate", "💬 Talk to Someone", "🎵 Listen to Music"],
    angry: ["🌬️ Deep Breathing", "🚶 Take a Walk", "✍️ Write it Out"],
    fear: ["🫂 Seek Support", "📖 Positive Affirmations", "🌿 Grounding Exercise"],
    surprise: ["📝 Reflect", "🎯 Adapt", "💭 Process"],
    love: ["💌 Express It", "🙏 Gratitude", "💝 Cherish"],
    neutral: ["🧘 Mindfulness", "📚 Self-Reflection", "🎯 Set Goals"],
    anxiety: ["🫁 Breathe", "🌊 Stay Present", "☕ Self-Care"],
    joy: ["🎊 Celebrate", "📸 Capture Moment", "💫 Spread Positivity"]
  };
  
  return tags[emotion?.toLowerCase()] || ["💭 Reflect", "🌸 Self-Care", "💝 Be Kind to Yourself"];
};