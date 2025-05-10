"use client";

import type { FoodItem } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface FoodLogListProps {
  logs: FoodItem[];
  onDeleteFood: (foodId: string) => void;
}

const FoodLogList: React.FC<FoodLogListProps> = ({ logs, onDeleteFood }) => {
  if (logs.length === 0) {
    return <p className="text-muted-foreground text-center py-4">No food logged yet today.</p>;
  }

  // Sort logs by timestamp, newest first
  const sortedLogs = [...logs].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <ScrollArea className="h-[400px] rounded-md border shadow-inner">
      <Table>
        <TableHeader className="sticky top-0 bg-card z-10">
          <TableRow>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Calories</TableHead>
            <TableHead className="text-right hidden sm:table-cell">Protein</TableHead>
            <TableHead className="text-right hidden sm:table-cell">Carbs</TableHead>
            <TableHead className="text-right hidden sm:table-cell">Fat</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLogs.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-xs">{format(new Date(item.timestamp), 'HH:mm')}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.calories.toFixed(0)}</TableCell>
              <TableCell className="text-right hidden sm:table-cell">{item.protein.toFixed(1)}g</TableCell>
              <TableCell className="text-right hidden sm:table-cell">{item.carbs.toFixed(1)}g</TableCell>
              <TableCell className="text-right hidden sm:table-cell">{item.fat.toFixed(1)}g</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onDeleteFood(item.id)} aria-label={`Delete ${item.name}`}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default FoodLogList;
