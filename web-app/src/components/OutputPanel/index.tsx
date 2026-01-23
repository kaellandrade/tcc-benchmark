import { ArrowBigDown, Clipboard } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as Toast from "@radix-ui/react-toast";

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
    <Toast.Provider swipeDirection="right">
      <div className="flex flex-col bg-card border-t border-border">
        <div
          className={cn(
              "flex items-center justify-between px-4 py-2 landscape:py-1 transition-colors",
            "bg-primary/10 text-primary",
            "dark:bg-primary/10 dark:text-primary"
          )}
        >
          <span className="text-paragraph font-medium">Saída</span>
          <div className="flex items-center">
            {output && (
              <Button onClick={handleCopy} className="cursor-pointer" variant="link" size="icon-sm">
                <Clipboard className="size-4" />
              </Button>
            )}
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="link"
              className="cursor-pointer"
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
      <Toast.Root
        className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md border bg-background p-[15px] shadow-lg [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={toastOpen}
        onOpenChange={setToastOpen}
      >
        <Toast.Title className="mb-[5px] text-[15px] font-medium text-foreground [grid-area:_title]">
          Saída copiada para a área de transferência!
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  );
}
