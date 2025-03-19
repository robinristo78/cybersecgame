import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Start the game with the selected difficulty
  const startGame = (difficulty) => {
    navigate('/game', { state: { difficulty } });
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Who Wants To Be A Cyber Security Specialist?</h1>
      <div className="space-y-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => startGame('Easy')}
        >
          Easy
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
          onClick={() => startGame('Medium')}
        >
          Medium
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => startGame('Hard')}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default HomePage;