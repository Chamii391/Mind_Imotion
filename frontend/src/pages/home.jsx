// src/pages/Home.jsx
import { motion } from "framer-motion";
import { 
  FaBrain, 
  FaRobot,
  FaImage,
  FaLightbulb,
  FaArrowRight,
  FaStar,
  FaCheck
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

// ============ HERO SECTION ============
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/50 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-fuchsia-200/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-20 hidden md:flex w-16 h-16 bg-white rounded-2xl shadow-xl items-center justify-center text-2xl"
      >
        💆
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-32 hidden md:flex w-14 h-14 bg-white rounded-2xl shadow-xl items-center justify-center text-xl"
      >
        🧘
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-32 hidden md:flex w-12 h-12 bg-white rounded-xl shadow-xl items-center justify-center text-lg"
      >
        ✨
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-20 hidden md:flex w-14 h-14 bg-white rounded-2xl shadow-xl items-center justify-center text-xl"
      >
        💝
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-600">AI-Powered Mental Wellness</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6"
            >
              Your Journey to
              <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                Mental Peace
              </span>
              Starts Here
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Understand your emotions with AI-powered insights. Get personalized 
              coping strategies and supportive guidance for your mental well-being.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/predict-page"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white font-semibold rounded-2xl shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
              >
                Analyze Your Emotion
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {["😊", "🧘", "💪", "✨", "❤️"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-sm shadow-lg"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Trusted by many users
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Hero Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm"
              >
                {/* Mood Selector Preview */}
                <p className="text-gray-500 text-sm mb-4 text-center">How are you feeling today?</p>
                <div className="flex justify-center gap-3 mb-6">
                  {["😊", "😌", "😔", "😰", "😠"].map((emoji, i) => (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 ${
                        i === 1
                          ? "bg-gradient-to-br from-rose-100 to-pink-100 scale-110 shadow-lg ring-2 ring-rose-400"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>

                {/* AI Response Preview */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <FaRobot className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        I sense you're feeling calm today. Here are some coping strategies for you...
                      </p>
                      <div className="flex gap-2 mt-3">
                        <span className="px-3 py-1 bg-rose-100 text-rose-600 text-xs rounded-full font-medium">
                          Meditation
                        </span>
                        <span className="px-3 py-1 bg-pink-100 text-pink-600 text-xs rounded-full font-medium">
                          Breathing
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Emotion */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                    <FaBrain className="text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Detected</p>
                    <p className="font-bold text-gray-800">Happy 😊</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Image */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                    <FaImage className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AI Image</p>
                    <p className="font-bold text-gray-800">Generated</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

// ============ FEATURES SECTION ============
const FeaturesSection = () => {
  // YOUR SYSTEM FEATURES ONLY
  const features = [
    {
      icon: <FaBrain className="text-2xl" />,
      title: "Emotion Detection",
      description: "Analyze your text to identify emotional states using advanced Deep Learning models.",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Coping Strategies",
      description: "Get supportive, personalized coping suggestions generated by Generative AI.",
      color: "from-pink-500 to-fuchsia-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: <FaRobot className="text-2xl" />,
      title: "Mental Health Chatbot",
      description: "Interactive AI chatbot providing emotional support and non-clinical guidance.",
      color: "from-fuchsia-500 to-purple-500",
      bgColor: "bg-fuchsia-50",
    },
    {
      icon: <FaImage className="text-2xl" />,
      title: "Calming AI Images",
      description: "AI-generated peaceful images designed to promote emotional well-being.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-rose-100 text-rose-600 text-sm font-semibold rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered tools integrating Deep Learning and Generative AI for your mental wellness.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`${feature.bgColor} rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl text-center`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg mb-6`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ HOW IT WORKS SECTION ============
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Enter Your Text",
      description: "Share how you're feeling by typing your thoughts or emotions.",
      icon: "✍️",
    },
    {
      number: "02",
      title: "AI Analyzes Emotion",
      description: "Our Deep Learning model detects your emotional state from the text.",
      icon: "🧠",
    },
    {
      number: "03",
      title: "Get Support",
      description: "Receive coping strategies, chat support, and calming images.",
      icon: "💝",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-white text-pink-600 text-sm font-semibold rounded-full mb-4 shadow-md">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Simple 3 Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Get emotional insights and support in just a few clicks.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-rose-300 to-pink-300 z-0 -translate-x-4"></div>
              )}

              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-rose-100 flex items-center justify-center text-4xl mb-6 mt-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/predict-page"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white font-semibold rounded-2xl shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
          >
            Try It Now
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============ CTA SECTION ============
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 relative overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Ready to Understand Your Emotions?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
        >
          Get AI-powered emotional insights and supportive guidance now.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/predict-page"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-pink-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Analyze Your Emotion
            <FaArrowRight />
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-6 text-white/90"
        >
          {["Emotion Detection", "AI Chatbot", "Coping Strategies", "Calming Images"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <FaCheck className="text-green-300" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-white/60 text-sm"
        >
          * This system does not provide medical diagnosis or treatment.
        </motion.p>
      </div>
    </section>
  );
};

export default Home;