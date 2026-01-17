import { X, Moon, Sun, Code2, Swords, Info, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

export function Sidebar({ isOpen, onClose, onThemeToggle, isDarkMode }: SidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-[280px] p-0 flex flex-col bg-background border-r border-border"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between px-4 py-3 bg-primary">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <X className="size-6" />
          </Button>

          <SheetTitle className="text-subtitle font-bold text-primary-foreground m-0">
            {"{DcompLab}"}
          </SheetTitle>

          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            {isDarkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </Button>
        </SheetHeader>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col px-4 py-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-md text-paragraph text-foreground hover:bg-muted transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Separator */}
          <div className="my-4 border-t border-dashed border-border" />

          <ul className="space-y-1">
            {secondaryItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-md text-paragraph text-foreground hover:bg-muted transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-paragraph-small">
            <Github className="size-5" />
            <span>Versão 0.1</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
