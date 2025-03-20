import React, { useState, useEffect } from "react";
import MuteButton from "./components/UI/MuteButton/MuteButton";
import HelpButton from "./components/UI/HelpButton/HelpButton";
import LeaderboardButton from "./components/UI/LeaderboardButton/LeaderboardButton";
import GameController from './components/Game/GameController';
import Login from './components/UI/Login/Login'
import Ask from './components/UI/Ask/Ask'
import Poll from './components/UI/Poll/Poll'
import MainLogo from './components/UI/Logo/Logo'
import './App.css'
import GameMusic from './components/GameMusic';
import GameHistory from './components/Game/GameHistory';

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [gameStatus, setGameStatus] = useState('notStarted');
  const [gameData, setGameData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleGameEnd = (result, questionCount) => {
    setGameStatus('over');
    setGameData({
      result,
      questionCount,
      difficulty: selectedDifficulty,
      score,
      played_at: new Date().toISOString(),
    });
  };

  return (
    <div className="p-4 text-center">
      <div className="top-buttons" style={{padding: '20px', display: "flex"}}>
        <MuteButton />
        <HelpButton />
        {/* <LeaderboardButton  /> */}
        <GameHistory gameStatus={gameStatus} gameData={gameData} />
      </div>

      <Login className="card" isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Poll />

      <Ask />

      <MainLogo />

      <GameMusic />

        {/* comment: GameController'is on start nupp */}
        <GameController 
          selectedDifficulty={selectedDifficulty} 
          setSelectedDifficulty={setSelectedDifficulty}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          handleGameEnd={handleGameEnd}
        />
    </div>
  );
}

export default App;