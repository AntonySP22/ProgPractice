import React, { createContext, useState, useContext } from 'react';

const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [bits, setBits] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);

  const addXp = (amount) => {
    setXp((prevXp) => {
      const newXp = prevXp + amount;
      return newXp;
    });
  };

  const addBits = (amount) => {
    setBits((prevBits) => prevBits + amount);
  };

  const incrementStreak = () => {
    setStreak((prevStreak) => prevStreak + 1);
  };

  const addAchievement = (achievement) => {
    setAchievements((prev) => [...prev, achievement]);
  };

  return (
    <GamificationContext.Provider 
      value={{ 
        xp, 
        bits, 
        streak, 
        achievements,
        addXp, 
        addBits, 
        incrementStreak,
        addAchievement
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification debe usarse dentro de un GamificationProvider');
  }
  return context;
};