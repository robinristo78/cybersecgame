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
    <div>
      <div style={{padding: '20px', display: "flex"}}>
        <MuteButton />
        <HelpButton />
        {/* <LeaderboardButton  /> */}
      </div>
      <div>
        <h1>Who Wants to Be a Millionaire?</h1>

          <div className="difficulty-selection">
            <h2>Select Difficulty</h2>
            <button onClick={() => setSelectedDifficulty('easy')}>Easy</button>
            <button onClick={() => setSelectedDifficulty('medium')}>Medium</button>
            <button onClick={() => setSelectedDifficulty('hard')}>Hard</button>
          </div>
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