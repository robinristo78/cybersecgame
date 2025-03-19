import React from 'react';

const DifficultySelector = ({ onSelectDifficulty }) => {
  return (
    <div className="flex justify-center space-x-4">
      {["Easy", "Medium", "Hard"].map((level) => (
        <button
          key={level}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => onSelectDifficulty(level)}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;