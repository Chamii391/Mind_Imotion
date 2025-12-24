// src/components/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-lg">🧠</span>
            </div>
            <span className="font-semibold">
              Mind<span className="text-pink-200">Emotion</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-white/80 text-sm">
            © 2024 MindEmotion. All rights reserved.
          </p>

          {/* Made with love */}
          <p className="text-white/80 text-sm flex items-center gap-1">
            Made with <span className="text-red-300">❤️</span> for mental wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;