import React, { useState } from "react";
import MuteButton from "./components/UI/MuteButton/MuteButton";
import HelpButton from "./components/UI/HelpButton/HelpButton";
import LeaderboardButton from "./components/UI/LeaderboardButton/LeaderboardButton";
import GameController from './components/Game/GameController';

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

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
      </div>
      <div className="card">
        <Login />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Who Wants To Be A Cyber Security Specialist?</h1>

          {/* Difficulty valiku nupud */}
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setSelectedDifficulty('easy')}>Easy</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setSelectedDifficulty('medium')}>Medium</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setSelectedDifficulty('hard')}>Hard</button>
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