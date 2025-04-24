import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameProvider, useGameContext } from "@/context/GameContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const success = await login(values.email, values.password);
    setIsLoading(false);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <p className="text-gray-400">Acesse sua conta de fã FURIA</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="furia-input"
                    placeholder="seu@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="furia-input pr-10"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="furia-button w-full mt-6" 
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
            <LogIn className="ml-2" size={16} />
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p>
          Ainda não tem uma conta?{" "}
          <Button variant="link" className="text-furia-blue p-0" onClick={() => navigate("/auth/signup")}>
            Criar conta
          </Button>
        </p>
      </div>
    </div>
  );
};

const SignupForm = () => {
  const { signup } = useAuth();
  const { setFanProfile } = useGameContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    phone: z.string().optional(),
    age: z.string()
      .min(1, { message: "Idade é obrigatória" })
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 120, {
        message: "Idade deve ser um número entre 1 e 120"
      }),
    location: z.string().min(2, { message: "Localização é obrigatória" })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      age: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const success = await signup(values.name, values.email, values.password);
    if (success) {
      // Create fan profile
      const newProfile = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone || "",
        age: parseInt(values.age),
        location: values.location,
        income: "", // Add default empty income to satisfy the type requirement
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
      setFanProfile(newProfile);
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Criar Conta</h1>
        <p className="text-gray-400">Junte-se à comunidade de fãs da FURIA</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    className="furia-input"
                    placeholder="Seu nome"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="furia-input"
                    placeholder="seu@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="furia-input pr-10"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone (opcional)</FormLabel>
                <FormControl>
                  <Input
                    className="furia-input"
                    placeholder="Seu telefone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input
                    className="furia-input"
                    type="number"
                    placeholder="Sua idade"
                    min="1"
                    max="120"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>
                <FormControl>
                  <Input
                    className="furia-input"
                    placeholder="Sua cidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="furia-button w-full mt-6" 
            disabled={isLoading}
          >
            {isLoading ? "Criando..." : "Criar Conta"}
            <UserPlus className="ml-2" size={16} />
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p>
          Já tem uma conta?{" "}
          <Button variant="link" className="text-furia-blue p-0" onClick={() => navigate("/auth/login")}>
            Fazer login
          </Button>
        </p>
      </div>
    </div>
  );
};

const AuthPageContent = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black mb-4 text-center">
            <span className="furia-title">FURIA</span>
          </h1>
          <p className="text-xl font-bold mb-2 text-white/90">FAN FRENZY</p>
        </div>

        <div className="furia-card">
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  return (
    <GameProvider>
      <AuthPageContent />
    </GameProvider>
  );
};

export default AuthPage;
