import React from "react";
import {
    Swords,
    Info,
    X,
    Moon,
    Sun,
    Code2
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {useNavigate, useLocation} from "react-router-dom";
import {cn} from "@/lib/utils";
import dcompLabLogHeaderForDark from "@/assets/for-dark/dcomp-lab-log-header-for-dark.png";
import dcompLabLogHeaderForLight from "@/assets/for-light/dcomp-lab-log-header-for-light.png";
import {Library} from "lucide-react";


interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onThemeToggle: () => void;
    isDarkMode: boolean;
}

interface MenuItem {
    icon: React.ReactNode;
    label: string;
    path?: string;
    onClick?: () => void;
}

export function Sidebar({
                            isOpen,
                            onClose,
                            onThemeToggle,
                            isDarkMode,
                        }: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper para verificar se a rota está ativa
    const isActive = (path?: string) => {
        if (!path) return false;
        return location.pathname === path;
    };

    const menuItems: MenuItem[] = [
        {
            icon: <Code2 className="size-5"/>,
            label: "Editor de Código",
            path: "/",
            onClick: () => {
                navigate("/");
                onClose();
            }
        },
        {
            icon: <Library className="size-5"/>,
            label: "Algoritmos Clássicos",
            path: "/algorithms",
            onClick: () => {
                navigate("/algorithms");
                onClose();
            }
        },
        {
            icon: <Swords className="size-5"/>,
            label: "Lista de desafios",
            onClick: () => {
                onClose();
            }
        },
    ];

    const secondaryItems: MenuItem[] = [
        {
            icon: <Info className="size-5"/>,
            label: "Sobre o DcompLab",
            path: "/about",
            onClick: () => {
                navigate("/about");
                onClose();
            },
        },
    ];

    // Componente interno para renderizar o item de lista (Evita repetição de código)
    const renderMenuItem = (item: MenuItem, index: number) => {
        const active = isActive(item.path);

        return (
            <li key={index}>
                <button
                    onClick={item.onClick}
                    className={cn(
                        "flex items-center gap-3 w-full px-3 py-3 rounded-md transition-all duration-200 cursor-pointer text-paragraph",
                        // Lógica de Estilos Condicionais:
                        active
                            ? "bg-primary/15 text-primary font-bold shadow-sm border-l-4 border-primary" // Estilo ATIVO
                            : "text-foreground hover:bg-background/40 hover:text-foreground/80 border-l-4 border-transparent" // Estilo INATIVO
                    )}
                >
                    {/* Se estiver ativo, o ícone também pode ganhar um destaque extra se quiser */}
                    <span className={cn(active ? "text-primary" : "text-muted-foreground")}>
            {item.icon}
          </span>
                    <span>{item.label}</span>
                </button>
            </li>
        );
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                side="left"
                className="w-[400px] p-0 flex gap-0 flex-col bg-background border-r border-border"
            >
                <SheetHeader
                    className={`relative z-20 flex-row items-center justify-between px-4 py-1 transition-colors duration-300 shadow-[0_1px_4px_rgba(0,0,0,0.25)] ${
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
                        <X className="size-6"/>
                    </Button>

                    <SheetTitle className="m-0 flex items-center justify-center">
                        <img
                            src={
                                isDarkMode
                                    ? dcompLabLogHeaderForDark
                                    : dcompLabLogHeaderForLight
                            }
                            alt="Logo DcompLab"
                            className="h-5 w-auto object-contain"
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
                            <Moon className="size-5"/>
                        ) : (
                            <Sun className="size-5"/>
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
                        {/* Lista Principal */}
                        <ul className="space-y-2">
                            {menuItems.map((item, index) => renderMenuItem(item, index))}
                        </ul>

                        <div className="my-4 border-t border-dashed border-foreground/10"/>

                        {/* Lista Secundária */}
                        <ul className="space-y-2">
                            {secondaryItems.map((item, index) => renderMenuItem(item, index))}
                        </ul>
                    </nav>

                    <footer className="px-4 py-4 border-t border-foreground/10 flex justify-center">
                        <div
                            onClick={() => window.open("https://github.com/kaellandrade/tcc-benchmark", "_blank")}
                            className="flex items-center gap-2 text-muted-foreground text-paragraph-small cursor-pointer">
                            <img
                                src={
                                    isDarkMode
                                        ? dcompLabLogHeaderForDark
                                        : dcompLabLogHeaderForLight
                                }
                                alt="Logo DcompLab"
                                className="h-3 w-auto object-contain"
                            />
                            <span className="underline underline-offset-8">
                                v{import.meta.env.PACKAGE_VERSION}
                            </span>
                        </div>
                    </footer>
                </div>
            </SheetContent>
        </Sheet>
    );
}