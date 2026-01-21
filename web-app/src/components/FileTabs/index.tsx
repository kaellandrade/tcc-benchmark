import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileTab {
  id: string;
  name: string;
}

interface FileTabsProps {
  tabs: FileTab[];
  activeTab: string;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
}

export function FileTabs({ tabs, activeTab, onTabClick, onTabClose }: FileTabsProps) {
  return (
      <div className="flex items-center gap-1 overflow-x-auto px-4 py-2 bg-card">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-paragraph-small whitespace-nowrap transition-colors cursor-pointer",
                    activeTab === tab.id
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
            >
              <span>{tab.name}</span>

              {activeTab === tab.id && (
                  <div
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTabClose(tab.id);
                      }}
                      className={cn(
                          "ml-1 flex items-center justify-center rounded-full p-0.5 transition-colors",
                          "bg-red-300 hover:bg-red-400 text-stone-900",
                          "dark:bg-red-400 dark:hover:bg-red-500 dark:text-black"
                      )}
                  >
                    <X className="size-3" />
                  </div>
              )}
            </button>
        ))}
      </div>
  );
}