// src/components/ARProductViewer.jsx
import React from "react";

const ARProductViewer = ({ name, description, modelUrl }) => {
  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>{description}</p>

      <model-viewer
        src={modelUrl}
        alt={name}
        ar
        ar-modes="scene-viewer webxr quick-look"
        environment-image="neutral"
        auto-rotate
        camera-controls
        style={{ width: "100%", height: "400px" }}
      >
        <button slot="ar-button">👀 View in your room</button>
      </model-viewer>
    </div>
  );
};

export default ARProductViewer;
