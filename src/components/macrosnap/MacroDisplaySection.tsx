"use client";

import type { MacroGoals } from '@/lib/types';
import ProgressRing from './ProgressRing';
import { Flame, Beef, Leaf, Droplets } from 'lucide-react'; // Icons for macros

interface MacroDisplaySectionProps {
  currentMacros: { calories: number; protein: number; carbs: number; fat: number; };
  macroGoals: MacroGoals;
}

const MacroDisplaySection: React.FC<MacroDisplaySectionProps> = ({ currentMacros, macroGoals }) => {
  return (
    <section aria-labelledby="macro-tracking-title">
      <h2 id="macro-tracking-title" className="sr-only">Macro Tracking Progress</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ProgressRing
          label="Calories"
          value={currentMacros.calories}
          maxValue={macroGoals.calories}
          color="hsl(var(--chart-1))" // Use themed chart color
          unit="kcal"
          icon={<Flame className="h-5 w-5 text-chart-1" />}
        />
        <ProgressRing
          label="Protein"
          value={currentMacros.protein}
          maxValue={macroGoals.protein}
          color="hsl(var(--chart-2))"
          unit="g"
          icon={<Beef className="h-5 w-5 text-chart-2" />}
        />
        <ProgressRing
          label="Carbs"
          value={currentMacros.carbs}
          maxValue={macroGoals.carbs}
          color="hsl(var(--chart-3))" // Define more chart colors in globals.css if needed
          unit="g"
          icon={<Leaf className="h-5 w-5 text-chart-3" />}
        />
        <ProgressRing
          label="Fat"
          value={currentMacros.fat}
          maxValue={macroGoals.fat}
          color="hsl(var(--chart-4))"
          unit="g"
          icon={<Droplets className="h-5 w-5 text-chart-4" />}
        />
      </div>
    </section>
  );
};

export default MacroDisplaySection;
