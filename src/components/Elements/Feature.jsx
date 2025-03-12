import React from "react";
import "../../styles/ElementStyle/_feature.scss";
const Feature = () => {
  return (
    <section id="feature">
      <div className="container">
        <div className="row text-center mb-4">
          <h1>Features</h1>
        </div>

        {/* Feature Blocks */}
        <div className="row d-flex">
          <div className="col-lg-4 mb-4 text-center">
            <div className="icon-box">
              <i className="fa-solid fa-eye"></i>
            </div>
            <p>Visualization </p>
          </div>
          <div className="col-lg-4 mb-4 text-center">
            <div className="icon-box">
              <i className="fa-solid fa-user-check"></i>
            </div>
            <p>User-friendly interface</p>
          </div>
          <div className="col-lg-4 mb-4 text-center">
            <div className="icon-box">
              <i className="fa-solid fa-check"></i>
            </div>
            <p>Completely free</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
