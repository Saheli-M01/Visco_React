import React from "react";
import "../../styles/ElementStyle/_contact.scss";
import laptopImage from "../../Assets/Images/Laptop.png";

const Contact = () => {
  return (
    <section id="contact">
      <div className="container">
        <h1>Get In Touch</h1>
        <div className="contact-card">
          <div className="contact-info">
            <div className="photo-section">
              <img 
                src={laptopImage} 
                alt="Visco Team" 
                className="contact-photo"
              />
            </div>
            
            <div className="contact-details">
              <h2>Contact Us</h2>
              <p className="contact-description">
                Have a question or want to collaborate with us? We're here to help you turn your ideas into reality. Reach out via email and we'll get back to you as soon as possible.
              </p>
              <a 
                href="mailto:visualizecode.official@gmail.com" 
                className="email-link"
              >
                <i className="fas fa-envelope"></i>
                <span>visualizecode.official@gmail.com</span>
              </a>
              
              <div className="social-link">
                <p>Connect with us on LinkedIn:</p>
                <a
                  href="https://www.linkedin.com/in/saheli-mondal-b9387729b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-btn"
                >
                  <i className="fa-brands fa-linkedin"></i>
                  <span>Visco</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;