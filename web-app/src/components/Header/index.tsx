import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export function Header({ onMenuClick, onThemeToggle, isDarkMode = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-primary">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="text-primary-foreground hover:bg-primary-foreground/10"
      >
        <Menu className="size-6" />
      </Button>

      <h1 className="text-subtitle font-bold text-primary-foreground">
        {"{DcompLab}"}
      </h1>

      <Button
        variant="ghost"
        size="icon"
        onClick={onThemeToggle}
        className="text-primary-foreground hover:bg-primary-foreground/10"
      >
        {isDarkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
      </Button>
    </header>
  );
}
