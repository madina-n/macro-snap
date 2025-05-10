"use client";

import type { FoodItem, QuickAddItemUIData } from '@/lib/types';
import { QUICK_ADD_ITEMS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rabbit } from 'lucide-react'; // Icon for "Quick"

interface QuickAddSectionProps {
  onAddFood: (food: Omit<FoodItem, 'id' | 'timestamp'>) => void;
}

const QuickAddSection: React.FC<QuickAddSectionProps> = ({ onAddFood }) => {
  const handleQuickAddClick = (item: QuickAddItemUIData) => {
    onAddFood(item.macros);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
            <Rabbit className="mr-2 h-6 w-6 text-primary"/> Quick Add
        </CardTitle>
      </CardHeader>
      <CardContent>
        {QUICK_ADD_ITEMS.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-3">
            {QUICK_ADD_ITEMS.map((item) => (
              <Button
                key={item.name}
                variant="secondary"
                className="flex flex-col items-center justify-center h-24 p-3 text-center transform hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 ease-in-out whitespace-normal break-words"
                onClick={() => handleQuickAddClick(item)}
                title={`Quick add ${item.name}`}
              >
                {item.icon && <item.icon className="h-7 w-7 mb-1.5 text-secondary-foreground" />}
                <span className="text-sm font-medium text-secondary-foreground">{item.name}</span>
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No quick add items available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickAddSection;

