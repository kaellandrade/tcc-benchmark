import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { UfoAbduction } from "@/components/illustrations/UfoAbduction";

interface NotFoundProps {
  isSidebarOpen: boolean;
  onSidebarOpen: () => void;
  onSidebarClose: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export function NotFound({
  isSidebarOpen,
  onSidebarOpen,
  onSidebarClose,
  onThemeToggle,
  isDarkMode,
}: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col bg-background overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={onSidebarClose}
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
      />

      <Header
        onMenuClick={onSidebarOpen}
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        <UfoAbduction />

        <p className="text-paragraph text-center text-foreground">
          Erro <span className="text-tertiary font-bold">404</span>: A sintaxe falhou.
          <br />
          Tente outro caminho.
        </p>

        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="gap-2 px-8"
        >
          <Home className="size-4" />
          Home
        </Button>
      </main>
    </div>
  );
}
