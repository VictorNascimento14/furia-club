import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Registration from "@/components/Registration";
import Quiz from "@/components/Quiz";
import FanProfile from "@/components/FanProfile";
import Ranking from "@/components/Ranking";
import { GameProvider, useGameContext } from "@/context/GameContext";
import { ArrowRight, Play, LogIn, UserPlus } from "lucide-react";
import { famousQuotes } from "@/data/quizQuestions";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { currentPage, setCurrentPage, fanProfile } = useGameContext();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [randomQuote, setRandomQuote] = useState(famousQuotes[Math.floor(Math.random() * famousQuotes.length)]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Cria animação para o logo
    const logoPulseInterval = setInterval(() => {
      const logoElement = document.getElementById("furia-logo");
      if (logoElement) {
        logoElement.classList.add("animate-pulse-glow");
        setTimeout(() => {
          logoElement.classList.remove("animate-pulse-glow");
        }, 2000);
      }
    }, 5000);
    
    return () => clearInterval(logoPulseInterval);
  }, []);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          toast.error("Não foi possível reproduzir o áudio. Verifique as permissões do navegador.");
        });
      }
      setAudioPlaying(!audioPlaying);
    }
  };
  
  // Manipula o fim do áudio
  const handleAudioEnded = () => {
    setAudioPlaying(false);
  };
  
  if (currentPage === "registration") return <Registration />;
  if (currentPage === "quiz") return <Quiz />;
  if (currentPage === "profile") return <FanProfile />;
  if (currentPage === "ranking") return <Ranking />;
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Elementos de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.1),transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,255,0.05),transparent_60%)]"></div>
      </div>
      
      {/* Cabeçalho com controles de áudio e autenticação */}
      <header className="flex justify-between items-center p-4 z-10">
        <button 
          className={`flex items-center gap-2 px-3 py-2 rounded-full ${audioPlaying ? "bg-furia-blue/20 text-furia-blue" : "bg-gray-800 text-gray-300"}`}
          onClick={toggleAudio}
        >
          <Play size={16} className={audioPlaying ? "animate-pulse" : ""} />
          <span className="text-sm font-medium">
            {audioPlaying ? "Parar música" : "Play música"}
          </span>
        </button>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {fanProfile && (
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentPage("profile")} 
                  className="text-furia-blue hover:text-furia-blue hover:bg-gray-800/50"
                >
                  Meu Perfil
                </Button>
              )}
              <Button
                variant="outline"
                onClick={logout}
                className="border-furia-blue/50 text-furia-blue hover:bg-furia-blue/10"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/auth/login")}
                className="text-white hover:bg-gray-800/50"
              >
                <LogIn size={16} className="mr-2" /> Login
              </Button>
              
              <Button
                onClick={() => navigate("/auth/signup")}
                className="bg-furia-blue/20 border border-furia-blue/50 text-furia-blue hover:bg-furia-blue/30"
              >
                <UserPlus size={16} className="mr-2" /> Cadastre-se
              </Button>
            </>
          )}
        </div>
      </header>
      
      {/* Conteúdo principal */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center z-10">
        <div className="animate-float">
          <h1 
            id="furia-logo"
            className="text-6xl md:text-7xl font-black mb-6 tracking-tighter flex items-center justify-center"
          >
            {/* Espaço para o logo com dimensões fixas */}
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center mr-2">
              <img 
                src="/Furia_Esports_logo.png" 
                alt="FURIA Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="furia-title text-center">FURIA</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-2 text-white/90">FURIA CLUB</p>
        </div>
        
        <p className="max-w-md text-gray-300 mb-8">
          Teste seu conhecimento sobre a FURIA Esports, acumule pontos e conquiste medalhas para se tornar um fã de elite!
        </p>
        
        <div className="flex flex-col w-full max-w-xs gap-4">
          <Button 
            onClick={() => setCurrentPage(fanProfile ? "quiz" : "registration")} 
            className="furia-button text-lg flex items-center justify-center gap-2 py-6"
            disabled={!isAuthenticated}
            
          >
            {fanProfile ? "Começar Quiz" : "Torne-se um FURIOSO"}
          </Button>
          
          {fanProfile && (
            <Button 
              onClick={() => setCurrentPage("ranking")} 
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              Ver Ranking
            </Button>
          )}
          
          {!isAuthenticated && (
            <p className="text-furia-blue text-sm">
              Faça login ou cadastre-se para jogar!
            </p>
          )}
        </div>
        
        {/* Citação famosa */}
        <div className="mt-16 max-w-md furia-card p-5 text-center">
          <p className="italic text-gray-300 text-lg">"{randomQuote.quote}"</p>
          <p className="mt-2 text-furia-blue font-bold">— {randomQuote.player}</p>
        </div>
      </main>
      
      {/* Rodapé */}
      <footer className="p-4 text-center text-gray-500 text-sm z-10">
        <p>© 2025 FURIA CLUB | Todos os direitos reservados</p>
      </footer>
      
      {/* Elemento de áudio */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        loop
        className="hidden"
      >
        <source src="/gamestartup.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

const IndexWithContext = () => {
  return (
    <GameProvider>
      <LandingPage />
    </GameProvider>
  );
};

export default IndexWithContext;
