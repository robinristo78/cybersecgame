import React, { useState } from "react";
import Popup from "../Popup/Popup.jsx";
import "./HelpButton.css";

function HelpButton() {
    const [showPopup, setShowPopup] = useState(false);
  
    const togglePopup = () => {
        setShowPopup((prev) => !prev);
      };
  
    return (
      <div>
        <button className="help-image-button" onClick={togglePopup}></button>
        <Popup show={showPopup} onClose={() => setShowPopup(false)}>
          <h2>HOW TO PLAY</h2>
          <p>You will be asked questions about cybersecurity.</p>
          <p>For each question, you have 60 seconds to answer.<br/>The game will be lost if the time runs out.</p>
          <p>Each correct answer allows you to progress, leading to more challenging questions and greater rewards.</p>
          <p>You have three lifelines located in the bottom right.</p>
          <ol>
            {/* <li>Ask an Chatbot - It provides answers with 80% accuracy.</li> */}
            <li>New question - Swap out the current question if you're stuck.</li>
            {/* <li>Word on the Street - See what the streets think is the correct answer.</li> */}
          </ol>
        </Popup>
      </div>
    );
  }
  
  export default HelpButton;