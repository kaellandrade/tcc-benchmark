import { ArrowBigDown, Clipboard } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface OutputPanelProps {
  output: string;
}

export function OutputPanel({ output }: OutputPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const expandir = Boolean(output);
    if (expandir) setIsExpanded(true);
  }, [output]);

  function handleCopy() {
    navigator.clipboard.writeText(output);
    toast({
      title: "Saída copiada para a área de transferência!",
    });
  }

  return (
    <div className="flex flex-col bg-card border-t border-border">
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2 transition-colors",
          "bg-primary/10 text-primary",
          "dark:bg-primary/10 dark:text-primary"
        )}
      >
        <span className="text-paragraph font-medium">Saída</span>
        <div className="flex items-center gap-5">
          {output && (
              <Button className="cursor-pointer" onClick={handleCopy} variant="link" size="icon-sm">
                <Clipboard className="size-4" />
              </Button>
          )}
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="link"
            size="icon-sm"
            className="cursor-pointer"
          >
            <ArrowBigDown
              className={cn(
                "size-5 transition-transform",
                !isExpanded && "rotate-180"
              )}
            />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 bg-background ">
          <div className="p-3 min-h-[60px] font-mono text-paragraph-small max-h-60 overflow-y-auto">
            {output ? (
              <pre className="whitespace-pre-wrap text-primary">
                {">>> "}
                {output}
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
