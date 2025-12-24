// src/pages/ContactPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaEnvelope, 
  FaLinkedin, 
  FaGithub, 
  FaGlobe,
  FaPaperPlane,
  FaHeart,
  FaMapMarkerAlt,
  FaSpinner,
  FaCheck,
  FaUser,
  FaCommentDots
} from "react-icons/fa";

// Your social links
const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/chameera-chathuranga-ba498b320/",
    icon: <FaLinkedin className="text-2xl" />,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    username: "Chameera Chathuranga"
  },
  {
    name: "GitHub",
    url: "https://github.com/Chamii391",
    icon: <FaGithub className="text-2xl" />,
    color: "from-gray-700 to-gray-900",
    bgColor: "bg-gray-50",
    hoverBg: "hover:bg-gray-100",
    username: "@Chamii391"
  },
  {
    name: "Portfolio",
    url: "https://chameera-chathuranga-9x53.vercel.app",
    icon: <FaGlobe className="text-2xl" />,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
    hoverBg: "hover:bg-rose-100",
    username: "View My Work"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      // Simulate API call (replace with your actual API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-fuchsia-200/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6">
            <FaHeart className="text-rose-500 text-sm" />
            <span className="text-sm font-medium text-gray-600">Get In Touch</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Let's
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              {" "}Connect
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about MindEmotion? Want to collaborate? 
            Feel free to reach out - I'd love to hear from you!
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              
              {/* Form Header */}
              <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <FaEnvelope className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Send a Message</h2>
                    <p className="text-white/80 text-sm">I'll get back to you soon</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                
                {/* Name Input */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <FaUser className="text-rose-500 text-sm" />
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                             focus:border-rose-400 focus:ring-4 focus:ring-rose-100 
                             outline-none transition-all placeholder:text-gray-400"
                    disabled={loading}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <FaEnvelope className="text-rose-500 text-sm" />
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                             focus:border-rose-400 focus:ring-4 focus:ring-rose-100 
                             outline-none transition-all placeholder:text-gray-400"
                    disabled={loading}
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <FaCommentDots className="text-rose-500 text-sm" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                             focus:border-rose-400 focus:ring-4 focus:ring-rose-100 
                             outline-none transition-all placeholder:text-gray-400"
                    disabled={loading}
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <FaHeart className="text-rose-500 text-sm" />
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="5"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl 
                             focus:border-rose-400 focus:ring-4 focus:ring-rose-100 
                             outline-none transition-all resize-none placeholder:text-gray-400"
                    disabled={loading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm flex items-center gap-2"
                  >
                    <FaCheck className="text-green-500" />
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-8 py-4 rounded-xl font-semibold text-white
                            flex items-center justify-center gap-3 transition-all duration-300
                            ${loading
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105"
                            }`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right - Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            
            {/* Developer Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="w-28 h-28 mx-auto bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-400 rounded-3xl flex items-center justify-center mb-4 shadow-xl"
                >
                  <span className="text-5xl">👨‍💻</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  Chameera Chathuranga
                </h3>
                <p className="text-gray-500">Full Stack Developer</p>
                
                {/* Location */}
                <div className="flex items-center justify-center gap-2 mt-3 text-gray-400">
                  <FaMapMarkerAlt className="text-rose-400" />
                  <span className="text-sm">Sri Lanka</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-gray-600 font-medium text-center mb-4">Connect with me</p>
                
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`flex items-center gap-4 p-4 ${link.bgColor} ${link.hoverBg} rounded-2xl transition-all duration-300 group`}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {link.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{link.name}</p>
                      <p className="text-sm text-gray-500">{link.username}</p>
                    </div>
                    
                    {/* Arrow */}
                    <div className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all">
                      →
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="w-12 h-12 mx-auto bg-rose-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <p className="font-semibold text-gray-800">Fast Response</p>
                <p className="text-sm text-gray-500">Within 24 hours</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="w-12 h-12 mx-auto bg-pink-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-2xl">🤝</span>
                </div>
                <p className="font-semibold text-gray-800">Let's Collaborate</p>
                <p className="text-sm text-gray-500">Open to projects</p>
              </motion.div>
            </div>

            {/* MindEmotion Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-rose-100 via-pink-100 to-fuchsia-100 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-2xl">🧠</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">About MindEmotion</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    An AI-powered mental health support system built with Deep Learning 
                    and Generative AI to help you understand emotions and find peace.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
            <p className="text-gray-600 italic">
              "Building technology that cares for mental wellness" 💜
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}