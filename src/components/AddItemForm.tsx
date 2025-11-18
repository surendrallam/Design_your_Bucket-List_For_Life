import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddItemFormProps {
  onAdd: (text: string, description: string) => void;
  className?: string;
}

export const AddItemForm = ({ onAdd, className }: AddItemFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), description.trim());
      setText("");
      setDescription("");
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setText("");
    setDescription("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className={cn("w-full border-dashed hover:border-primary hover:bg-primary/5", className)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Item
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("p-4 rounded-lg border-2 border-dashed border-primary/30 bg-card space-y-3", className)}>
      <div className="space-y-2">
        <label htmlFor="item-text" className="text-sm font-medium text-foreground">
          Item Name *
        </label>
        <Input
          id="item-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., Visit Switzerland"
          autoFocus
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="item-description" className="text-sm font-medium text-foreground">
          Description (optional)
        </label>
        <Textarea
          id="item-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add any notes or reasons..."
          rows={2}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
        <Button type="button" variant="outline" onClick={handleCancel}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
