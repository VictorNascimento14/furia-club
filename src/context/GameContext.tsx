import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

type FanType = "Rookie" | "Dedicated" | "Veteran" | "Legend" | "FURIA Elite";

type Medals = {
  quizComplete: boolean;
  perfectScore: boolean;
  quickAnswer: boolean;
  sharingSocial: boolean;
  playAgain: boolean;
};

export type FanProfile = {
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
  // Get auth context to associate fan profiles with authenticated users
  const { currentUser } = useAuth();
  
  // Retrieve game state from localStorage if available
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [fanProfile, setFanProfile] = useState<FanProfile | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  
  // Mock rankings data
  const [rankings, setRankings] = useState<FanProfile[]>([
    { name: "Art", email: "art@furia.com", password: "", phone: "(11) 99999-1111", age: 27, location: "São Paulo", income: "5000-10000", points: 100, fanType: "FURIA Elite", medals: { quizComplete: true, perfectScore: true, quickAnswer: true, sharingSocial: true, playAgain: true } },
    { name: "KSCERATO", email: "kscerato@furia.com", password: "", phone: "(11) 99999-2222", age: 24, location: "Rio de Janeiro", income: "5000-10000", points: 95, fanType: "FURIA Elite", medals: { quizComplete: true, perfectScore: true, quickAnswer: true, sharingSocial: true, playAgain: false } },
    { name: "yuurih", email: "yuurih@furia.com", password: "", phone: "(11) 99999-3333", age: 23, location: "Salvador", income: "5000-10000", points: 90, fanType: "Legend", medals: { quizComplete: true, perfectScore: true, quickAnswer: true, sharingSocial: false, playAgain: true } },
    { name: "drop", email: "drop@furia.com", password: "", phone: "(11) 99999-4444", age: 28, location: "Belo Horizonte", income: "5000-10000", points: 85, fanType: "Legend", medals: { quizComplete: true, perfectScore: true, quickAnswer: false, sharingSocial: true, playAgain: true } },
    { name: "chelo", email: "chelo@furia.com", password: "", phone: "(11) 99999-5555", age: 25, location: "Curitiba", income: "5000-10000", points: 80, fanType: "Veteran", medals: { quizComplete: true, perfectScore: false, quickAnswer: true, sharingSocial: true, playAgain: true } },
  ]);

  // Load user profile when auth state changes
  useEffect(() => {
    if (currentUser) {
      loadUserProfile(currentUser.email);
    } else {
      setFanProfile(null);
    }
  }, [currentUser]);

  // Load user profile from localStorage
  const loadUserProfile = (userEmail: string) => {
    try {
      // Try to get profile from localStorage
      const storedProfiles = localStorage.getItem("furiaFanProfiles");
      if (storedProfiles) {
        const profiles = JSON.parse(storedProfiles);
        const userProfile = profiles.find((profile: FanProfile) => profile.email === userEmail);
        
        if (userProfile) {
          setFanProfile(userProfile);
          return;
        }
      }
      // No profile found, keep null
      setFanProfile(null);
    } catch (error) {
      console.error("Error loading user profile:", error);
      setFanProfile(null);
    }
  };

  // Save profile to localStorage
  const saveProfileToStorage = (profile: FanProfile) => {
    try {
      let profiles: FanProfile[] = [];
      const storedProfiles = localStorage.getItem("furiaFanProfiles");
      
      if (storedProfiles) {
        profiles = JSON.parse(storedProfiles);
        // Remove old profile if exists
        profiles = profiles.filter(p => p.email !== profile.email);
      }
      
      // Add updated profile
      profiles.push(profile);
      localStorage.setItem("furiaFanProfiles", JSON.stringify(profiles));
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Erro ao salvar perfil");
    }
  };

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
      saveProfileToStorage(updatedProfile);
      
      // Update in rankings if exists, otherwise add
      const existingIndex = rankings.findIndex(r => r.email === fanProfile.email);
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
      saveProfileToStorage(updatedProfile);
      
      // Award points for medal
      updatePoints(10);
    }
  };

  // Set fan profile and save to storage
  const setAndSaveFanProfile = (profile: FanProfile) => {
    setFanProfile(profile);
    saveProfileToStorage(profile);
    
    // Update rankings
    const existingIndex = rankings.findIndex(r => r.email === profile.email);
    let newRankings = [...rankings];
    
    if (existingIndex >= 0) {
      newRankings[existingIndex] = profile;
    } else {
      newRankings.push(profile);
    }
    
    newRankings.sort((a, b) => b.points - a.points);
    setRankings(newRankings);
  };

  return (
    <GameContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        fanProfile,
        setFanProfile: setAndSaveFanProfile,
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
