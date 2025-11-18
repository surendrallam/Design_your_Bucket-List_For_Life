import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, description: string) => void;
  initialText: string;
  initialDescription: string;
}

export const EditItemDialog = ({
  isOpen,
  onClose,
  onSave,
  initialText,
  initialDescription,
}: EditItemDialogProps) => {
  const [text, setText] = useState(initialText);
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim(), description.trim());
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Update the details of your bucket list item
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="edit-text" className="text-sm font-medium text-foreground">
              Item Name *
            </label>
            <Input
              id="edit-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Visit Switzerland"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-description" className="text-sm font-medium text-foreground">
              Description (optional)
            </label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any notes or reasons..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
