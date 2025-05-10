
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting frequently logged foods to the user.
 *
 * The flow analyzes the user's past food logs and suggests foods that they frequently log, so the user can quickly add them to their current log and save time.
 *
 * @exported suggestFrequentFoods - An async function that takes a `SuggestFrequentFoodsInput` object and returns a `SuggestFrequentFoodsOutput` object.
 * @exported SuggestFrequentFoodsInput - The input type for the `suggestFrequentFoods` function.
 * @exported SuggestFrequentFoodsOutput - The output type for the `suggestFrequentFoods` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the suggestFrequentFoods flow.
 */
const SuggestFrequentFoodsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  foodLogs: z.array(
    z.object({
      foodName: z.string().describe('The name of the food item.'),
      dateLogged: z.string().describe('The date the food was logged (ISO format).'),
    })
  ).optional().describe('The user food log entries to determine frequent foods.'),
});
export type SuggestFrequentFoodsInput = z.infer<typeof SuggestFrequentFoodsInputSchema>;

/**
 * Output schema for the suggestFrequentFoods flow.
 */
const SuggestFrequentFoodsOutputSchema = z.object({
  suggestedFoods: z.array(
    z.object({
      foodName: z.string().describe('The name of the suggested food item.'),
      probability: z.number().describe('The probability that the user wants to log this food (0-1).'),
    })
  ).describe('A list of suggested food items, with the probability that the user wants to log them.  Only include foods with > 70% probability.'),
});
export type SuggestFrequentFoodsOutput = z.infer<typeof SuggestFrequentFoodsOutputSchema>;

/**
 * The suggestFrequentFoods flow.
 */
export async function suggestFrequentFoods(input: SuggestFrequentFoodsInput): Promise<SuggestFrequentFoodsOutput> {
  return suggestFrequentFoodsFlow(input);
}

const getSuggestedFoods = ai.defineTool({
  name: 'getSuggestedFoods',
  description: 'Suggests foods that the user frequently logs, estimating the probability that the user wants to log each food.',
  inputSchema: z.object({
    foodLogs: z.array(
      z.object({
        foodName: z.string().describe('The name of the food item.'),
        dateLogged: z.string().describe('The date the food was logged (ISO format).'),
      })
    ).optional().describe('The user food log entries to determine frequent foods.'),
  }),
  outputSchema: z.array(
    z.object({
      foodName: z.string().describe('The name of the suggested food item.'),
      probability: z.number().describe('The probability that the user wants to log this food (0-1).'),
    })
  ),
},
async (input) => {
  if (!input.foodLogs || input.foodLogs.length === 0) {
    return [];
  }

  const foodCounts: { [foodName: string]: number } = {};
  input.foodLogs.forEach(log => {
    foodCounts[log.foodName] = (foodCounts[log.foodName] || 0) + 1;
  });

  const totalLogs = input.foodLogs.length;
  const suggestedFoods = Object.entries(foodCounts).map(([foodName, count]) => ({
    foodName,
    probability: count / totalLogs,
  }));

  return suggestedFoods;
});

const suggestFrequentFoodsPrompt = ai.definePrompt({
  name: 'suggestFrequentFoodsPrompt',
  input: {schema: SuggestFrequentFoodsInputSchema},
  output: {schema: SuggestFrequentFoodsOutputSchema},
  tools: [getSuggestedFoods],
  prompt: `Based on the user's past food logs, suggest foods that the user frequently logs. Only include foods with a probability of greater than 0.7.

  Include the probability of the food being desired by the user.

  Here are the user's food logs:
  {{#if foodLogs}}
  {{#each foodLogs}}
  - {{foodName}} ({{dateLogged}})
  {{/each}}
  {{else}}
  The user has no food logs.
  {{/if}}`,
});

const suggestFrequentFoodsFlow = ai.defineFlow(
  {
    name: 'suggestFrequentFoodsFlow',
    inputSchema: SuggestFrequentFoodsInputSchema,
    outputSchema: SuggestFrequentFoodsOutputSchema,
  },
  async input => {
    // The getSuggestedFoods tool returns an array directly, not an object with a 'suggestedFoods' property.
    const allSuggestions = await getSuggestedFoods({foodLogs: input.foodLogs});
    
    // Ensure allSuggestions is an array before filtering, though the tool should guarantee this based on its outputSchema.
    const filteredFoods = Array.isArray(allSuggestions)
      ? allSuggestions.filter(food => food.probability > 0.7)
      : [];
      
    return {suggestedFoods: filteredFoods};
  }
);

