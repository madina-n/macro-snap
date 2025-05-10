"use client";

import type { FoodItem, PortionPreset } from '@/lib/types';
import { PORTION_PRESETS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react'; // Icon for presets

interface PortionPresetSelectorProps {
  onAddFood: (food: Omit<FoodItem, 'id' | 'timestamp'>) => void;
}

const PortionPresetSelector: React.FC<PortionPresetSelectorProps> = ({ onAddFood }) => {
  const handlePresetClick = (preset: PortionPreset) => {
    const { id, ...foodData } = preset; // eslint-disable-line @typescript-eslint/no-unused-vars
    onAddFood(foodData);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Zap className="mr-2 h-6 w-6 text-primary" /> Portion Presets
        </CardTitle>
      </CardHeader>
      <CardContent>
        {PORTION_PRESETS.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PORTION_PRESETS.map((preset) => (
              <Button
                key={preset.id}
                variant="outline"
                className="justify-start text-left h-auto py-2 transform hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 ease-in-out whitespace-normal break-words"
                onClick={() => handlePresetClick(preset)}
              >
                <div>
                  <p className="font-semibold">{preset.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {preset.calories}kcal, P:{preset.protein}g, C:{preset.carbs}g, F:{preset.fat}g
                  </p>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No portion presets available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PortionPresetSelector;