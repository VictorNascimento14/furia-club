
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";
import { Trophy, Award, Flag, Share, RefreshCw, Clock, MessageSquare, Gamepad, User } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FanProfile: React.FC = () => {
  const { fanProfile, setCurrentPage, addMedal } = useGameContext();
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  
  if (!fanProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="furia-card text-center">
          <h1 className="text-2xl font-bold mb-4">Perfil não encontrado</h1>
          <p className="mb-6">Você precisa se cadastrar para ver seu perfil.</p>
          <Button onClick={() => setCurrentPage("registration")} className="furia-button">
            Fazer Cadastro
          </Button>
        </div>
      </div>
    );
  }
  
  const { name, email, phone, age, location, points, fanType, medals } = fanProfile;
  
  const getFanTypeDescription = () => {
    switch (fanType) {
      case "Rookie":
        return "Você está começando sua jornada como fã da FURIA. Continue participando para subir de nível!";
      case "Dedicated":
        return "Você é um fã dedicado da FURIA. Está no caminho certo!";
      case "Veteran":
        return "Você é um veterano entre os fãs da FURIA. Seu conhecimento impressiona!";
      case "Legend":
        return "Você é uma lenda entre os fãs da FURIA. Poucos conhecem o time tão bem!";
      case "FURIA Elite":
        return "Você faz parte da elite dos fãs da FURIA. Seu conhecimento e dedicação são incomparáveis!";
      default:
        return "";
    }
  };
  
  const getFanTypeColor = () => {
    switch (fanType) {
      case "Rookie":
        return "from-gray-400 to-gray-300";
      case "Dedicated":
        return "from-green-400 to-green-300";
      case "Veteran":
        return "from-blue-400 to-blue-300";
      case "Legend":
        return "from-purple-400 to-purple-300";
      case "FURIA Elite":
        return "from-yellow-400 to-yellow-300";
      default:
        return "from-gray-400 to-gray-300";
    }
  };
  
  const handlePlayAgain = () => {
    if (!medals.playAgain) {
      addMedal("playAgain");
    }
    setCurrentPage("quiz");
  };
  
  const handleShare = (platform: string) => {
    // Share content
    const shareText = `Sou um fã da FURIA tipo ${fanType} com ${points} pontos! #FURIACLUB`;
    const shareUrl = window.location.href;
    
    let shareLink = "";
    
    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      default:
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, "_blank");
      setShowShareOptions(false);
      
      // Award medal if first time sharing
      if (!medals.sharingSocial) {
        addMedal("sharingSocial");
      }
      
      toast.success("Perfil compartilhado!");
    }
  };

  // User Stats Data
  const userStats = {
    tempoDeUso: "45 dias",
    mensagens: 156,
    quizzesCompletos: 7,
    jogosAssistidos: 23,
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header área com informações principais */}
      <div className="relative w-full py-10 px-4 bg-gradient-to-r from-gray-900 to-black flex flex-col items-center border-b border-furia-blue/30">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Área do avatar e níveis */}
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-furia-blue to-blue-500 flex items-center justify-center text-4xl md:text-5xl font-bold text-black">
              {name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-4">{name}</h1>
            <p className="text-gray-400">{age} anos • {location}</p>
            
            <div className="mt-4">
              <span className={`text-lg font-bold bg-gradient-to-r ${getFanTypeColor()} bg-clip-text text-transparent`}>
                {fanType}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mt-4 bg-gray-800 px-4 py-2 rounded-full">
              <Trophy className="text-furia-blue" size={18} />
              <span className="font-bold text-furia-blue">{points} pontos</span>
            </div>
          </div>
          
          {/* Informações do usuário */}
          <div className="flex-1 flex flex-col w-full max-w-2xl">
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="text-furia-blue" /> Informações do Perfil
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-400 text-sm">Email:</h3>
                  <p className="font-medium">{email}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Telefone:</h3>
                  <p className="font-medium">{phone}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Localização:</h3>
                  <p className="font-medium">{location}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Idade:</h3>
                  <p className="font-medium">{age} anos</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-gray-400 text-sm">Descrição:</h3>
                <p className="mt-2 text-sm text-gray-300">
                  {getFanTypeDescription()}
                </p>
              </div>
            </div>
            
            {/* Estatísticas do usuário */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                <Clock className="text-furia-blue mb-2" size={20} />
                <span className="text-sm text-gray-400">Tempo de uso</span>
                <span className="font-bold text-furia-blue">{userStats.tempoDeUso}</span>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                <MessageSquare className="text-furia-blue mb-2" size={20} />
                <span className="text-sm text-gray-400">Mensagens</span>
                <span className="font-bold text-furia-blue">{userStats.mensagens}</span>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                <Award className="text-furia-blue mb-2" size={20} />
                <span className="text-sm text-gray-400">Quizzes</span>
                <span className="font-bold text-furia-blue">{userStats.quizzesCompletos}</span>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                <Gamepad className="text-furia-blue mb-2" size={20} />
                <span className="text-sm text-gray-400">Jogos Assistidos</span>
                <span className="font-bold text-furia-blue">{userStats.jogosAssistidos}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="w-full max-w-7xl mx-auto mt-8 px-4 pb-20">
        <Tabs defaultValue="medals" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="medals">Medalhas</TabsTrigger>
            <TabsTrigger value="facts">Curiosidades FURIA</TabsTrigger>
            <TabsTrigger value="actions">Ações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="medals" className="space-y-4">
            <h2 className="flex items-center text-xl font-bold mb-3">
              <Award className="text-furia-blue mr-2" size={20} />
              Medalhas
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className={`p-3 rounded-lg text-sm flex flex-col items-center text-center ${medals.quizComplete ? "bg-furia-blue/20 border border-furia-blue/50" : "bg-gray-800 opacity-50"}`}>
                <Award size={24} className={medals.quizComplete ? "text-furia-blue" : "text-gray-400"} />
                <span className="font-bold block mt-2">Quiz Completo</span>
                <span className="text-xs">Concluiu o quiz da FURIA</span>
              </div>
              
              <div className={`p-3 rounded-lg text-sm flex flex-col items-center text-center ${medals.perfectScore ? "bg-furia-blue/20 border border-furia-blue/50" : "bg-gray-800 opacity-50"}`}>
                <Trophy size={24} className={medals.perfectScore ? "text-furia-blue" : "text-gray-400"} />
                <span className="font-bold block mt-2">Pontuação Perfeita</span>
                <span className="text-xs">Acertou todas as perguntas</span>
              </div>
              
              <div className={`p-3 rounded-lg text-sm flex flex-col items-center text-center ${medals.quickAnswer ? "bg-furia-blue/20 border border-furia-blue/50" : "bg-gray-800 opacity-50"}`}>
                <Clock size={24} className={medals.quickAnswer ? "text-furia-blue" : "text-gray-400"} />
                <span className="font-bold block mt-2">Respostas Rápidas</span>
                <span className="text-xs">Completou o quiz rapidamente</span>
              </div>
              
              <div className={`p-3 rounded-lg text-sm flex flex-col items-center text-center ${medals.sharingSocial ? "bg-furia-blue/20 border border-furia-blue/50" : "bg-gray-800 opacity-50"}`}>
                <Share size={24} className={medals.sharingSocial ? "text-furia-blue" : "text-gray-400"} />
                <span className="font-bold block mt-2">Compartilhador</span>
                <span className="text-xs">Compartilhou seu perfil</span>
              </div>
              
              <div className={`p-3 rounded-lg text-sm flex flex-col items-center text-center ${medals.playAgain ? "bg-furia-blue/20 border border-furia-blue/50" : "bg-gray-800 opacity-50"}`}>
                <RefreshCw size={24} className={medals.playAgain ? "text-furia-blue" : "text-gray-400"} />
                <span className="font-bold block mt-2">Fanático</span>
                <span className="text-xs">Jogou o quiz mais de uma vez</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="facts" className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Curiosidades sobre a FURIA</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-furia-blue">
                <h3 className="font-bold mb-2 text-furia-blue">Fundação</h3>
                <p>A FURIA foi fundada em 2017 por Jaime "raizen" Pádua e André Akkari, e rapidamente se tornou uma das organizações mais importantes do cenário brasileiro.</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-furia-blue">
                <h3 className="font-bold mb-2 text-furia-blue">Major</h3>
                <p>Em 2019, a FURIA alcançou a grande final do ECS Season 7, tornando-se a primeira equipe brasileira a atingir tal feito em um evento internacional Tier 1.</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-furia-blue">
                <h3 className="font-bold mb-2 text-furia-blue">Jogadores Icônicos</h3>
                <p>Andrei "arT" Piovezan e Yuri "yuurih" Santos são dois dos jogadores mais longevos da organização e fundamentais no desenvolvimento do estilo agressivo da equipe.</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-furia-blue">
                <h3 className="font-bold mb-2 text-furia-blue">Diversidade</h3>
                <p>A FURIA foi uma das primeiras organizações brasileiras a investir em múltiplas modalidades de esports, incluindo CS:GO, Valorant, Free Fire, Apex Legends e mais.</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-furia-blue">
                <h3 className="font-bold mb-2 text-furia-blue">Reconhecimento</h3>
                <p>Em 2020, a FURIA alcançou o Top 5 do ranking mundial de CS:GO da HLTV, consolidando-se como uma potência global no cenário competitivo.</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-furia-blue">
                <h3 className="font-bold mb-2 text-furia-blue">Estilo de Jogo</h3>
                <p>O "FURIA Style" ficou conhecido mundialmente como um estilo de jogo agressivo e imprevisível, liderado pelas estratégias ousadas do IGL arT.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="actions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy size={20} className="text-furia-blue" /> Ranking
                </h2>
                <p className="mb-4 text-gray-300">Veja como você se compara com outros fãs da FURIA e dispute o topo da classificação.</p>
                <Button
                  onClick={() => setCurrentPage("ranking")}
                  className="w-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <Trophy size={18} /> Ver Ranking
                </Button>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <RefreshCw size={20} className="text-furia-blue" /> Jogue Novamente
                </h2>
                <p className="mb-4 text-gray-300">Desafie-se novamente no quiz da FURIA e tente melhorar sua pontuação!</p>
                <Button
                  onClick={handlePlayAgain}
                  className="w-full furia-button flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} /> Jogar Novamente
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Share size={20} className="text-furia-blue" /> Compartilhar
              </h2>
              <p className="mb-4 text-gray-300">Compartilhe seu perfil de fã da FURIA com seus amigos nas redes sociais!</p>
              <Button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="w-full md:w-auto bg-furia-dark border border-furia-blue text-furia-blue hover:bg-furia-blue/20 flex items-center justify-center gap-2"
              >
                <Share size={18} /> Compartilhar Perfil
              </Button>
              
              {showShareOptions && (
                <div className="absolute z-10 bottom-full left-0 mb-2 bg-gray-800 rounded-lg p-4 border border-furia-blue/30">
                  <h3 className="text-sm font-bold mb-3">Escolha onde compartilhar:</h3>
                  <div className="flex gap-4">
                    <button onClick={() => handleShare("twitter")} className="p-3 hover:bg-gray-700 rounded-lg flex flex-col items-center">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-sky-400">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                      </svg>
                      <span className="text-xs mt-1">Twitter</span>
                    </button>
                    
                    <button onClick={() => handleShare("facebook")} className="p-3 hover:bg-gray-700 rounded-lg flex flex-col items-center">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-blue-600">
                        <path d="M20 12.077C20 7.594 16.418 4 12 4s-8 3.594-8 8.077c0 4.031 2.865 7.385 6.75 7.923v-5.6h-2.031v-2.323h2.031v-1.77c0-2.016 1.194-3.13 3.022-3.13.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.62-1.303 1.258v1.505h2.219l-.355 2.323H13.25v5.6c3.885-.538 6.75-3.892 6.75-7.923z"></path>
                      </svg>
                      <span className="text-xs mt-1">Facebook</span>
                    </button>
                    
                    <button onClick={() => handleShare("whatsapp")} className="p-3 hover:bg-gray-700 rounded-lg flex flex-col items-center">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-green-500">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.172-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                      </svg>
                      <span className="text-xs mt-1">WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <Button
              onClick={() => setCurrentPage("landing")}
              variant="ghost"
              className="mt-8 text-furia-blue/70 hover:text-furia-blue hover:bg-transparent"
            >
              Voltar para a página inicial
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FanProfile;
