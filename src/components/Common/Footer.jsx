import React from 'react';
import '../../styles/CommonStyle/_footer.scss';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Visco</h3>
          <p>
            A visualization tool for algorithms, making complex concepts easier to understand through interactive animations and step-by-step explanations.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><HashLink smooth to="/#home">Home</HashLink></li>
            <li><HashLink smooth to="/#about">About</HashLink></li>
            <li><HashLink smooth to="/#feature">Features</HashLink></li>
            <li><HashLink smooth to="/#topic">Topics</HashLink></li>
            <li><HashLink smooth to="/#contact">Contact</HashLink></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Topics</h3>
          <ul>
            <li><Link to="/topic/array">Arrays</Link></li>
            <li><Link to="/topic/sort">Sorting</Link></li>
            <li><Link to="/topic/tree">Trees</Link></li>
            <li><Link to="/topic/graph">Graphs</Link></li>
            <li><Link to="/topic/linkedlist">Linked Lists</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Visco. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 