import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import { UnlockedDifficultiesProvider } from './components/UnlockedDifficultiesContext';

const App = () => {
  return (
    <UnlockedDifficultiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </UnlockedDifficultiesProvider>
  );
};

export default App;