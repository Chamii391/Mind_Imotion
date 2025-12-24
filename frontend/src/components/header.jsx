// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Predict", path: "/predict-page" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-3"
            : "bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              isScrolled 
                ? "bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg" 
                : "bg-white/20"
            }`}>
              <span className="text-xl">🧠</span>
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}>
              Mind<span className={isScrolled ? "text-rose-500" : "text-pink-200"}>Emotion</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? isScrolled
                        ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg"
                        : "bg-white text-rose-600"
                      : isScrolled
                        ? "text-gray-600 hover:text-rose-500 hover:bg-rose-50"
                        : "text-white/90 hover:bg-white/20"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isScrolled ? "bg-rose-100 text-rose-600" : "bg-white/20 text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mx-4 mt-3 p-4 bg-white rounded-2xl shadow-xl">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive(link.path)
                        ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                        : "text-gray-600 hover:bg-rose-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;