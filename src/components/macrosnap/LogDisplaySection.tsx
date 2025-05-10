"use client";

import type { FoodItem } from '@/lib/types';
import FoodLogList from './FoodLogList';
import ExportButton from './ExportButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks } from 'lucide-react';

interface LogDisplaySectionProps {
  foodLog: FoodItem[];
  onDeleteFood: (foodId: string) => void;
}

const LogDisplaySection: React.FC<LogDisplaySectionProps> = ({ foodLog, onDeleteFood }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl flex items-center">
            <ListChecks className="mr-2 h-6 w-6 text-primary"/> Daily Log
        </CardTitle>
        <ExportButton logs={foodLog} />
      </CardHeader>
      <CardContent>
        <FoodLogList logs={foodLog} onDeleteFood={onDeleteFood} />
      </CardContent>
    </Card>
  );
};

export default LogDisplaySection;
