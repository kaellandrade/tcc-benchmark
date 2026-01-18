import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OutputPanelProps {
  output: string;
}

export function OutputPanel({ output }: OutputPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex flex-col bg-card border-t border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-muted transition-colors"
      >
        <span className="text-paragraph font-medium">Saída</span>
        <ChevronUp
          className={cn(
            "size-5 transition-transform",
            !isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="bg-background rounded-md p-3 min-h-[60px] font-mono text-paragraph-small">
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
