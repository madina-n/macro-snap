"use client";

import type { FoodItem, FoodFormData } from '@/lib/types';
import FoodLogForm from './FoodLogForm';
import PortionPresetSelector from './PortionPresetSelector';
import QuickAddSection from './QuickAddSection';
import AiSuggestions from './AiSuggestions';

interface LoggingControlsSectionProps {
  onAddFood: (food: Omit<FoodItem, 'id' | 'timestamp'>) => void;
  currentFoodLogs: FoodItem[];
  onAiSuggestionClick: (foodName: string) => void;
  foodFormInitialValues?: Partial<FoodFormData>;
}

const LoggingControlsSection: React.FC<LoggingControlsSectionProps> = ({
  onAddFood,
  currentFoodLogs,
  onAiSuggestionClick,
  foodFormInitialValues,
}) => {
  return (
    <aside className="space-y-6">
      <FoodLogForm onAddFood={onAddFood} initialValues={foodFormInitialValues} />
      <PortionPresetSelector onAddFood={onAddFood} />
      <QuickAddSection onAddFood={onAddFood} />
      <AiSuggestions foodLogs={currentFoodLogs} onSuggestionClick={onAiSuggestionClick} />
    </aside>
  );
};

export default LoggingControlsSection;
