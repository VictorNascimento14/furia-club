
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGameContext } from "@/context/GameContext";
import { toast } from "sonner";

const Registration: React.FC = () => {
  const { setFanProfile, setCurrentPage } = useGameContext();
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !age || !location) {
      toast.error("Por favor preencha todos os campos");
      return;
    }

    if (parseInt(age) < 1 || parseInt(age) > 120) {
      toast.error("Por favor digite uma idade válida");
      return;
    }
    
    setIsSubmitting(true);

    // Create the initial fan profile
    const newProfile = {
      name,
      age: parseInt(age),
      location,
      points: 0,
      fanType: "Rookie" as const,
      medals: {
        quizComplete: false,
        perfectScore: false,
        quickAnswer: false,
        sharingSocial: false,
        playAgain: false
      }
    };
    
    // Delay to show loading state
    setTimeout(() => {
      setFanProfile(newProfile);
      setCurrentPage("quiz");
      toast.success("Cadastro realizado com sucesso!");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-md w-full furia-card relative overflow-hidden backdrop-blur-sm bg-gray-900/70">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-furia-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-furia-blue/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-8 text-center furia-title">CADASTRO DE FÃ</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-furia-blue font-semibold">Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="furia-input"
                placeholder="Digite seu nome"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age" className="text-furia-blue font-semibold">Idade</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="furia-input"
                placeholder="Digite sua idade"
                min="1"
                max="120"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-furia-blue font-semibold">Localização</Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="furia-input"
                placeholder="Digite sua cidade"
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="furia-button w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Carregando..." : "Começar Quiz"}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage("landing")}
              className="text-furia-blue/80 hover:text-furia-blue underline text-sm font-medium"
            >
              Voltar para a página inicial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
