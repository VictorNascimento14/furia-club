import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";
import { quizQuestions } from "@/data/quizQuestions";
import { toast } from "sonner";
import { Award, ArrowRight } from "lucide-react";

const Quiz: React.FC = () => {
  const { updatePoints, setCurrentPage, setQuizCompleted, addMedal } = useGameContext();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [recentMedals, setRecentMedals] = useState<Set<string>>(new Set());
  
  // Start timer when component mounts
  useEffect(() => {
    setStartTime(Date.now());
    
    // Set up timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          if (!isAnswered) {
            handleAnswer("");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clean up timer
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestion]);
  
  useEffect(() => {
    if (timeLeft === 0) {
      toast.error("Tempo esgotado!", {
        description: "Tente novamente!"
      });
      setIsAnswered(true);
      setSelectedAnswer(null);
    }
  }, [timeLeft]);
  
  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const isCorrect = answer === quizQuestions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      // Award points based on time left
      const timeBonus = Math.floor(timeLeft / 2);
      const questionPoints = 10 + timeBonus;
      setScore((prev) => prev + questionPoints);
      
      // Check if answered quickly (more than 20 seconds left)
      if (timeLeft > 20) {
        toast("Resposta rápida! +5 pontos bônus", {
          icon: "⚡",
        });
        setScore((prev) => prev + 5);
      }
      
      toast.success("Resposta correta!", {
        description: `+${10 + Math.floor(timeLeft / 2)} pontos`
      });
    } else {
      toast.error("Resposta incorreta");
    }

    const timer = setTimeout(() => {
      if (currentQuestion === quizQuestions.length - 1) {
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000; // tempo em segundos
        
        // Medalha de conclusão do quiz
        addMedal("quizComplete");
        const newRecentMedals = new Set(recentMedals);
        newRecentMedals.add("quizComplete");
        
        toast.success("Parabéns!", {
          description: "Você completou o quiz!",
        });
        updatePoints(score);

        // Medalha de pontuação perfeita
        if (score + (isCorrect ? 1 : 0) === quizQuestions.length) {
          addMedal("perfectScore");
          newRecentMedals.add("perfectScore");
          toast.success("Impressionante!", {
            description: "Pontuação perfeita!",
          });
          updatePoints(10);
        }

        // Medalha de resposta rápida (menos de 2 minutos)
        if (timeTaken < 120) {
          addMedal("quickAnswer");
          newRecentMedals.add("quickAnswer");
          toast.success("Velocidade Incrível!", {
            description: "Resposta super rápida!",
          });
          updatePoints(10);
        }

        setRecentMedals(newRecentMedals);
        setShowScore(true);
        setQuizCompleted(true);
        setCurrentPage("profile");
      }
    }, 1000);

    return () => clearTimeout(timer);
  };
  
  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    }
  };
  
  // Calculate progress
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  
  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      toast.error("Por favor, selecione uma resposta");
      return;
    }

    handleAnswer(selectedAnswer);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-2xl w-full furia-card">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-furia-blue font-bold">
              Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </span>
            <span className="text-furia-blue font-bold flex items-center gap-2">
              <span className={`${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}>
                {timeLeft}s
              </span>
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div
              className="bg-furia-blue h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">
          {quizQuestions[currentQuestion].question}
        </h2>
        
        <div className="space-y-3">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                isAnswered
                  ? option === quizQuestions[currentQuestion].correctAnswer
                    ? "bg-green-600/30 border border-green-500"
                    : option === selectedAnswer
                    ? "bg-red-600/30 border border-red-500"
                    : "bg-gray-800 opacity-50"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        
        {isAnswered && (
          <div className="mt-6">
            <p className={`mb-4 p-4 rounded-lg ${
              selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                ? "bg-green-600/20 border border-green-500/50"
                : "bg-blue-600/20 border border-blue-500/50"
            }`}>
              <span className="font-bold block mb-2">
                {selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                  ? "Resposta correta! 👍"
                  : `Resposta incorreta. A resposta correta é: ${quizQuestions[currentQuestion].correctAnswer}`}
              </span>
              {quizQuestions[currentQuestion].explanation}
            </p>
            
            <Button
              onClick={nextQuestion}
              className="furia-button w-full flex items-center justify-center gap-2"
            >
              {currentQuestion < quizQuestions.length - 1 ? (
                <>
                  Próxima Pergunta <ArrowRight size={18} />
                </>
              ) : (
                "Ver Resultado"
              )}
            </Button>
          </div>
        )}
        
        {!isAnswered && (
          <Button
            onClick={() => setCurrentPage("landing")}
            variant="ghost"
            className="mt-6 text-furia-blue/80 hover:text-furia-blue w-full"
          >
            Voltar para a página inicial
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
