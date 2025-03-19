import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnlockedDifficultiesContext } from '../components/UnlockedDifficultiesContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { unlockedDifficulties } = useContext(UnlockedDifficultiesContext); 

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
          className={`px-4 py-2 rounded ${
            unlockedDifficulties.includes('Medium')
              ? 'bg-yellow-500 text-white hover:bg-yellow-700'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          onClick={() => unlockedDifficulties.includes('Medium') && startGame('Medium')}
          disabled={!unlockedDifficulties.includes('Medium')}
        >
          Medium
        </button>
        <button
          className={`px-4 py-2 rounded ${
            unlockedDifficulties.includes('Hard')
              ? 'bg-red-500 text-white hover:bg-red-700'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          onClick={() => unlockedDifficulties.includes('Hard') && startGame('Hard')}
          disabled={!unlockedDifficulties.includes('Hard')}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default HomePage;