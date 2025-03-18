import React from "react";
import MuteButton from "./components/UI/MuteButton/MuteButton";
import HelpButton from "./components/UI/HelpButton/HelpButton";
import LeaderboardButton from "./components/UI/LeaderboardButton/LeaderboardButton";

function App() {
  return (
    <div style={{padding: '20px', display: "flex"}}>
      <MuteButton />
      <HelpButton />
      <LeaderboardButton  />
    </div>
  )
}

export default App
