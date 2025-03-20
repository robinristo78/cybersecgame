import React from 'react';
import "./DifficultySelector.css";

const DifficultySelector = ({ onSelectDifficulty }) => {
  return (
    <div className="Border">
      <div className="Button">
        {["Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            className="DifficultyButton"
            onClick={() => onSelectDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;