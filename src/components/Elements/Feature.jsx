import React from "react";
import "../../styles/ElementStyle/_feature.scss";

const Feature = () => {
  const features = [
    {
      icon: "fa-solid fa-eye",
      title: "Visualization",
      description: "Transform complex data into clear, intuitive visual representations that communicate insights effectively.",
      number: "01"
    },
    {
      icon: "fa-solid fa-user-check",
      title: "User-friendly Interface",
      description: "Navigate seamlessly with our intuitive design built for both beginners and professionals.",
      number: "02"
    },
    {
      icon: "fa-solid fa-check",
      title: "Completely Free",
      description: "Access all core features without any cost barriers or hidden fees.",
      number: "03"
    },
    {
      icon: "fa-solid fa-arrows-rotate",
      title: "Real-time Updates",
      description: "Experience instant data synchronization with automatic updates that keep your visualizations current.",
      number: "04"
    }
  ];

  return (
    <section id="feature">
      <div className="container">
        <div className="row text-center">
          <h1>Features</h1>
        </div>

        {/* Feature Blocks */}
        <div className="row d-flex justify-content-center">
          {features.map((feature, index) => (
            <div 
              className="col-lg-3 col-md-6 mb-4 text-center" 
              key={index}
              data-number={feature.number}
            >
              <div className="icon-box">
                <i className={feature.icon}></i>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p>{feature.description}</p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
