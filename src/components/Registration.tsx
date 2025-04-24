
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGameContext } from "@/context/GameContext";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const Registration: React.FC = () => {
  const { setFanProfile, setCurrentPage } = useGameContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    location: "",
    income: "",
    showPassword: false
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.location) {
      toast.error("Por favor preencha todos os campos obrigatórios");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor digite um email válido");
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    // Validate age
    if (parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      toast.error("Por favor digite uma idade válida");
      return;
    }
    
    setIsSubmitting(true);

    // Create the initial fan profile with extended data
    const newProfile = {
      name: formData.name,
      email: formData.email,
      password: formData.password, // In a real app, this should be handled securely
      phone: formData.phone,
      age: parseInt(formData.age),
      location: formData.location,
      income: formData.income,
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
              <Label htmlFor="name" className="text-furia-blue font-semibold">Nome *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="furia-input"
                placeholder="Digite seu nome"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-furia-blue font-semibold">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="furia-input"
                placeholder="Digite seu email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-furia-blue font-semibold">Senha *</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={formData.showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="furia-input"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-furia-blue font-semibold">Confirmar Senha *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={formData.showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="furia-input"
                  placeholder="Confirme sua senha"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-password"
                checked={formData.showPassword}
                onCheckedChange={togglePasswordVisibility}
              />
              <Label htmlFor="show-password">Mostrar senha</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-furia-blue font-semibold">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="furia-input"
                placeholder="Digite seu telefone"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age" className="text-furia-blue font-semibold">Idade *</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                className="furia-input"
                placeholder="Digite sua idade"
                min="1"
                max="120"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-furia-blue font-semibold">Localização *</Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                className="furia-input"
                placeholder="Digite sua cidade"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income" className="text-furia-blue font-semibold">Renda Mensal</Label>
              <Input
                id="income"
                name="income"
                type="text"
                value={formData.income}
                onChange={handleInputChange}
                className="furia-input"
                placeholder="Digite sua renda mensal"
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
