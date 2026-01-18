import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Coffee, Cpu, FileCode2 } from "lucide-react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const languages = [
  { value: "python", label: "Python", icon: FileCode2 },
  { value: "java", label: "Java", icon: Coffee },
  { value: "c", label: "C", icon: Cpu },
];

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
      <div className="flex flex-col gap-2 px-4 py-3">
        <label className="text-paragraph-small font-medium text-muted-foreground ml-1">
          Escolha a linguagem
        </label>

        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
              className={cn(
                  "w-full h-11 border-none transition-all duration-300",
                  "bg-secondary/15 text-primary hover:bg-secondary/20",
                  "dark:bg-secondary/40 dark:text-secondary-foreground dark:hover:bg-secondary/50"
              )}
          >
            <div className="flex items-center gap-2">
              <SelectValue placeholder="Selecione uma linguagem" />
            </div>
          </SelectTrigger>

          <SelectContent>
            {languages.map((lang) => (
                <SelectItem
                    key={lang.value}
                    value={lang.value}
                    className="cursor-pointer focus:bg-secondary/20 dark:focus:bg-secondary/40"
                >
              <span className="flex items-center gap-2">
                <lang.icon className="size-4 text-muted-foreground" />
                <span className="font-medium">{lang.label}</span>
              </span>
                </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
  );
}