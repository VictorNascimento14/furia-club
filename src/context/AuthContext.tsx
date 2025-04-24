
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserData {
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored user data in localStorage
    const storedUser = localStorage.getItem("furiaFanUser");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setCurrentUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user data", error);
        localStorage.removeItem("furiaFanUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, this would be an API call to validate credentials
      // For now, we'll mock the login by checking stored users
      const storedUsers = localStorage.getItem("furiaFanUsers");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          const userData = { name: user.name, email: user.email };
          setCurrentUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("furiaFanUser", JSON.stringify(userData));
          toast.success("Login realizado com sucesso!");
          return true;
        } else {
          toast.error("Email ou senha incorretos");
          return false;
        }
      } else {
        toast.error("Nenhum usuário encontrado");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Erro ao realizar login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, this would be an API call to create a user
      // For now, we'll store users in localStorage
      let users = [];
      const storedUsers = localStorage.getItem("furiaFanUsers");
      
      if (storedUsers) {
        users = JSON.parse(storedUsers);
        
        // Check if email already exists
        if (users.some((user: any) => user.email === email)) {
          toast.error("Este email já está em uso");
          return false;
        }
      }
      
      // Add new user
      users.push({ name, email, password });
      localStorage.setItem("furiaFanUsers", JSON.stringify(users));
      
      // Auto-login after signup
      const userData = { name, email };
      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("furiaFanUser", JSON.stringify(userData));
      
      toast.success("Conta criada com sucesso!");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Erro ao criar conta");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("furiaFanUser");
    toast.success("Logout realizado com sucesso");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
