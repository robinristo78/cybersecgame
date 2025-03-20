import React from "react";
import "./Popup.css"; // Import the CSS for styling

function Popup({ show, onClose, children }) {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content-container">
        {children}
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Popup;