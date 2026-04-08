'use server';
/**
 * @fileOverview A food ingredient risk assessment AI agent.
 *
 * - foodScannerRiskAssessment - A function that handles the risk assessment process.
 * - FoodScannerInput - The input type for the foodScannerRiskAssessment function.
 * - FoodScannerOutput - The return type for the foodScannerRiskAssessment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FoodScannerInputSchema = z.object({
  ingredients: z.array(z.string()).describe('A list of ingredients from a food product.'),
});
export type FoodScannerInput = z.infer<typeof FoodScannerInputSchema>;

const CarcinogenSchema = z.object({
  name: z.string().describe('The name of the carcinogenic ingredient.'),
  riskLevel: z.enum(['High', 'Medium', 'Low']).describe('The assessed risk level of the ingredient.'),
  description: z.string().describe('A brief explanation of why this ingredient is considered a risk.'),
});

const NutrientLevelSchema = z.object({
    name: z.string().describe('The nutrient name (e.g., Calories, Protein, Carbs, Sodium, Sugar).'),
    value: z.string().describe('The amount found (e.g., 250kcal, 12g, 500mg).'),
    percentage: z.number().min(0).max(200).describe('The percentage of daily recommended intake (0-200).'),
    level: z.enum(['low', 'moderate', 'high']).describe('The health impact level.'),
});

const FoodScannerOutputSchema = z.object({
  riskScore: z.number().min(0).max(100).describe('An overall risk score from 0 to 100.'),
  carcinogens: z.array(CarcinogenSchema).describe('A list of potential carcinogenic ingredients found.'),
  isSafe: z.boolean().describe('A simple boolean indicating if the product is generally considered safe.'),
  summary: z.string().describe('A concise summary of the findings.'),
  novaScore: z.number().min(1).max(4).describe('The NOVA food processing classification (1-4).'),
  nutriScore: z.enum(['A', 'B', 'C', 'D', 'E']).describe('The Nutri-Score nutritional quality grade (A-E).'),
  nutrients: z.array(NutrientLevelSchema).describe('A breakdown of specific nutrients: Calories, Protein, Carbs, Sodium, and Sugar.'),
  dietaryFlags: z.object({
      isVegan: z.boolean(),
      isVegetarian: z.boolean(),
      palmOilFree: z.boolean(),
  }),
  detectedAllergens: z.array(z.string()).describe('List of allergens detected in the ingredients.'),
});
export type FoodScannerOutput = z.infer<typeof FoodScannerOutputSchema>;


export async function foodScannerRiskAssessment(
  input: FoodScannerInput
): Promise<FoodScannerOutput> {
  return foodScannerRiskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'foodScannerRiskPrompt',
  input: { schema: FoodScannerInputSchema },
  output: { schema: FoodScannerOutputSchema },
  prompt: `You are a clinical food safety and nutritional analyst.
  Analyze the following list of ingredients and provide an architectural risk assessment based on the Clinical Intelligence Protocol v4.0.

  Ingredients:
  {{#each ingredients}}
  - {{{this}}}
  {{/each}}

  Your task is to:
  1. **Identify Hazards**: Scan for carcinogenic ingredients (e.g., Nitrates, BHA/BHT, Titanium Dioxide) and process-induced toxins.
  2. **Determine NOVA Class**: Assign a processing classification from 1 (Unprocessed) to 4 (Ultra-processed).
  3. **Estimate Nutri-Score**: Assign a nutritional grade from A to E.
  4. **Nutrient Profiling**: Provide specific percentages (0-150) for Calories, Protein, Carbs, Sodium, and Sugar.
  5. **Dietary Verification**: Check for common allergens and verify Vegan/Vegetarian/Palm Oil Free status.
  6. **Calculate Clinical Risk**: Provide a final score from 0 to 100 based on the density of hazardous additives and processing levels.
  7. **Write Synthesis**: Provide a direct, data-driven summary.

  CRITICAL: You MUST provide values for all 5 nutrients: Calories, Protein, Carbs, Sodium, and Sugar.
  `,
});

const foodScannerRiskAssessmentFlow = ai.defineFlow(
  {
    name: 'foodScannerRiskAssessmentFlow',
    inputSchema: FoodScannerInputSchema,
    outputSchema: FoodScannerOutputSchema,
  },
  async (input) => {
    if (!input.ingredients || input.ingredients.length === 0) {
        throw new Error("No ingredients available for analysis.");
    }
    const { output } = await prompt(input);
    return output!;
  }
);