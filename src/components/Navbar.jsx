import React, { useState, useEffect } from "react";
import logo from "../Assets/Images/Logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../styles/_navbar.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (section) => {
    navigate(`/#${section}`);  // 👈 Navigate to Home with hash
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay for navigation to complete
    closeMenu();
  };

  return (
    <header>
      <nav id="stick" className={`navbar navbar-expand-lg navigation-wrap ${isScrolled ? "scroll-on" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="container">
          {/* Logo - Click to Go Home */}
          <Link className="navbar-brand" to="/" onClick={() => handleNavClick("home")}>
            <img decoding="async" src={logo} alt="Visco" width="90" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto">
              
              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavClick("home")}>
                  <i className="fa-solid fa-house me-1"></i> Home
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavClick("about")}>
                  <i className="fa-solid fa-question me-1"></i> About
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavClick("feature")}>
                  <i className="fa-solid fa-gears me-1"></i> Feature
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavClick("topic")}>
                  <i className="fa-solid fa-code me-1"></i> Topic
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link" onClick={() => handleNavClick("contact")}>
                  <i className="fa-solid fa-comment me-1"></i> Contact
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
