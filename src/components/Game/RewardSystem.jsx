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
            <li key={key} style={{backgroundColor: 'rgb(11, 3, 44)', color: level >= Number(key) ? 'yellow' : 'inherit', fontWeight: level === Number(key) ? 'bold' : 'normal' }}>
              {value}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RewardSystem;