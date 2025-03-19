import React, { createContext, useState } from 'react';

export const UnlockedDifficultiesContext = createContext();

export const UnlockedDifficultiesProvider = ({ children }) => {
  const [unlockedDifficulties, setUnlockedDifficulties] = useState(['Easy']); // Default unlocked difficulty

  return (
    <UnlockedDifficultiesContext.Provider value={{ unlockedDifficulties, setUnlockedDifficulties }}>
      {children}
    </UnlockedDifficultiesContext.Provider>
  );
};