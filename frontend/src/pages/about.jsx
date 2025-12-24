// src/pages/About.jsx
import { motion } from "framer-motion";
import { 
  FaBrain, 
  FaRobot, 
  FaImage, 
  FaLightbulb,
  FaHeart,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <MissionSection />
      <FeaturesSection />
      <TechnologySection />
      <DisclaimerSection />
    </div>
  );
};

// ============ HERO SECTION ============
const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 overflow-hidden">
      
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
        💜
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-32 hidden md:flex w-14 h-14 bg-white rounded-2xl shadow-xl items-center justify-center text-xl"
      >
        🧠
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
        🌸
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
          >
            <FaHeart className="text-rose-500 text-sm" />
            <span className="text-sm font-medium text-gray-600">About MindEmotion</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6"
          >
            Supporting Your
            <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            MindEmotion is an AI-powered mental health support system that combines 
            Deep Learning and Generative AI to help you understand your emotions 
            and find inner peace.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {[
              { number: "AI", label: "Powered", icon: "🤖" },
              { number: "24/7", label: "Available", icon: "⏰" },
              { number: "100%", label: "Private", icon: "🔒" },
              { number: "Free", label: "To Use", icon: "💝" },
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg min-w-[100px]">
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <p className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
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

// ============ MISSION SECTION ============
const MissionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-rose-100 via-pink-100 to-fuchsia-100 rounded-3xl p-8 lg:p-10">
              
              {/* Main Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">MindEmotion</h3>
                    <p className="text-sm text-gray-500">AI Mental Wellness</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { text: "Understand Your Emotions", icon: "💭" },
                    { text: "Get Personalized Support", icon: "💝" },
                    { text: "Find Inner Peace", icon: "🧘" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-gray-700 font-medium">{item.text}</span>
                      <FaCheckCircle className="text-rose-500 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                    <FaBrain className="text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AI Model</p>
                    <p className="font-bold text-gray-800 text-sm">Active ✓</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                    <FaHeart className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Support</p>
                    <p className="font-bold text-gray-800 text-sm">24/7</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-rose-100 text-rose-600 text-sm font-semibold rounded-full mb-4">
              Our Mission
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Making Mental Health
              <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                Support Accessible
              </span>
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We believe everyone deserves access to emotional support and 
                guidance. MindEmotion bridges the gap between technology and 
                mental wellness.
              </p>
              <p>
                Our AI-powered system offers non-judgmental support, helping 
                you understand your emotions and providing gentle coping 
                strategies tailored to your needs.
              </p>
              <p>
                While we don't replace professional help, we aim to be a 
                supportive companion on your journey to emotional well-being.
              </p>
            </div>

            {/* Key Points */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "💜", text: "Compassionate" },
                { icon: "🔒", text: "Private & Secure" },
                { icon: "🌍", text: "For Everyone" },
                { icon: "🎓", text: "Research-Based" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============ FEATURES SECTION ============
const FeaturesSection = () => {
  const features = [
    {
      icon: <FaBrain className="text-2xl" />,
      title: "Emotion Detection",
      description: "Our Deep Learning models analyze your text to accurately identify your emotional state, helping you gain clarity about your feelings.",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Coping Strategies",
      description: "Receive personalized, AI-generated coping suggestions based on your emotional state, designed to help you manage difficult moments.",
      color: "from-pink-500 to-fuchsia-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: <FaRobot className="text-2xl" />,
      title: "Supportive Chatbot",
      description: "Engage with our empathetic AI chatbot that provides gentle guidance, emotional support, and a listening ear whenever you need it.",
      color: "from-fuchsia-500 to-purple-500",
      bgColor: "bg-fuchsia-50",
    },
    {
      icon: <FaImage className="text-2xl" />,
      title: "Calming Imagery",
      description: "Experience AI-generated peaceful visuals designed to soothe your mind, reduce stress, and promote relaxation.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
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
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Our Core Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered tools designed to support your emotional well-being journey.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className={`${feature.bgColor} rounded-3xl p-8 h-full transition-all duration-300 hover:shadow-xl`}>
                <div className="flex items-start gap-6">
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ TECHNOLOGY SECTION ============
const TechnologySection = () => {
  const technologies = [
    {
      title: "Deep Learning",
      description: "Advanced neural networks for accurate emotion detection.",
      icon: "🧠",
    },
    {
      title: "Generative AI",
      description: "AI-powered content generation for personalized support.",
      icon: "✨",
    },
    {
      title: "NLP",
      description: "Natural Language Processing for understanding text.",
      icon: "💬",
    },
    {
      title: "Machine Learning",
      description: "Continuous learning for better recommendations.",
      icon: "📊",
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
            Technology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Powered by Advanced AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cutting-edge artificial intelligence to provide accurate emotional support.
          </p>
        </motion.div>

        {/* Technology Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 rounded-3xl p-8 h-full hover:shadow-xl transition-all duration-300">
                
                {/* Icon */}
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {tech.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ DISCLAIMER SECTION ============
const DisclaimerSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 relative overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <span className="text-3xl">⚠️</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Important Notice
          </h2>

          {/* Content */}
          <div className="space-y-4 text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            <p>
              MindEmotion is designed to provide <strong className="text-gray-800">emotional support 
              and insights</strong>, not medical diagnosis or treatment.
            </p>
            <p>
              Our AI-powered system offers supportive guidance, but it 
              <strong className="text-gray-800"> should not replace professional mental health care</strong>.
            </p>
            <p>
              If you are experiencing a mental health crisis, please reach out to 
              a qualified healthcare provider or emergency services.
            </p>
          </div>

          {/* Helpline */}
          <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-fuchsia-50 rounded-2xl p-6 mb-8">
            <p className="text-gray-600 text-sm mb-2">
              Need immediate help? Contact a mental health helpline:
            </p>
            <p className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              🆘 Emergency: 911 | Crisis Helpline: 988
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/predict-page"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white font-semibold rounded-2xl shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
          >
            Start Using MindEmotion
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;