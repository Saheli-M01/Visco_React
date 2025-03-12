import React, { useState, useEffect, useRef } from "react";
import logo from "../../Assets/Images/Logo/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/CommonStyle/_navbar.scss";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleNavClick = (section) => {
    navigate(`/#${section}`);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    closeMenu();
  };

  // List of topic routes
  const topicRoutes = ["/topic/array", "/topic/graph", "/topic/linkedList", "/topic/sort", "/topic/tree"];
  const isTopicPage = topicRoutes.includes(location.pathname);

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

              {/* Topic Button & Conditional Dropdown */}
              <li className="nav-item topic-group" ref={dropdownRef}>
                <button className="nav-link" onClick={() => handleNavClick("topic")}>
                  <i className="fa-solid fa-code me-1"></i> Topic
                </button>

                {/* Only Show Dropdown Button in Topics Pages */}
                {isTopicPage && (
                  <>
                    <button id="dropdown" className="dropdown-toggle-btn ps-0" onClick={toggleDropdown}>
                      <i className={`fa-solid ${isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <ul className="dropdown-menu show">
                        <li><Link className="dropdown-item" to="/topic/array" onClick={() => setIsDropdownOpen(false)}>Array</Link></li>
                        <li><Link className="dropdown-item" to="/topic/tree" onClick={() => setIsDropdownOpen(false)}>Tree</Link></li>
                        <li><Link className="dropdown-item" to="/topic/graph" onClick={() => setIsDropdownOpen(false)}>Graph</Link></li>
                        <li><Link className="dropdown-item" to="/topic/linkedList" onClick={() => setIsDropdownOpen(false)}>Linked List</Link></li>
                        <li><Link className="dropdown-item" to="/topic/sort" onClick={() => setIsDropdownOpen(false)}>Sorting</Link></li>
                        
                      </ul>
                    )}
                  </>
                )}
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