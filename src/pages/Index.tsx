import { useState, useEffect, useRef } from "react";
import { BucketListCategory, BucketListItemData } from "@/components/BucketListCategory";
import { AddCategoryDialog, iconOptions, gradientOptions } from "@/components/AddCategoryDialog";
import { EditCategoryDialog } from "@/components/EditCategoryDialog";
import { CategoryThumbnail } from "@/components/CategoryThumbnail";
import { Button } from "@/components/ui/button";
import { Plane, MapPin, Church, Sparkles, Plus } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

const STORAGE_KEY = "bucket-list-items";
const CATEGORIES_KEY = "bucket-list-categories";

interface Category {
  id: string;
  name: string;
  description?: string;
  iconKey: string;
  gradient: string;
  items: BucketListItemData[];
  isCustom: boolean;
}

// Template categories - customize these or delete them and add your own!
const defaultCategories: Category[] = [
  {
    id: "international",
    name: "Places to Explore (International)",
    description: "Dream destinations across the globe - from ancient wonders to modern marvels, discover the world's most amazing places",
    iconKey: "plane",
    gradient: "gradient-hero",
    isCustom: false,
    items: [
      { id: "int-1", text: "Japan", description: "Experience cherry blossoms, temples, and unique culture", completed: false },
      { id: "int-2", text: "China", description: "Visit the Great Wall and see giant pandas", completed: false },
      { id: "int-3", text: "Paris, France", description: "See the Eiffel Tower and taste authentic French cuisine", completed: false },
      { id: "int-4", text: "Switzerland", description: "Explore the Alps and pristine lakes", completed: false },
      { id: "int-5", text: "New Zealand", description: "Experience Lord of the Rings locations and adventure sports", completed: false },
      { id: "int-6", text: "Iceland", description: "See the Northern Lights and geothermal springs", completed: false },
      { id: "int-7", text: "Bali, Indonesia", description: "Relax in tropical paradise with temples and beaches", completed: false },
      { id: "int-8", text: "Machu Picchu, Peru", description: "Trek to the ancient Incan citadel", completed: false },
      { id: "int-9", text: "Egypt", description: "Explore the Pyramids and ancient history", completed: false },
      { id: "int-10", text: "Australia", description: "Visit the Great Barrier Reef and Sydney Opera House", completed: false },
      { id: "int-11", text: "Greece", description: "Explore ancient ruins and beautiful islands", completed: false },
      { id: "int-12", text: "Norway", description: "Cruise through stunning fjords", completed: false },
    ],
  },
  {
    id: "india",
    name: "Places to Explore (India)",
    description: "Explore the incredible diversity of India - from the Himalayas to tropical beaches, experience rich culture and natural beauty",
    iconKey: "map-pin",
    gradient: "gradient-adventure",
    isCustom: false,
    items: [
      { id: "ind-1", text: "North East India", description: "Meghalaya, Sikkim, Arunachal Pradesh - unique cultures and nature", completed: false },
      { id: "ind-2", text: "Ladakh", description: "Experience the high-altitude desert and monasteries", completed: false },
      { id: "ind-3", text: "Kashmir", description: "Dal Lake, Gulmarg, and the valley of flowers", completed: false },
      { id: "ind-4", text: "Kerala Backwaters", description: "Experience serene houseboat journey through canals", completed: false },
      { id: "ind-5", text: "Rajasthan Forts", description: "Jaipur, Udaipur, Jaisalmer - royal heritage and deserts", completed: false },
      { id: "ind-6", text: "Goa Beaches", description: "Relax on beautiful beaches and enjoy the culture", completed: false },
      { id: "ind-7", text: "Himachal Pradesh", description: "Manali, Shimla, Dharamshala - mountains and spirituality", completed: false },
      { id: "ind-8", text: "Andaman Islands", description: "Pristine beaches and underwater adventures", completed: false },
      { id: "ind-9", text: "Varanasi", description: "Witness the spiritual heart of India on the Ganges", completed: false },
      { id: "ind-10", text: "Rann of Kutch", description: "Experience the white desert and vibrant culture", completed: false },
    ],
  },
  {
    id: "pilgrimage",
    name: "Pilgrimage Places to Visit",
    description: "Sacred journeys to divine destinations - connect with spirituality and find peace at these holy sites",
    iconKey: "flower2",
    gradient: "gradient-peace",
    isCustom: false,
    items: [
      { id: "pil-1", text: "12 Jyotirlingas", description: "Visit all 12 sacred Shiva temples across India", completed: false },
      { id: "pil-2", text: "51 Shakti Peethas", description: "Complete the divine Shakti pilgrimage circuit", completed: false },
      { id: "pil-3", text: "Char Dham Yatra", description: "Badrinath, Kedarnath, Gangotri, Yamunotri", completed: false },
      { id: "pil-4", text: "Amarnath Cave", description: "Trek to the sacred ice lingam shrine", completed: false },
      { id: "pil-5", text: "Tirupati Balaji", description: "Visit one of the richest temples in the world", completed: false },
      { id: "pil-6", text: "Golden Temple, Amritsar", description: "Experience Sikh hospitality at Harmandir Sahib", completed: false },
      { id: "pil-7", text: "Varanasi Ganga Aarti", description: "Witness the sacred evening ceremony on the Ganges", completed: false },
      { id: "pil-8", text: "Puri Jagannath Temple", description: "Visit one of the Char Dham pilgrimage sites", completed: false },
      { id: "pil-9", text: "Shirdi Sai Baba Temple", description: "Seek blessings at the shrine of Sai Baba", completed: false },
      { id: "pil-10", text: "Bodh Gaya", description: "Visit where Buddha attained enlightenment", completed: false },
      { id: "pil-11", text: "Jerusalem", description: "Visit the holy city for Christians, Jews, and Muslims", completed: false },
      { id: "pil-12", text: "Mecca and Medina", description: "Complete the Hajj pilgrimage (for Muslims)", completed: false },
      { id: "pil-13", text: "Vatican City", description: "Visit St. Peter's Basilica and the Sistine Chapel", completed: false },
      { id: "pil-14", text: "Lumbini, Nepal", description: "Visit the birthplace of Lord Buddha", completed: false },
    ],
  },
  {
    id: "activities",
    name: "Adventure & Experiences",
    description: "Thrilling adventures and unforgettable experiences - push your limits and create lasting memories",
    iconKey: "sparkles",
    gradient: "gradient-fire",
    isCustom: false,
    items: [
      { id: "act-1", text: "Scuba Diving", description: "Explore coral reefs and underwater marine life", completed: false },
      { id: "act-2", text: "Bungee Jumping", description: "Take the leap and conquer your fears", completed: false },
      { id: "act-3", text: "Skydiving", description: "Free fall from 10,000+ feet for the ultimate rush", completed: false },
      { id: "act-4", text: "Hot Air Balloon Ride", description: "Float peacefully over scenic landscapes at sunrise", completed: false },
      { id: "act-5", text: "Learn Surfing", description: "Ride the waves and master the ocean", completed: false },
      { id: "act-6", text: "Paragliding", description: "Soar like a bird over mountains and valleys", completed: false },
      { id: "act-7", text: "White Water Rafting", description: "Navigate through rapids and wild rivers", completed: false },
      { id: "act-8", text: "Mountain Climbing", description: "Summit a challenging peak", completed: false },
      { id: "act-9", text: "Zip Lining", description: "Fly through forests and canyons on a cable", completed: false },
      { id: "act-10", text: "Safari Adventure", description: "See wild animals in their natural habitat", completed: false },
      { id: "act-11", text: "Learn Scuba Diving", description: "Get certified and explore the underwater world", completed: false },
      { id: "act-12", text: "Northern Lights Chase", description: "Witness the Aurora Borealis in person", completed: false },
      { id: "act-13", text: "Swim with Dolphins", description: "Experience these intelligent creatures up close", completed: false },
      { id: "act-14", text: "Go on a Road Trip", description: "Drive across a country with no fixed plans", completed: false },
      { id: "act-15", text: "Attend a Major Festival", description: "Tomorrowland, Coachella, or cultural festivals", completed: false },
    ],
  },
];

const Index = () => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        console.error("Failed to load saved categories");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  const handleToggle = (categoryId: string) => (itemId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map(item =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : cat
      )
    );
  };

  const handleAdd = (categoryId: string) => (text: string, description: string) => {
    const newItem: BucketListItemData = {
      id: `${categoryId}-${Date.now()}`,
      text,
      description,
      completed: false,
    };
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, items: [...cat.items, newItem] } : cat
      )
    );
  };

  const handleEdit = (categoryId: string) => (itemId: string, text: string, description: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map(item =>
                item.id === itemId ? { ...item, text, description } : item
              ),
            }
          : cat
      )
    );
  };

  const handleDelete = (categoryId: string) => (itemId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
          : cat
      )
    );
  };

  const handleAddCategory = (name: string, description: string, iconKey: string, gradient: string) => {
    const newCategory: Category = {
      id: `custom-${Date.now()}`,
      name,
      description,
      iconKey,
      gradient,
      items: [],
      isCustom: true,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const handleEditCategory = (categoryId: string) => (name: string, description: string, iconKey: string, gradient: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, name, description, iconKey, gradient }
          : cat
      )
    );
    setEditingCategory(null);
  };

  const getIconComponent = (iconKey: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconKey);
    return iconOption?.icon || Sparkles;
  };

  const getGradientClass = (gradient: string) => {
    const gradientOption = gradientOptions.find(opt => opt.value === gradient);
    return gradientOption?.class || "bg-gradient-hero";
  };

  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const allItems = categories.flatMap(cat => cat.items);
  const totalCompleted = allItems.filter(item => item.completed).length;
  const totalItems = allItems.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Travel inspiration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            My Life's Bucket List
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 drop-shadow-md max-w-2xl">
            Track your dreams, adventures, and once-in-a-lifetime experiences
          </p>
          <div className="bg-card/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-card">
            <p className="text-lg font-semibold text-foreground">
              <span className="text-primary">{totalCompleted}</span> of <span className="text-primary">{totalItems}</span> dreams achieved
            </p>
          </div>
        </div>
      </header>

      {/* Category Thumbnails Navigation */}
      <div className="bg-card border-y border-border sticky top-0 z-40 shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const IconComponent = getIconComponent(category.iconKey);
              return (
                <CategoryThumbnail
                  key={category.id}
                  name={category.name}
                  icon={IconComponent}
                  gradient={getGradientClass(category.gradient)}
                  onClick={() => scrollToCategory(category.id)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container max-w-5xl mx-auto px-4 py-16">
        {categories.map((category) => {
          const IconComponent = getIconComponent(category.iconKey);
          return (
            <section 
              key={category.id} 
              ref={(el) => (categoryRefs.current[category.id] = el)}
            >
              <BucketListCategory
                title={category.name}
                description={category.description}
                icon={IconComponent}
                items={category.items}
                onToggle={handleToggle(category.id)}
                onAdd={handleAdd(category.id)}
                onEdit={handleEdit(category.id)}
                onDelete={handleDelete(category.id)}
                onDeleteCategory={category.isCustom ? () => handleDeleteCategory(category.id) : undefined}
                onEditCategory={() => setEditingCategory(category)}
                gradient={getGradientClass(category.gradient)}
                isCustomCategory={category.isCustom}
              />
            </section>
          );
        })}

        {/* Add Category Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setIsAddCategoryOpen(true)}
            size="lg"
            className="shadow-soft"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Category
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container max-w-5xl mx-auto px-4 text-center text-muted-foreground">
          <p>Keep dreaming, keep exploring, keep living ✨</p>
        </div>
      </footer>

      <AddCategoryDialog
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onAdd={handleAddCategory}
      />
      
      {editingCategory && (
        <EditCategoryDialog
          isOpen={!!editingCategory}
          onClose={() => setEditingCategory(null)}
          onEdit={handleEditCategory(editingCategory.id)}
          currentName={editingCategory.name}
          currentDescription={editingCategory.description}
          currentIconKey={editingCategory.iconKey}
          currentGradient={editingCategory.gradient}
        />
      )}
    </div>
  );
};

export default Index;
