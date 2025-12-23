import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      
      {/* Logo / Title */}
      <h1 className="text-xl font-bold">
        MindEmotion
      </h1>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
        </li>
        <li>
          <Link to="/predict-page" className="hover:text-gray-200">
            Predict
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-200">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
