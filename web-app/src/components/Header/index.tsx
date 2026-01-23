import { Logs, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import dcompLabLogHeaderForDark from "@/assets/for-dark/dcomp-lab-log-header-for-dark.png";
import dcompLabLogHeaderForLight from "@/assets/for-light/dcomp-lab-log-header-for-light.png";

interface HeaderProps {
    onMenuClick?: () => void;
    onThemeToggle?: () => void;
    isDarkMode?: boolean;
}

export function Header({
                           onMenuClick,
                           onThemeToggle,
                           isDarkMode = true,
}: HeaderProps) {
    return (
        <header
            className={`relative z-10 flex items-center justify-between px-4 py-1 transition-colors duration-300 shadow-[0_1px_4px_rgba(0,0,0,0.25)] ${
                isDarkMode
                    ? "bg-secondary/80 backdrop-blur-md border-b border-secondary/20"
                    : "bg-secondary/10"
            }`}
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className={
                    isDarkMode
                        ? "text-secondary-foreground hover:bg-secondary-foreground/10 cursor-pointer"
                        : "text-primary hover:bg-primary/10 cursor-pointer"
                }
            >
                <Logs className="size-6" />
            </Button>
            <img
                src={
                    isDarkMode
                        ? dcompLabLogHeaderForDark
                        : dcompLabLogHeaderForLight
                }
                alt="Logo DcompLab"
                className="h-5 w-auto object-contain"
            />
            <Button
                variant="ghost"
                size="icon"
                onClick={onThemeToggle}
                className={
                    isDarkMode
                        ? "text-secondary-foreground hover:bg-secondary-foreground/10 cursor-pointer"
                        : "text-primary hover:bg-primary/20 cursor-pointer"
                }
            >
                {isDarkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </Button>
        </header>
    );
}