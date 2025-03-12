import React from "react";
import Home from "../Elements/Home";
import About from "../Elements/About";
import Feature from "../Elements/Feature";
import Topic from "../Elements/Topic";
import Contact from "../Elements/Contact";

function Layout() {
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

export default Layout;
