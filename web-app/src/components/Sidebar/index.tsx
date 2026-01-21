import React from "react";
import {
  Code2,
  Swords,
  Info,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import dcompLabLogHeaderForDark from "@/assets/for-dark/dcomp-lab-log-header-for-dark.png";
import dcompLabLogHeaderForLight from "@/assets/for-light/dcomp-lab-log-header-for-light.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const menuItems: MenuItem[] = [
  {
    icon: <Code2 className="size-5" />,
    label: "Explorar códigos",
  },
  {
    icon: <Swords className="size-5" />,
    label: "Lista de desafios",
  },
];

const secondaryItems: MenuItem[] = [
  {
    icon: <Info className="size-5" />,
    label: "Sobre o DcompLab",
  },
];

export function Sidebar({
                          isOpen,
                          onClose,
                          onThemeToggle,
                          isDarkMode,
                        }: SidebarProps) {
  return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
            side="left"
            className="w-[400px] p-0 flex gap-0 flex-col bg-background border-r border-border"
        >
          <SheetHeader
              className={`relative z-20 flex-row items-center justify-between px-4 py-3 transition-colors duration-300 shadow-[0_1px_4px_rgba(0,0,0,0.25)] ${
                  isDarkMode
                      ? "bg-secondary/80 border-b border-secondary/20"
                      : "bg-secondary/10"
              }`}
          >
            <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className={
                  isDarkMode
                      ? "text-secondary-foreground hover:bg-secondary-foreground/10 cursor-pointer"
                      : "text-primary hover:bg-primary/10 cursor-pointer"
                }
            >
              <X className="size-6" />
            </Button>

            <SheetTitle className="m-0 flex items-center justify-center">
              <img
                  src={
                    isDarkMode
                        ? dcompLabLogHeaderForDark
                        : dcompLabLogHeaderForLight
                  }
                  alt="Logo DcompLab"
                  className="h-8 w-auto object-contain"
              />
            </SheetTitle>

            <Button
                variant="ghost"
                size="icon"
                onClick={onThemeToggle}
                className={
                  isDarkMode
                      ? "text-secondary-foreground hover:bg-secondary-foreground/10 cursor-pointer"
                      : "text-primary hover:bg-primary/10 cursor-pointer"
                }
            >
              {isDarkMode ? (
                  <Moon className="size-5" />
              ) : (
                  <Sun className="size-5" />
              )}
            </Button>
          </SheetHeader>

          <div
              className={`flex-1 flex flex-col transition-all duration-300 ${
                  isDarkMode
                      ? "bg-gradient-to-b from-secondary/80 to-background" 
                      : "bg-gradient-to-b from-secondary/30 to-background" 
              }`}
          >
            <nav className="flex-1 flex flex-col px-4 py-4">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                    <li key={index}>
                      <button
                          onClick={item.onClick}
                          className="flex items-center gap-3 w-full px-3 py-3 rounded-md text-paragraph text-foreground hover:bg-background/40 transition-colors cursor-pointer"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    </li>
                ))}
              </ul>

              <div className="my-4 border-t border-dashed border-foreground/10" />

              <ul className="space-y-1">
                {secondaryItems.map((item, index) => (
                    <li key={index}>
                      <button
                          onClick={item.onClick}
                          className="flex items-center gap-3 w-full px-3 py-3 rounded-md text-paragraph text-foreground hover:bg-background/40 transition-colors cursor-pointer"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    </li>
                ))}
              </ul>
            </nav>

            <footer className="px-4 py-4 border-t border-foreground/10 flex justify-center">
              <div className="flex items-center gap-2 text-muted-foreground text-paragraph-small cursor-pointer">
                <img
                    src={
                      isDarkMode
                          ? dcompLabLogHeaderForDark
                          : dcompLabLogHeaderForLight
                    }
                    alt="Logo DcompLab"
                    className="h-3 w-auto object-contain"
                />
                <span className="underline underline-offset-8">0.1</span>
              </div>
            </footer>
          </div>
        </SheetContent>
      </Sheet>
  );
}