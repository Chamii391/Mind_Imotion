// src/pages/CopingPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaLightbulb, 
  FaPaperPlane, 
  FaSpinner,
  FaExclamationCircle,
  FaHeart,
  FaRedo,
  FaCheck,
  FaBookmark,
  FaQuoteLeft
} from "react-icons/fa";
import { generateCoping } from "../services/api";

// Mood options for quick selection
const moodOptions = [
  { emoji: "😰", label: "Anxious", prompt: "I'm feeling anxious and overwhelmed" },
  { emoji: "😔", label: "Sad", prompt: "I'm feeling sad and down" },
  { emoji: "😤", label: "Stressed", prompt: "I'm feeling stressed and burnt out" },
  { emoji: "😢", label: "Lonely", prompt: "I'm feeling lonely and isolated" },
  { emoji: "😠", label: "Angry", prompt: "I'm feeling angry and frustrated" },
  { emoji: "😴", label: "Tired", prompt: "I'm feeling exhausted and drained" },
];

// Strategy icons mapping
const strategyIcons = ["🧘", "💆", "🌿", "📝", "🎵", "🚶", "💭", "🫂", "☕", "🌸"];

export default function CopingPage() {
  const [text, setText] = useState("");
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [savedStrategies, setSavedStrategies] = useState([]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Please describe how you're feeling");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setStrategies([]);

      const res = await generateCoping(text);
      setStrategies(res.data.strategies || []);
    } catch (err) {
      setError("Unable to generate strategies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.label);
    setText(mood.prompt);
    setError("");
  };

  const handleReset = () => {
    setText("");
    setStrategies([]);
    setError("");
    setSelectedMood(null);
  };

  const handleSaveStrategy = (strategy) => {
    if (!savedStrategies.includes(strategy)) {
      setSavedStrategies([...savedStrategies, strategy]);
    } else {
      setSavedStrategies(savedStrategies.filter(s => s !== strategy));
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
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4"
          >
            <FaLightbulb className="text-white text-4xl" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Coping Strategies
          </h1>
          <p className="text-white/80">
            Get personalized support and gentle guidance for difficult moments
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Mood Quick Select */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <FaHeart className="text-rose-500" />
              What are you experiencing?
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {moodOptions.map((mood, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMoodSelect(mood)}
                  className={`p-4 rounded-2xl text-center transition-all duration-300
                    ${selectedMood === mood.label
                      ? "bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-lg scale-105"
                      : "bg-amber-50 text-gray-700 hover:bg-amber-100 hover:scale-105"
                    }`}
                >
                  <span className="text-2xl block mb-1">{mood.emoji}</span>
                  <span className="text-xs font-medium">{mood.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <FaQuoteLeft className="text-amber-500" />
              Tell us more about how you're feeling
            </label>
            
            <div className="relative">
              <textarea
                className="w-full h-36 p-5 border-2 border-gray-200 rounded-2xl 
                         focus:border-amber-400 focus:ring-4 focus:ring-amber-100 
                         outline-none transition-all resize-none
                         placeholder:text-gray-400 text-gray-700"
                placeholder="Describe what you're going through...

For example: 'I've been feeling overwhelmed with work lately. I can't seem to focus and feel anxious about deadlines...'"
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
              onClick={handleGenerate}
              disabled={loading || !text.trim()}
              className={`flex-1 px-8 py-4 rounded-xl font-semibold text-white
                        flex items-center justify-center gap-3 transition-all duration-300
                        ${loading || !text.trim()
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
                        }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Generating Strategies...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Get Coping Strategies
                </>
              )}
            </button>

            {(text || strategies.length > 0) && (
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
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
                  <div className="flex flex-col items-center justify-center">
                    {/* Animated Loading Graphic */}
                    <div className="relative w-32 h-32 mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-amber-200 border-t-amber-500"
                      />
                      <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-4xl"
                        >
                          💡
                        </motion.span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-medium mb-2">Finding helpful strategies...</p>
                    <p className="text-gray-400 text-sm">Personalizing support just for you</p>
                    
                    {/* Progress Dots */}
                    <div className="flex gap-2 mt-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 rounded-full bg-amber-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {strategies.length > 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="mt-8"
              >
                {/* Result Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                      <span className="text-white text-xl">✨</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        Your Coping Strategies
                      </h2>
                      <p className="text-sm text-gray-500">
                        {strategies.length} personalized suggestions
                      </p>
                    </div>
                  </div>
                  
                  {savedStrategies.length > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full">
                      <FaBookmark className="text-amber-500 text-sm" />
                      <span className="text-amber-700 text-sm font-medium">
                        {savedStrategies.length} saved
                      </span>
                    </div>
                  )}
                </div>

                {/* Strategies List */}
                <div className="space-y-4">
                  {strategies.map((strategy, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className={`p-5 rounded-2xl border-2 transition-all duration-300
                        ${savedStrategies.includes(strategy)
                          ? "bg-amber-50 border-amber-300"
                          : "bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-transparent hover:border-amber-200"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-md">
                            <span className="text-2xl">
                              {strategyIcons[index % strategyIcons.length]}
                            </span>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <p className="text-gray-700 leading-relaxed">
                                {strategy}
                              </p>
                              
                              {/* Save Button */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleSaveStrategy(strategy)}
                                className={`p-2 rounded-lg transition-all duration-300 flex-shrink-0
                                  ${savedStrategies.includes(strategy)
                                    ? "bg-amber-400 text-white"
                                    : "bg-gray-100 text-gray-400 hover:bg-amber-100 hover:text-amber-500"
                                  }`}
                              >
                                <FaBookmark />
                              </motion.button>
                            </div>
                            
                            {/* Strategy Number */}
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-xs text-gray-400">
                                Strategy #{index + 1}
                              </span>
                              {savedStrategies.includes(strategy) && (
                                <span className="flex items-center gap-1 text-xs text-amber-600">
                                  <FaCheck className="text-[10px]" />
                                  Saved
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Supportive Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl text-center"
                >
                  <span className="text-3xl mb-3 block">💝</span>
                  <p className="text-gray-700 font-medium mb-1">
                    Remember, it's okay to not be okay.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Take these strategies one step at a time. You're doing great by seeking support.
                  </p>
                </motion.div>
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
          <span className="text-amber-500">💡</span> Tips for better results
        </h3>
        <ul className="text-gray-500 text-sm space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            Be specific about what's bothering you
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            Include how these feelings affect your daily life
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            Mention any coping methods you've already tried
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            Save strategies that resonate with you for future reference
          </li>
        </ul>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center text-gray-400 text-xs"
      >
        * These strategies are AI-generated suggestions and not a substitute for professional help.
      </motion.div>
    </motion.div>
  );
}