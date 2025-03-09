import React from 'react';
import '../styles/_footer.scss';
import { HashLink } from 'react-router-hash-link';

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
            <li><HashLink to="/topic/array">Arrays</HashLink></li>
            <li><HashLink to="/topic/sort">Sorting</HashLink></li>
            <li><HashLink to="/topic/tree">Trees</HashLink></li>
            <li><HashLink to="/topic/graph">Graphs</HashLink></li>
            <li><HashLink to="/topic/linkedlist">Linked Lists</HashLink></li>
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