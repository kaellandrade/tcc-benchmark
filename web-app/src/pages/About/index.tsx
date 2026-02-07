import { Github, Linkedin, GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";

import logoDcomp from "@/assets/logos-dcomplab/logos/dcomp-lab-icon-pwa-1024x.png";

import perfilMicael from "@/assets/perfis/ma.jpeg";
import perfilThiago from "@/assets/perfis/tf.png";

interface AboutProps {
    isSidebarOpen: boolean;
    onSidebarOpen: () => void;
    onSidebarClose: () => void;
    onThemeToggle: () => void;
    isDarkMode: boolean;
}

const developers = [
    {
        name: "Micael Andrade",
        course: "Sistemas de Informação - UFS",
        role: "Desenvolvedor Fullstack",
        img: perfilMicael,
        github: "https://github.com/kaellandrade",
        linkedin: "https://www.linkedin.com/in/micael-andrade-784523220/",
    },
    {
        name: "Thiago Freire",
        course: "Ciência da Computação - UFS",
        role: "Desenvolvedor Fullstack",
        img: perfilThiago,
        github: "https://github.com/treepo1",
        linkedin: "https://www.linkedin.com/in/thiago-freire-8b4668229/",
    },
];


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.15,
        },
    },
};


const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 12 }
    },
};

const GridBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
    </div>
);

export function About({
                          isSidebarOpen,
                          onSidebarOpen,
                          onSidebarClose,
                          onThemeToggle,
                          isDarkMode,
                      }: AboutProps) {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex flex-col bg-background overflow-hidden relative">
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

            <GridBackground />


            <main className="flex-1 w-full overflow-y-auto pt-24 pb-12 px-6 relative z-10 scroll-smooth">

                <motion.div
                    className="flex flex-col items-center max-w-4xl w-full gap-8 mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    <div className="text-center space-y-6">

                        <motion.div
                            className="flex items-center justify-center"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >

                            <motion.div variants={itemVariants}>
                                <img
                                    src={logoDcomp}
                                    alt="Logo DcompLab"
                                    className="size-32 md:size-40 rounded-full shadow-2xl hover:shadow-primary/40 transition-shadow duration-300"
                                />
                            </motion.div>
                        </motion.div>


                        <motion.div className="space-y-4" variants={itemVariants}>
                            <h1 className="text-heading-small font-bold text-foreground">
                                Sobre o{" "}
                                <motion.span
                                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-tertiary via-primary to-tertiary bg-[length:200%_auto]"
                                    animate={{
                                        backgroundPosition: ["0% center", "-200% center"],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    {`{DcompLab}`}
                                </motion.span>
                            </h1>

                            <p className="text-paragraph text-muted-foreground max-w-2xl text-center leading-relaxed px-2 mx-auto">
                                O DcompLab é uma IDE multilinguagem baseada em WebAssembly e PWA,
                                projetada para democratizar o ensino de programação. Nosso objetivo é
                                permitir que estudantes compilem e executem códigos (Java, C, Python)
                                offline, diretamente no navegador.
                            </p>
                        </motion.div>
                    </div>


                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-2"
                        variants={itemVariants}
                    >
                        {developers.map((dev, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "flex flex-col items-center p-6 rounded-xl border transition-colors duration-300",
                                    "bg-card/50 backdrop-blur-sm border-border/50 shadow-sm",
                                    "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
                                    "dark:bg-secondary/5"
                                )}
                            >
                                <div className="size-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 ring-2 ring-background">
                                    <img src={dev.img} alt={dev.name} className="rounded-full w-full h-full object-cover"/>
                                </div>

                                <h2 className="text-subtitle font-bold text-foreground">{dev.name}</h2>
                                <span  className={cn(
                                    "text-label font-light mb-1",
                                    "dark:text-tertiary"
                                )} >{dev.role}</span>

                                <div className="flex items-center gap-2 text-muted-foreground text-paragraph-small mb-6 text-center">
                                    <GraduationCap className="size-4 shrink-0" />
                                    <span>{dev.course}</span>
                                </div>

                                <div className="flex gap-3 w-full mt-auto">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer flex-1 gap-2 border-border/50 hover:bg-secondary/10 hover:text-foreground transition-all"
                                        onClick={() => window.open(dev.github, "_blank")}
                                    >
                                        <Github className="size-4" />
                                        GitHub
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer flex-1 gap-2 border-border/50 hover:bg-blue-500/10 hover:text-foreground transition-all"
                                        onClick={() => window.open(dev.linkedin, "_blank")}
                                    >
                                        <Linkedin className="size-4" />
                                        LinkedIn
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="pb-8">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/")}
                            className="mt-4 gap-2 hover:text-primary underline-offset-4 cursor-pointer"
                        >
                            <ArrowLeft className="size-4" />
                            Voltar para o Editor
                        </Button>
                    </motion.div>

                </motion.div>
            </main>
        </div>
    );
}