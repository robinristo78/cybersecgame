import React, { useState, useRef } from "react";
import "./MuteButton.css";

function MuteButton() {
    const [isMuted, setIsMuted] = useState(false);
  
    const handleMuteToggle = () => {
      const newMuteState = !isMuted;
      setIsMuted(!isMuted);
  
      const mediaElements = document.querySelectorAll("audio, video");
  
      mediaElements.forEach((element) => {
        element.muted = newMuteState;
      });
    };
  
    return (
        <button
        onClick={handleMuteToggle}
        className={`mute-button ${isMuted ? "" : "muted"}`}
      >
        {/* No text inside the button */}
      </button>
    );
  }
  
  export default MuteButton;