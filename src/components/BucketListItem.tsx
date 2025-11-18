import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditItemDialog } from "./EditItemDialog";

interface BucketListItemProps {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string, description: string) => void;
  onDelete: (id: string) => void;
}

export const BucketListItem = ({ 
  id, 
  text, 
  description, 
  completed, 
  onToggle,
  onEdit,
  onDelete 
}: BucketListItemProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = (newText: string, newDescription: string) => {
    onEdit(id, newText, newDescription);
  };

  return (
    <>
      <div 
        className={cn(
          "group flex items-start gap-3 p-4 rounded-lg border border-border bg-card",
          "transition-all duration-300 hover:shadow-soft hover:border-primary/30",
          completed && "bg-muted/50"
        )}
      >
        <Checkbox
          id={id}
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <label
          htmlFor={id}
          className="flex-1 cursor-pointer"
        >
          <p className={cn(
            "text-base font-medium transition-all duration-300",
            completed && "line-through text-muted-foreground"
          )}>
            {text}
          </p>
          {description && (
            <p className={cn(
              "text-sm text-muted-foreground mt-1 transition-all duration-300",
              completed && "opacity-60"
            )}>
              {description}
            </p>
          )}
        </label>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditOpen(true)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(id)}
            className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <EditItemDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEdit}
        initialText={text}
        initialDescription={description || ""}
      />
    </>
  );
};
