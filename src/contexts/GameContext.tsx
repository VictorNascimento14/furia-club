export type GameContextType = {
  points: number;
  updatePoints: (points: number) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  quizCompleted: boolean;
  setQuizCompleted: (completed: boolean) => void;
  medals: Set<string>;
  addMedal: (medal: string) => void;
};

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [medals, setMedals] = useState<Set<string>>(new Set());

  const updatePoints = (newPoints: number) => {
    setPoints(newPoints);
  };

  const value = {
    points,
    updatePoints,
    currentPage,
    setCurrentPage,
    quizCompleted,
    setQuizCompleted,
    medals,
    addMedal,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}; 