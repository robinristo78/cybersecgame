import React, { useState, useRef } from "react";


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
        <button onClick={handleMuteToggle}>
            {isMuted ? "Unmute" : "Mute"}
        </button>

    );
}

export default MuteButton;
