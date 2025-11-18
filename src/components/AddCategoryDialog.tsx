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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plane, 
  MapPin, 
  Church, 
  Sparkles, 
  Book, 
  Music, 
  Palette,
  Heart,
  Trophy,
  Target,
  Briefcase,
  GraduationCap,
  Camera,
  Coffee,
  Mountain,
  Waves,
  Flower2,
  Star,
  Moon,
  Sun,
  Flame,
  Droplets,
  Cross,
  LucideIcon
} from "lucide-react";

export const iconOptions: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "plane", label: "Plane", icon: Plane },
  { value: "map-pin", label: "Map Pin", icon: MapPin },
  { value: "church", label: "Church", icon: Church },
  { value: "sparkles", label: "Sparkles", icon: Sparkles },
  { value: "book", label: "Book", icon: Book },
  { value: "music", label: "Music", icon: Music },
  { value: "palette", label: "Art", icon: Palette },
  { value: "heart", label: "Heart", icon: Heart },
  { value: "trophy", label: "Trophy", icon: Trophy },
  { value: "target", label: "Target", icon: Target },
  { value: "briefcase", label: "Career", icon: Briefcase },
  { value: "graduation-cap", label: "Education", icon: GraduationCap },
  { value: "camera", label: "Camera", icon: Camera },
  { value: "coffee", label: "Lifestyle", icon: Coffee },
  { value: "mountain", label: "Mountain", icon: Mountain },
  { value: "waves", label: "Waves", icon: Waves },
  { value: "flower2", label: "Lotus (Hindu)", icon: Flower2 },
  { value: "sun", label: "Sun (Hindu)", icon: Sun },
  { value: "flame", label: "Sacred Flame", icon: Flame },
  { value: "droplets", label: "Holy Water", icon: Droplets },
  { value: "cross", label: "Cross (Christian)", icon: Cross },
  { value: "star", label: "Star (Jewish)", icon: Star },
  { value: "moon", label: "Crescent (Islam)", icon: Moon },
];

export const gradientOptions = [
  { value: "gradient-hero", label: "Sunset Orange", class: "bg-gradient-hero" },
  { value: "gradient-adventure", label: "Ocean Teal", class: "bg-gradient-adventure" },
  { value: "gradient-peace", label: "Purple Dream", class: "bg-gradient-peace" },
  { value: "gradient-sunset", label: "Pink Sunset", class: "bg-gradient-sunset" },
  { value: "gradient-ocean", label: "Deep Ocean", class: "bg-gradient-ocean" },
  { value: "gradient-forest", label: "Forest Green", class: "bg-gradient-forest" },
  { value: "gradient-royal", label: "Royal Purple", class: "bg-gradient-royal" },
  { value: "gradient-fire", label: "Blazing Fire", class: "bg-gradient-fire" },
  { value: "gradient-sky", label: "Clear Sky", class: "bg-gradient-sky" },
  { value: "gradient-cherry", label: "Cherry Blossom", class: "bg-gradient-cherry" },
  { value: "gradient-emerald", label: "Emerald Sea", class: "bg-gradient-emerald" },
  { value: "gradient-amber", label: "Golden Amber", class: "bg-gradient-amber" },
  { value: "gradient-lavender", label: "Soft Lavender", class: "bg-gradient-lavender" },
  { value: "gradient-coral", label: "Coral Reef", class: "bg-gradient-coral" },
  { value: "gradient-mint", label: "Fresh Mint", class: "bg-gradient-mint" },
];

interface AddCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string, iconKey: string, gradient: string) => void;
}

export const AddCategoryDialog = ({ isOpen, onClose, onAdd }: AddCategoryDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("sparkles");
  const [selectedGradient, setSelectedGradient] = useState("gradient-hero");

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name.trim(), description.trim(), selectedIcon, selectedGradient);
      setName("");
      setDescription("");
      setSelectedIcon("sparkles");
      setSelectedGradient("gradient-hero");
      onClose();
    }
  };

  const SelectedIconComponent = iconOptions.find(opt => opt.value === selectedIcon)?.icon || Sparkles;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a custom category for your bucket list
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name *</Label>
            <Input
              id="category-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Books to Read, Skills to Learn"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category-description">Description (Optional)</Label>
            <Textarea
              id="category-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this category is about..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category-icon">Icon</Label>
            <Select value={selectedIcon} onValueChange={setSelectedIcon}>
              <SelectTrigger id="category-icon">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => {
                  const IconComp = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <IconComp className="w-4 h-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-gradient">Color Theme</Label>
            <Select value={selectedGradient} onValueChange={setSelectedGradient}>
              <SelectTrigger id="category-gradient">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {gradientOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${option.class}`} />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 rounded-lg border bg-muted/30">
            <p className="text-sm text-muted-foreground mb-3">Preview:</p>
            <div className={`rounded-lg p-4 ${gradientOptions.find(g => g.value === selectedGradient)?.class}`}>
              <div className="flex items-center gap-3">
                <SelectedIconComponent className="w-6 h-6 text-white" />
                <h3 className="text-lg font-bold text-white">{name || "Your Category"}</h3>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
