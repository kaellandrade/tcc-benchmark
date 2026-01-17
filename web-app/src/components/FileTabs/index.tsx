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
            "flex items-center gap-2 px-3 py-1.5 rounded-md text-paragraph-small whitespace-nowrap transition-colors",
            activeTab === tab.id
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <span>{tab.name}</span>
          {activeTab === tab.id && (
            <X
              className="size-3 hover:text-destructive cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
