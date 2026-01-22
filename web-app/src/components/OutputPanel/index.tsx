import { ArrowBigDown } from "lucide-react";
import {useEffect, useState} from "react";
import { cn } from "@/lib/utils";

interface OutputPanelProps {
  output: string;
}

export function OutputPanel({ output }: OutputPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
      const expandir = Boolean(output)
      if(expandir)
          setIsExpanded(true)
  },[output])

  return (
    <div className="flex flex-col bg-card border-t border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center justify-between px-4 py-3 transition-colors cursor-pointer",
          "bg-primary/10 text-primary",
          "dark:bg-primary/10 dark:text-primary"
        )}
      >
        <span className="text-paragraph font-medium">Saída</span>
        <ArrowBigDown
          className={cn(
            "size-5 transition-transform",
            !isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 bg-background ">
          <div className="p-3 min-h-[60px] font-mono text-paragraph-small">
            {output ? (
              <pre className="whitespace-pre-wrap text-tertiary">
                {">>> "}{output}
              </pre>
            ) : (
              <span className="text-muted-foreground">
                Execute o código para ver a saída
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
