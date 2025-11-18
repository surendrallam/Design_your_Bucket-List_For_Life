import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { iconOptions, gradientOptions } from "@/components/AddCategoryDialog";

interface EditCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (name: string, description: string, iconKey: string, gradient: string) => void;
  currentName: string;
  currentDescription?: string;
  currentIconKey: string;
  currentGradient: string;
}

export const EditCategoryDialog = ({ 
  isOpen, 
  onClose, 
  onEdit, 
  currentName,
  currentDescription,
  currentIconKey,
  currentGradient
}: EditCategoryDialogProps) => {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription || "");
  const [selectedIcon, setSelectedIcon] = useState(currentIconKey);
  const [selectedGradient, setSelectedGradient] = useState(currentGradient);

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
      setDescription(currentDescription || "");
      setSelectedIcon(currentIconKey);
      setSelectedGradient(currentGradient);
    }
  }, [isOpen, currentName, currentDescription, currentIconKey, currentGradient]);

  const handleSubmit = () => {
    if (name.trim()) {
      onEdit(name.trim(), description.trim(), selectedIcon, selectedGradient);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update your category details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Category Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Travel Goals"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description (Optional)</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this category is about..."
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-icon">Icon</Label>
            <Select value={selectedIcon} onValueChange={setSelectedIcon}>
              <SelectTrigger id="edit-icon">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-gradient">Color Theme</Label>
            <Select value={selectedGradient} onValueChange={setSelectedGradient}>
              <SelectTrigger id="edit-gradient">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {gradientOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded ${option.class}`} />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
