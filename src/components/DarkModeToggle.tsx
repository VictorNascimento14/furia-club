
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/use-theme";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-furia-blue" />
      ) : (
        <Moon className="h-5 w-5 text-furia-blue" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
