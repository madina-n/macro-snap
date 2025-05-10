"use client";

import React, { useState, useEffect, useMemo } from 'react';
import AppHeader from '@/components/macrosnap/AppHeader';
import MacroDisplaySection from '@/components/macrosnap/MacroDisplaySection';
import LoggingControlsSection from '@/components/macrosnap/LoggingControlsSection';
import LogDisplaySection from '@/components/macrosnap/LogDisplaySection';
import { Toaster } from '@/components/ui/toaster';
import type { FoodItem, MacroGoals, FoodFormData } from '@/lib/types';
import { DEFAULT_MACRO_GOALS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

export default function MacroSnapPage() {
  const [dailyLog, setDailyLog] = useState<FoodItem[]>([]);
  const [macroGoals, setMacroGoals] = useState<MacroGoals>(DEFAULT_MACRO_GOALS);
  const [foodFormInitialValues, setFoodFormInitialValues] = useState<Partial<FoodFormData>>({});
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const storedLog = localStorage.getItem('macroSnapDailyLog');
    if (storedLog) {
      try {
        const parsedLog: FoodItem[] = JSON.parse(storedLog);
        // Filter out logs not from today
        const today = new Date().toDateString();
        const todayLog = parsedLog.filter(item => new Date(item.timestamp).toDateString() === today);
        setDailyLog(todayLog);
      } catch (error) {
        console.error("Failed to parse daily log from localStorage", error);
        localStorage.removeItem('macroSnapDailyLog'); // Clear corrupted data
      }
    }
    const storedGoals = localStorage.getItem('macroSnapMacroGoals');
    if (storedGoals) {
       try {
        setMacroGoals(JSON.parse(storedGoals));
      } catch (error) {
        console.error("Failed to parse macro goals from localStorage", error);
        localStorage.removeItem('macroSnapMacroGoals');
      }
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('macroSnapDailyLog', JSON.stringify(dailyLog));
  }, [dailyLog]);

  useEffect(() => {
    localStorage.setItem('macroSnapMacroGoals', JSON.stringify(macroGoals));
  }, [macroGoals]);


  const currentMacros = useMemo(() => {
    return dailyLog.reduce(
      (acc, item) => {
        acc.calories += Number(item.calories) || 0;
        acc.protein += Number(item.protein) || 0;
        acc.carbs += Number(item.carbs) || 0;
        acc.fat += Number(item.fat) || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [dailyLog]);

  const addFoodToLog = (food: Omit<FoodItem, 'id' | 'timestamp'>) => {
    const newLogEntry: FoodItem = {
      ...food,
      id: `${Date.now().toString()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
    };
    setDailyLog(prev => [...prev, newLogEntry]);
    toast({
      title: "Food Logged!",
      description: `${food.name} added to your daily log.`,
    });
  };

  const deleteFoodFromLog = (foodId: string) => {
    const foodToDelete = dailyLog.find(item => item.id === foodId);
    setDailyLog(prev => prev.filter(item => item.id !== foodId));
     if (foodToDelete) {
      toast({
        title: "Food Removed",
        description: `${foodToDelete.name} removed from your log.`,
        variant: "destructive",
      });
    }
  };
  
  const handleAiSuggestionClick = (foodName: string) => {
    setFoodFormInitialValues({ name: foodName, calories: '', protein: '', carbs: '', fat: '' });
     toast({
      title: "AI Suggestion",
      description: `"${foodName}" pre-filled. Please add macro details.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <MacroDisplaySection currentMacros={currentMacros} macroGoals={macroGoals} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 order-2 lg:order-1">
             <LogDisplaySection foodLog={dailyLog} onDeleteFood={deleteFoodFromLog} />
          </div>
          <div className="lg:col-span-1 order-1 lg:order-2">
            <LoggingControlsSection
              onAddFood={addFoodToLog}
              currentFoodLogs={dailyLog}
              onAiSuggestionClick={handleAiSuggestionClick}
              foodFormInitialValues={foodFormInitialValues}
            />
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
