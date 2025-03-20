import React, { useState } from "react";
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

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import GamePage from './components/GamePage';

  return (
    <div className="p-4 text-center">
      <div className="top-buttons" style={{padding: '20px', display: "flex"}}>
        <MuteButton />
        <HelpButton />
        {/* <LeaderboardButton  /> */}
      </div>
      <div className="card">
        <Login />
      </div>
      <div className="card">
        <Poll />
      </div>
      <div className="card">
        <Ask />
      </div>
      <div className="card">
        <MainLogo />
      </div>
      <div>
        <GameMusic />
      </div>
      <div>
          {/* Difficulty valiku nupud */}
          <div className="difficulty">
            <button onClick={() => setSelectedDifficulty('easy')}>Easy</button>
            <button onClick={() => setSelectedDifficulty('medium')}>Medium</button>
            <button onClick={() => setSelectedDifficulty('hard')}>Hard</button>
          </div>

          {/* comment: GameController'is on start nupp */}
          <GameController selectedDifficulty={selectedDifficulty} />
      </div>
    </div>
  );
}

//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/game" element={<GamePage />} />
//       </Routes>
//     </Router>
//   );
// };

export default App;