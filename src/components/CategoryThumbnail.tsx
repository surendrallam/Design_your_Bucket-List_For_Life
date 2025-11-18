import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryThumbnailProps {
  name: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
}

export const CategoryThumbnail = ({ 
  name, 
  icon: Icon, 
  gradient, 
  onClick 
}: CategoryThumbnailProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center gap-2 min-w-[120px]",
        gradient
      )}
    >
      <Icon className="w-8 h-8 text-white transition-transform group-hover:scale-110" strokeWidth={1.5} />
      <span className="text-xs font-medium text-white text-center line-clamp-2">
        {name}
      </span>
    </button>
  );
};
