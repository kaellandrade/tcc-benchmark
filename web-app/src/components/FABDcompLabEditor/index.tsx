import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export function FabEditor() {
    const navigate = useNavigate();

    return (
        <div className="absolute bottom-6 right-6 z-50">
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/")}
                className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-5 rounded-full shadow-lg hover:shadow-primary/40 transition-all cursor-pointer"
            >
                <Code2 className="size-5" />

                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap hidden md:inline-block">
                    Ir para o Editor
                </span>

                <span className="md:hidden">Editor</span>
            </motion.button>
        </div>
    );
}