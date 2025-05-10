export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: number; // For daily logs, milliseconds since epoch
}

export interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface PortionPreset {
  id: string;
  name: string; // e.g., "100g Chicken Breast"
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// For the FoodLogForm using react-hook-form
export interface FoodFormData {
  name: string;
  calories: string; // Input as string, then parse
  protein: string;
  carbs: string;
  fat: string;
}

export interface QuickAddItemUIData {
  name: string;
  icon?: React.ElementType; // Optional: Lucide icon component
  macros: Omit<FoodItem, 'id' | 'timestamp'>; // The actual macro data to add
}
