// src/components/ChatBot.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
console.log(motion);
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaSpinner,
  FaMinus,
  FaExpand,
  FaCompress,
  FaTrash,
  FaUser,
  FaHeart
} from "react-icons/fa";
import { sendChatMessage } from "../services/api";

// Quick reply suggestions
const quickReplies = [
  { emoji: "😰", text: "I'm feeling anxious" },
  { emoji: "😢", text: "I'm feeling sad" },
  { emoji: "😤", text: "I'm stressed out" },
  { emoji: "💪", text: "I need motivation" },
  { emoji: "🧘", text: "Help me relax" },
  { emoji: "😴", text: "I can't sleep" }
];

const Chat = () => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setHasNewMessage(false);
    }
  }, [isOpen]);

  // Welcome message on first load
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text: "Hello! 👋 I'm your mental wellness companion. I'm here to listen and support you.\n\nHow are you feeling today? 💝",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Send message handler
  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userText = message.trim();
    const newUserMessage = {
      role: "user",
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await sendChatMessage(userText);
      const botReply = res.data.reply || "I hear you. Would you like to tell me more about how you're feeling?";

      const newBotMessage = {
        role: "bot",
        text: botReply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMessage]);
      
      // Show notification if chat is closed
      if (!isOpen) {
        setHasNewMessage(true);
      }
    } catch (err) {
      console.log(err);
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. 🙏",
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clear chat handler
  const handleClearChat = () => {
    setMessages([
      {
        role: "bot",
        text: "Chat cleared! 🌸 Let's start fresh.\n\nHow can I support you today?",
        timestamp: new Date()
      }
    ]);
  };

  // Quick reply handler
  const handleQuickReply = (text) => {
    setMessage(text);
    inputRef.current?.focus();
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* ============ FLOATING BUTTON ============ */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl shadow-2xl 
                  flex items-center justify-center transition-all duration-300
                  ${isOpen 
                    ? "bg-gray-300 text-gray-600 rotate-0" 
                    : "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-pink-500/40"
                  }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes className="text-xl" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <FaRobot className="text-2xl" />
              {/* Online indicator */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* New message notification */}
        {hasNewMessage && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold border-2 border-white"
          >
            1
          </motion.span>
        )}
      </motion.button>

      {/* ============ CHAT WINDOW ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col
              ${isExpanded 
                ? "bottom-4 right-4 left-4 top-20 md:left-auto md:w-[450px] md:top-20" 
                : "bottom-28 right-6 w-[380px] h-[550px]"
              }`}
            style={{ maxHeight: isExpanded ? "calc(100vh - 100px)" : "550px" }}
          >
            
            {/* ============ HEADER ============ */}
            <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                {/* Bot Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <FaRobot className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">MindEmotion</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-white/80 text-sm">Always here for you</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearChat}
                    className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all duration-200"
                    title="Clear chat"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all duration-200 hidden md:flex"
                    title={isExpanded ? "Minimize" : "Expand"}
                  >
                    {isExpanded ? <FaCompress className="text-sm" /> : <FaExpand className="text-sm" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all duration-200"
                    title="Minimize"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* ============ MESSAGES CONTAINER ============ */}
            <div 
              className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-rose-50/30 to-white"
              style={{ minHeight: 0 }}
            >
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                      
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                        m.role === "user" 
                          ? "bg-gradient-to-br from-rose-500 to-pink-500" 
                          : "bg-gradient-to-br from-fuchsia-500 to-purple-500"
                      }`}>
                        {m.role === "user" 
                          ? <FaUser className="text-white text-xs" />
                          : <FaRobot className="text-white text-xs" />
                        }
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`relative px-4 py-3 rounded-2xl shadow-sm ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-white rounded-br-sm"
                          : "bg-white text-gray-700 rounded-bl-sm border border-gray-100"
                      }`}>
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          {m.text}
                        </p>
                        
                        {/* Timestamp */}
                        <span className={`text-[10px] mt-1 block ${
                          m.role === "user" ? "text-white/70 text-right" : "text-gray-400"
                        }`}>
                          {formatTime(m.timestamp)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center shadow-md">
                        <FaRobot className="text-white text-xs" />
                      </div>
                      <div className="bg-white shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <motion.span
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-pink-400 rounded-full"
                          />
                          <motion.span
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                            className="w-2 h-2 bg-pink-400 rounded-full"
                          />
                          <motion.span
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                            className="w-2 h-2 bg-pink-400 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* ============ QUICK REPLIES ============ */}
            {messages.length <= 2 && !loading && (
              <div className="px-4 py-3 bg-gray-50/80 border-t border-gray-100 shrink-0">
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                  <FaHeart className="text-rose-400" />
                  Quick replies:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleQuickReply(reply.text)}
                      className="px-3 py-1.5 bg-white text-gray-600 text-xs rounded-full border border-gray-200 
                               hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50 
                               transition-all duration-200 flex items-center gap-1"
                    >
                      <span>{reply.emoji}</span>
                      <span>{reply.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* ============ INPUT AREA ============ */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-end gap-3">
                {/* Text Input */}
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Share your thoughts..."
                    rows="1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl 
                             focus:border-rose-400 focus:ring-4 focus:ring-rose-100 
                             outline-none transition-all resize-none text-sm
                             placeholder:text-gray-400"
                    style={{ minHeight: "48px", maxHeight: "100px" }}
                    disabled={loading}
                  />
                </div>
                
                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={loading || !message.trim()}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0
                    ${loading || !message.trim()
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-linear-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
                    }`}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaPaperPlane className="text-sm" />
                  )}
                </motion.button>
              </div>
              
              {/* Tip */}
              <p className="text-[10px] text-gray-400 mt-2 text-center">
                Enter to send • Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;