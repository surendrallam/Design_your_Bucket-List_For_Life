import { BucketListItem } from "./BucketListItem";
import { AddItemForm } from "./AddItemForm";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BucketListItemData {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
}

interface BucketListCategoryProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  items: BucketListItemData[];
  onToggle: (id: string) => void;
  onAdd: (text: string, description: string) => void;
  onEdit: (id: string, text: string, description: string) => void;
  onDelete: (id: string) => void;
  onDeleteCategory?: () => void;
  onEditCategory?: () => void;
  gradient?: string;
  isCustomCategory?: boolean;
}

export const BucketListCategory = ({ 
  title, 
  description,
  icon: Icon, 
  items, 
  onToggle,
  onAdd,
  onEdit,
  onDelete,
  onDeleteCategory,
  onEditCategory,
  gradient = "bg-gradient-hero",
  isCustomCategory = false
}: BucketListCategoryProps) => {
  const completedCount = items.filter(item => item.completed).length;
  const progressPercentage = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="mb-12">
      <div className={cn(
        "rounded-2xl p-6 mb-6 shadow-card relative group",
        gradient
      )}>
        <div className="flex items-center gap-3 mb-3">
          <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
          <h2 className="text-3xl font-bold text-white flex-1">{title}</h2>
          <div className="flex gap-2">
            {onEditCategory && (
              <Button
                size="icon"
                variant="ghost"
                onClick={onEditCategory}
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                title="Edit category"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {isCustomCategory && onDeleteCategory && (
              <Button
                size="icon"
                variant="ghost"
                onClick={onDeleteCategory}
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                title="Delete category"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        {description && (
          <p className="text-white/85 text-sm mb-4 leading-relaxed">{description}</p>
        )}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-white/90 text-sm">
            <span>Progress</span>
            <span className="font-semibold">{completedCount} of {items.length}</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-white/20" />
        </div>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <BucketListItem
            key={item.id}
            {...item}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        <AddItemForm onAdd={onAdd} />
      </div>
    </div>
  );
};
