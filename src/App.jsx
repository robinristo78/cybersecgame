import React, { useState } from "react";
import MuteButton from "./components/UI/MuteButton/MuteButton";
import HelpButton from "./components/UI/HelpButton/HelpButton";
import LeaderboardButton from "./components/UI/LeaderboardButton/LeaderboardButton";
import GameController from './components/Game/GameController';
import Login from './components/UI/Login/Login'
import Ask from './components/UI/Ask/Ask'
import Poll from './components/UI/Poll/Poll'
import MainLogo from './components/UI/Logo/Logo'
import GameHistory from './components/Game/GameHistory';

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [gameStatus, setGameStatus] = useState('notStarted');

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import GamePage from './components/GamePage';

  return (
    <div className="p-4 text-center">
      <div style={{padding: '20px', display: "flex"}}>
        <MuteButton />
        <HelpButton />
        {/* <LeaderboardButton  /> */}
        <GameHistory gameStatus={gameStatus} />
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
          {/* comment: GameController'is on start nupp */}
          <GameController selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty}  />
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