"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { FoodItem } from '@/lib/types'; // FoodFormData is not used here.
import { suggestFrequentFoods, type SuggestFrequentFoodsOutput } from '@/ai/flows/suggest-frequent-foods';
import { USER_ID_FOR_AI } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AiSuggestionsProps {
  foodLogs: FoodItem[];
  onSuggestionClick: (foodName: string) => void; // Callback to pre-fill form
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ foodLogs, onSuggestionClick }) => {
  const [suggestions, setSuggestions] = useState<SuggestFrequentFoodsOutput['suggestedFoods']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchSuggestions = useCallback(async () => {
    if (foodLogs.length < 3) { // Only fetch if there's enough data
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const result = await suggestFrequentFoods({
        userId: USER_ID_FOR_AI,
        foodLogs: foodLogs.map(log => ({ foodName: log.name, dateLogged: new Date(log.timestamp).toISOString() })),
      });
      setSuggestions(result.suggestedFoods);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      toast({
        title: "AI Suggestion Error",
        description: "Could not fetch food suggestions at this time.",
        variant: "destructive",
      });
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [foodLogs, toast]);

  useEffect(() => {
    // Debounce the call to fetchSuggestions
    const timerId = setTimeout(() => {
      fetchSuggestions();
    }, 1500); // Debounce for 1.5 seconds after foodLogs change

    return () => clearTimeout(timerId);
  }, [fetchSuggestions]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Lightbulb className="mr-2 h-6 w-6 text-primary" /> AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Thinking...</p>
          </div>
        )}
        {!isLoading && suggestions.length === 0 && foodLogs.length >=3 && (
          <p className="text-muted-foreground">No suggestions right now. Keep logging!</p>
        )}
         {!isLoading && foodLogs.length < 3 && (
          <p className="text-muted-foreground">Log a few more items for AI suggestions to appear.</p>
        )}
        {!isLoading && suggestions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left transform hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 ease-in-out whitespace-normal break-words h-auto py-2"
                onClick={() => onSuggestionClick(suggestion.foodName)}
                title={`Suggests ${suggestion.foodName} (Prob: ${Math.round(suggestion.probability * 100)}%)`}
              >
                {suggestion.foodName}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiSuggestions;