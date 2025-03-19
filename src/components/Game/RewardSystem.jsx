import React from 'react';
import REWARDS from './RewardMap';

const RewardSystem = ({ level }) => {
  return (
    <div className="reward-system">
      <h2>Reward Levels</h2>
      <ul>
        {Object.entries(REWARDS)
          .reverse()
          .map(([key, value]) => (
            <li key={key} style={{ fontWeight: level === Number(key) ? 'bold' : 'normal' }}>
              Level {key}: {value} points
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RewardSystem;