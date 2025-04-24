
import React, { createContext, useContext, useState, useEffect } from "react";

type FanType = "Rookie" | "Dedicated" | "Veteran" | "Legend" | "FURIA Elite";

type Medals = {
  quizComplete: boolean;
  perfectScore: boolean;
  quickAnswer: boolean;
  sharingSocial: boolean;
  playAgain: boolean;
};

type FanProfile = {
  name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  location: string;
  income: string;
  points: number;
  fanType: FanType;
  medals: Medals;
};

type GameContextType = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  fanProfile: FanProfile | null;
  setFanProfile: (profile: FanProfile) => void;
  updatePoints: (points: number) => void;
  quizCompleted: boolean;
  setQuizCompleted: (completed: boolean) => void;
  rankings: FanProfile[];
  addMedal: (medal: keyof Medals) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Retrieve game state from localStorage if available
  const storedState = localStorage.getItem("furiaFanFrenzyState");
  const initialState = storedState ? JSON.parse(storedState) : null;

  const [currentPage, setCurrentPage] = useState<string>(initialState?.currentPage || "landing");
  const [fanProfile, setFanProfile] = useState<FanProfile | null>(initialState?.fanProfile || null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(initialState?.quizCompleted || false);
  
  // Mock rankings data
  const [rankings, setRankings] = useState<FanProfile[]>(initialState?.rankings || [
    { name: "Art", age: 27, location: "São Paulo", points: 100, fanType: "FURIA Elite", medals: { quizComplete: true, perfectScore: true, quickAnswer: true, sharingSocial: true, playAgain: true } },
    { name: "KSCERATO", age: 24, location: "Rio de Janeiro", points: 95, fanType: "FURIA Elite", medals: { quizComplete: true, perfectScore: true, quickAnswer: true, sharingSocial: true, playAgain: false } },
    { name: "yuurih", age: 23, location: "Salvador", points: 90, fanType: "Legend", medals: { quizComplete: true, perfectScore: true, quickAnswer: true, sharingSocial: false, playAgain: true } },
    { name: "drop", age: 28, location: "Belo Horizonte", points: 85, fanType: "Legend", medals: { quizComplete: true, perfectScore: true, quickAnswer: false, sharingSocial: true, playAgain: true } },
    { name: "chelo", age: 25, location: "Curitiba", points: 80, fanType: "Veteran", medals: { quizComplete: true, perfectScore: false, quickAnswer: true, sharingSocial: true, playAgain: true } },
  ]);

  // Update fan type based on points
  const updateFanType = (points: number): FanType => {
    if (points >= 100) return "FURIA Elite";
    if (points >= 75) return "Legend";
    if (points >= 50) return "Veteran";
    if (points >= 25) return "Dedicated";
    return "Rookie";
  };

  // Update points and fan type
  const updatePoints = (points: number) => {
    if (fanProfile) {
      const updatedPoints = fanProfile.points + points;
      const updatedFanType = updateFanType(updatedPoints);
      
      const updatedProfile = {
        ...fanProfile,
        points: updatedPoints,
        fanType: updatedFanType
      };
      
      setFanProfile(updatedProfile);
      
      // Update in rankings if exists, otherwise add
      const existingIndex = rankings.findIndex(r => r.name === fanProfile.name);
      let newRankings = [...rankings];
      
      if (existingIndex >= 0) {
        newRankings[existingIndex] = updatedProfile;
      } else {
        newRankings.push(updatedProfile);
      }
      
      // Sort rankings by points (descending)
      newRankings.sort((a, b) => b.points - a.points);
      setRankings(newRankings);
    }
  };

  // Add a medal to the user profile
  const addMedal = (medal: keyof Medals) => {
    if (fanProfile && !fanProfile.medals[medal]) {
      const updatedMedals = { ...fanProfile.medals, [medal]: true };
      const updatedProfile = { ...fanProfile, medals: updatedMedals };
      setFanProfile(updatedProfile);
      
      // Award points for medal
      updatePoints(10);
    }
  };

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const gameState = {
      currentPage,
      fanProfile,
      quizCompleted,
      rankings
    };
    localStorage.setItem("furiaFanFrenzyState", JSON.stringify(gameState));
  }, [currentPage, fanProfile, quizCompleted, rankings]);

  return (
    <GameContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        fanProfile,
        setFanProfile,
        updatePoints,
        quizCompleted,
        setQuizCompleted,
        rankings,
        addMedal
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
