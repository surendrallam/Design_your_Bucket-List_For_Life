# 🌟 My Life's Bucket List

A beautiful, customizable bucket list tracker to help you capture and achieve your life's dreams and goals. Built with React, TypeScript, and Tailwind CSS.

![Bucket List App](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop)

## ✨ Features

- 📝 **Unlimited Categories** - Create custom categories for travel, experiences, skills, and more
- ✅ **Track Progress** - Mark items as complete and see your achievement progress
- 🎨 **Beautiful Gradients** - Choose from stunning gradient themes for each category
- 🎯 **Detailed Descriptions** - Add context and notes to each bucket list item
- 💾 **Auto-Save** - Your progress is automatically saved to your browser
- 🌓 **Dark Mode** - Comfortable viewing in any lighting
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🎭 **16+ Icons** - Beautiful Lucide icons to represent your categories

## 🚀 Quick Start

### Option 1: Use This as a Template on Lovable

1. Visit [Lovable](https://lovable.dev)
2. Click "Remix this project" or import this GitHub repository
3. Start customizing your bucket list immediately
4. Deploy with one click when ready

### Option 2: Run Locally

#### Prerequisites

- Node.js (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or bun

#### Installation Steps

```bash
# 1. Clone this repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install
# or
bun install

# 3. Start the development server
npm run dev
# or
bun dev

# 4. Open your browser
# Navigate to http://localhost:8080
```

## 🎨 Customization Guide

### Adding Your Own Categories

The app comes with several example categories. To customize them:

1. **Edit Default Categories** - Open `src/pages/Index.tsx` and modify the `defaultCategories` array
2. **Or Use the UI** - Click "Add New Category" button to create new categories on the fly

Example category structure:
```typescript
{
  id: "your-category-id",
  name: "Your Category Name",
  iconKey: "book", // See icon options below
  gradient: "gradient-hero", // See gradient options below
  isCustom: false,
  items: [
    { 
      id: "item-1", 
      text: "Your goal", 
      description: "Optional description", 
      completed: false 
    }
  ]
}
```

### Available Icons

Choose from these Lucide icons:
- `plane` ✈️ - Travel
- `map-pin` 📍 - Locations
- `church` ⛪ - Spiritual/Religious
- `sparkles` ✨ - General/Dreams
- `book` 📚 - Learning
- `music` 🎵 - Entertainment
- `heart` ❤️ - Relationships
- `trophy` 🏆 - Achievements
- `camera` 📷 - Memories
- `palette` 🎨 - Creative
- `coffee` ☕ - Lifestyle
- `mountain` ⛰️ - Adventure
- `graduation-cap` 🎓 - Education
- `briefcase` 💼 - Career
- `dumbbell` 💪 - Fitness
- `utensils` 🍴 - Culinary

### Available Gradients

- `gradient-hero` - Warm orange to golden
- `gradient-adventure` - Ocean teal to sky blue
- `gradient-peace` - Purple to lavender

Add more gradients in `src/index.css`:
```css
--gradient-custom: linear-gradient(135deg, hsl(YOUR_START_COLOR) 0%, hsl(YOUR_END_COLOR) 100%);
```

Then add to `tailwind.config.ts`:
```typescript
backgroundImage: {
  'gradient-custom': 'var(--gradient-custom)',
}
```

### Changing Colors & Theme

Edit the design system in `src/index.css`:

```css
:root {
  --primary: 28 80% 52%; /* Main brand color */
  --secondary: 182 65% 48%; /* Secondary color */
  --accent: 35 95% 62%; /* Accent color */
  /* ... more colors */
}
```

All colors use HSL format for easy customization.

### Replacing the Hero Image

1. Add your image to `src/assets/`
2. Update the import in `src/pages/Index.tsx`:
```typescript
import heroImage from "@/assets/your-image.jpg";
```

## 📋 Template Categories & Ideas

Here are some popular bucket list categories to inspire you:

### 🌍 Travel & Adventure
- Visit the 7 Wonders of the World
- See the Northern Lights
- Go on a safari in Africa
- Backpack through Southeast Asia
- Road trip across your country

### 🎓 Learning & Skills
- Learn a new language
- Master a musical instrument
- Get a certification in your field
- Take a cooking class
- Learn to code

### 💪 Health & Fitness
- Run a marathon
- Climb a mountain
- Learn yoga or meditation
- Complete a triathlon
- Achieve your ideal weight

### 🎨 Creative & Hobbies
- Write a book
- Learn photography
- Start a blog or YouTube channel
- Create a piece of art
- Learn to dance

### 💝 Relationships & Personal
- Volunteer for a cause you care about
- Reconnect with an old friend
- Learn your family history
- Mentor someone
- Practice random acts of kindness

### 💼 Career & Financial
- Start your own business
- Save $X amount
- Get a promotion
- Speak at a conference
- Build a passive income stream

### 🎯 Experiences
- Go skydiving or bungee jumping
- Attend a major sporting event
- See your favorite band live
- Go scuba diving
- Stay in an overwater bungalow

## 🌐 Deployment

### Deploy on Lovable (Recommended)

1. Open your project in [Lovable](https://lovable.dev)
2. Click the **Publish** button (top right on desktop)
3. Your app will be live at `yoursite.lovable.app`
4. Optional: Connect a custom domain in Project Settings

### Deploy on Other Platforms

This is a standard Vite + React app that can be deployed anywhere:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop your `dist` folder after running `npm run build`
- **GitHub Pages**: Use the `gh-pages` package for easy deployment
- **Any static hosting**: Build with `npm run build` and upload the `dist` folder

Build command: `npm run build`
Output directory: `dist`

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **Local Storage** - Data persistence

## 📖 How to Use

1. **Add Categories** - Click "Add New Category" to create themed sections
2. **Add Items** - Use the form in each category to add your goals
3. **Add Details** - Include descriptions to remember why each goal matters
4. **Track Progress** - Check off items as you complete them
5. **Edit Anytime** - Use the edit and delete buttons to keep your list current
6. **Watch Progress** - See your achievement count in the hero section

## 🤝 Contributing

This is a template project! Feel free to:
- Fork it and make it your own
- Share your customizations
- Submit improvements via pull requests
- Create issues for bugs or feature requests

## 📄 License

This project is open source and available under the MIT License.

## 💡 Support

- **Documentation**: [Lovable Docs](https://docs.lovable.dev)
- **Community**: [Lovable Discord](https://discord.gg/lovable)
- **Issues**: Create an issue in this repository

## 🎉 Get Started!

Ready to track your dreams? Click "Use this template" or remix in Lovable and start building your bucket list today!

---

Made with ❤️ using [Lovable](https://lovable.dev) - Build full-stack apps with AI
