import React, { useState } from "react";
import Popup from "../Popup/Popup.jsx";

function LeaderboardButton() {
  const [showPopup, setShowPopup] = useState(false);

  const [activeTab, setActiveTab] = useState("DAILY");

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // to-do
    console.log("Switching leaderboard to:", tab);
  };

  return (
    <div>
      <button onClick={togglePopup}>Leaderboard</button>
      <Popup show={showPopup} onClose={() => setShowPopup(false)}>
        <h2>Leaderboard</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <button onClick={() => handleTabClick("DAILY")}>DAILY</button>
          <button onClick={() => handleTabClick("WEEKLY")}>WEEKLY</button>
          <button onClick={() => handleTabClick("TOTAL")}>TOTAL</button>
        </div>
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            width: "90%",
            background: "white",
            color: "black"
          }}
        >
            <p>{activeTab}</p>
            {/* Leaderboard Placeholder - siia tuleb hiljem sisu. */}
        </div>
      </Popup>
    </div>
  );
}

export default LeaderboardButton;
