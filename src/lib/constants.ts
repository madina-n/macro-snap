import type { MacroGoals, PortionPreset, QuickAddItemUIData } from './types';
import { Apple, Banana, Beef, Zap } from 'lucide-react'; // Example icons

export const DEFAULT_MACRO_GOALS: MacroGoals = {
  calories: 2000,
  protein: 150, // grams
  carbs: 200,  // grams
  fat: 60,     // grams
};

export const PORTION_PRESETS: PortionPreset[] = [
  { id: 'preset_chicken_100g', name: '100g Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'preset_rice_1cup', name: '1 cup Cooked Rice', calories: 205, protein: 4.3, carbs: 45, fat: 0.4 },
  { id: 'preset_avocado_1', name: '1 Medium Avocado', calories: 234, protein: 3, carbs: 13, fat: 21 },
  { id: 'preset_egg_1', name: '1 Large Egg', calories: 78, protein: 6, carbs: 0.6, fat: 5 },
];

export const QUICK_ADD_ITEMS: QuickAddItemUIData[] = [
  { 
    name: 'Apple', 
    icon: Apple,
    macros: { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 }
  },
  { 
    name: 'Banana', 
    icon: Banana,
    macros: { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 }
  },
  { 
    name: 'Protein Shake', 
    icon: Zap, // Representing energy/protein
    macros: { name: 'Protein Shake (1 scoop)', calories: 120, protein: 25, carbs: 3, fat: 1.5 }
  },
   { 
    name: 'Almonds (handful)', 
    // icon: Almond, // If Almond icon existed
    macros: { name: 'Almonds (handful, ~28g)', calories: 164, protein: 6, carbs: 6, fat: 14 }
  },
];

export const USER_ID_FOR_AI = 'macrosnap-user-01'; // Mock user ID for AI suggestions
