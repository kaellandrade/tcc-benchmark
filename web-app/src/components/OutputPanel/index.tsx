import { ArrowBigDown, Clipboard } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
} from "@/components/ui/toast";

interface OutputPanelProps {
  output: string;
}

export function OutputPanel({ output }: OutputPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const timerRef = React.useRef(0);

  useEffect(() => {
    const expandir = Boolean(output);
    if (expandir) setIsExpanded(true);
  }, [output]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setToastOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastOpen(true);
    }, 100);
  }

  return (
    <ToastProvider swipeDirection="right">
      <div className="flex flex-col bg-card border-t border-border">
        <div
          className={cn(
            "flex items-center justify-between px-4 py-2 transition-colors",
            "bg-primary/10 text-primary",
            "dark:bg-primary/10 dark:text-primary"
          )}
        >
          <span className="text-paragraph font-medium">Saída</span>
          <div className="flex items-center">
            {output && (
              <Button onClick={handleCopy} variant="ghost" size="icon-sm">
                <Clipboard className="size-4" />
              </Button>
            )}
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="icon-sm"
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
      <Toast open={toastOpen} onOpenChange={setToastOpen}>
        <ToastTitle>Saída copiada para a área de transferência!</ToastTitle>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
