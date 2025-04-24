
import React from "react";
import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";
import { Trophy, User, Flag } from "lucide-react";

const Ranking: React.FC = () => {
  const { rankings, setCurrentPage, fanProfile } = useGameContext();
  
  // Sort rankings by points (highest first)
  const sortedRankings = [...rankings].sort((a, b) => b.points - a.points);
  
  // Find current user's rank
  const currentUserRank = sortedRankings.findIndex((profile) => fanProfile && profile.name === fanProfile.name) + 1;
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-md w-full furia-card">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold furia-title">Ranking dos Fãs</h1>
          <Trophy className="text-furia-blue" size={24} />
        </div>
        
        {fanProfile && currentUserRank > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-furia-blue/10 border border-furia-blue/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-furia-blue/30 flex items-center justify-center mr-3">
                  <span className="font-bold">{currentUserRank}</span>
                </div>
                <div>
                  <div className="font-bold">{fanProfile.name} <span className="text-furia-blue">(Você)</span></div>
                  <div className="text-sm text-gray-400">{fanProfile.location}</div>
                </div>
              </div>
              <div className="text-xl font-bold">{fanProfile.points}</div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-12 text-sm text-gray-400 mb-2 px-2">
            <div className="col-span-1">#</div>
            <div className="col-span-7">Nome</div>
            <div className="col-span-2 text-center">Tipo</div>
            <div className="col-span-2 text-right">Pontos</div>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
            {sortedRankings.map((profile, index) => {
              const isCurrentUser = fanProfile && profile.name === fanProfile.name;
              const rankClass = 
                index === 0 ? "bg-yellow-500/10 border-yellow-500/30" : 
                index === 1 ? "bg-gray-400/10 border-gray-400/30" : 
                index === 2 ? "bg-amber-700/10 border-amber-700/30" : 
                "bg-gray-800/50";
              
              const medalSymbol = 
                index === 0 ? "🥇" : 
                index === 1 ? "🥈" : 
                index === 2 ? "🥉" : 
                `${index + 1}`;
              
              return (
                <div 
                  key={index}
                  className={`grid grid-cols-12 items-center p-3 rounded-lg ${rankClass} ${isCurrentUser ? "border border-furia-blue/50" : ""}`}
                >
                  <div className="col-span-1 font-bold">{medalSymbol}</div>
                  <div className="col-span-7 flex items-center">
                    <span className="font-semibold">
                      {profile.name} {isCurrentUser && <span className="text-furia-blue text-sm">(Você)</span>}
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className={`
                      text-xs px-2 py-1 rounded-full 
                      ${profile.fanType === "FURIA Elite" ? "bg-yellow-400/20 text-yellow-300" : ""}
                      ${profile.fanType === "Legend" ? "bg-purple-400/20 text-purple-300" : ""}
                      ${profile.fanType === "Veteran" ? "bg-blue-400/20 text-blue-300" : ""}
                      ${profile.fanType === "Dedicated" ? "bg-green-400/20 text-green-300" : ""}
                      ${profile.fanType === "Rookie" ? "bg-gray-400/20 text-gray-300" : ""}
                    `}>
                      {profile.fanType.charAt(0)}
                    </span>
                  </div>
                  <div className="col-span-2 font-bold text-right">{profile.points}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-6 flex flex-col space-y-3">
          <Button
            onClick={() => setCurrentPage("profile")}
            className="furia-button w-full"
          >
            Voltar ao Perfil
          </Button>
          
          <Button
            onClick={() => setCurrentPage("landing")}
            variant="ghost"
            className="text-furia-blue/80 hover:text-furia-blue hover:bg-transparent"
          >
            Página inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
