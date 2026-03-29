'use server';
/**
 * @fileOverview An AI agent for generating food recommendations based on health goals.
 *
 * - getFoodRecommendations - A function that returns a list of recommended foods.
 * - FoodRecommendationInput - The input type for the function.
 * - FoodRecommendationOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FoodRecommendationInputSchema = z.object({
  goals: z.array(z.string()).describe('A list of health goals the user wants to achieve.'),
});
export type FoodRecommendationInput = z.infer<typeof FoodRecommendationInputSchema>;

const FoodItemSchema = z.object({
    name: z.string().describe('The name of the recommended food item.'),
    reason: z.string().describe('A brief reason why this food is recommended for the specific goal.'),
});

const GoalRecommendationSchema = z.object({
    goal: z.string().describe('The health goal these recommendations are for.'),
    foods: z.array(FoodItemSchema).describe('A list of recommended food items for this goal.'),
});

const FoodRecommendationOutputSchema = z.object({
  recommendations: z.array(GoalRecommendationSchema).describe('A list of food recommendations, grouped by health goal.'),
});
export type FoodRecommendationOutput = z.infer<typeof FoodRecommendationOutputSchema>;

export async function getFoodRecommendations(
  input: FoodRecommendationInput
): Promise<FoodRecommendationOutput> {
  return getFoodRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getFoodRecommendationsPrompt',
  input: { schema: FoodRecommendationInputSchema },
  output: { schema: FoodRecommendationOutputSchema },
  prompt: `You are a helpful nutritionist. Based on the user's health goals, provide a list of recommended food items for each goal.

For each goal, suggest 3-5 food items and provide a short, simple reason for each recommendation.

User's Health Goals:
{{#each goals}}
- {{{this}}}
{{/each}}
`,
});

const getFoodRecommendationsFlow = ai.defineFlow(
  {
    name: 'getFoodRecommendationsFlow',
    inputSchema: FoodRecommendationInputSchema,
    outputSchema: FoodRecommendationOutputSchema,
  },
  async (input) => {
    if (!input.goals || input.goals.length === 0) {
        return { recommendations: [] };
    }
    const { output } = await prompt(input);
    return output!;
  }
);
