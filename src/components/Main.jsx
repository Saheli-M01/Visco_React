import React from "react";
import Home from "./Home";
import About from "./About";
import Feature from "./Feature";
import Topic from "./Topic";
import Contact from "./Contact";

function Main() {
  return (
    <div className="Main">
      <section id="home-section">
        <Home />
      </section>
      <section id="about-section">
        <About />
      </section>
      <section id="feature-section">
        <Feature />
      </section>
      <section id="topic-section">
        <Topic />
      </section>
      <section id="contact-section">
        <Contact />
      </section>
    </div>
  );
}

export default Main;
