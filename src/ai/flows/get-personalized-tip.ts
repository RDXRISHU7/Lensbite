
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CarcinogenSchema = z.object({
  name: z.string().describe('The name of the carcinogenic ingredient.'),
  riskLevel: z.enum(['High', 'Medium', 'Low']).describe('The assessed risk level of the ingredient.'),
  description: z.string().describe('A brief explanation of why this ingredient is considered a risk.'),
});

const FoodScannerOutputSchema = z.object({
  riskScore: z.number().min(0).max(100).describe('An overall risk score from 0 to 100, where 100 is the highest risk.'),
  carcinogens: z.array(CarcinogenSchema).describe('A list of potential carcinogenic ingredients found.'),
  isSafe: z.boolean().describe('A simple boolean indicating if the product is generally considered safe.'),
  summary: z.string().describe('A concise summary of the findings.'),
});

const PersonalizedTipInputSchema = z.object({
  healthReport: z.string().optional().describe("A JSON string containing the user's detailed health profile."),
  foodAnalysis: FoodScannerOutputSchema,
});

const PersonalizedTipOutputSchema = z.object({
  tip: z.string().describe('A personalized health tip based on the user\'s comprehensive health profile and the food they scanned.'),
});

export type PersonalizedTipInput = z.infer<typeof PersonalizedTipInputSchema>;

export async function getPersonalizedTip(
  input: PersonalizedTipInput
): Promise<string> {
  if (!input.healthReport) {
    return "Complete your Health Architecture profile to receive biometric-specific safety tips.";
  }
  
  const result = await getPersonalizedTipFlow(input);
  return result.tip;
}

const prompt = ai.definePrompt({
    name: 'personalizedHealthTipPrompt',
    input: { schema: PersonalizedTipInputSchema },
    output: { schema: PersonalizedTipOutputSchema },
    prompt: `You are a clinical nutritional analyst.
A user has scanned a food product. You must analyze the risks based on their detailed health architecture.

User's Health Architecture (JSON):
{{{healthReport}}}

Food Product Analysis:
- Summary: {{{foodAnalysis.summary}}}
- Risk Score: {{{foodAnalysis.riskScore}}}
{{#if foodAnalysis.carcinogens}}
- Identified Hazards:
{{#each foodAnalysis.carcinogens}}
- {{name}} ({{riskLevel}} Risk): {{description}}
{{/each}}
{{/if}}

STRICT INSTRUCTIONS:
1. Parse the Health Architecture JSON to find specific triggers (e.g., if they have Hypertension, look for Sodium. If they Grill often, warn about PAHs).
2. Connect a specific attribute of the food (hazard or nutrient) to a specific attribute of the user's biometric data (BMI), medical condition, or cooking habits.
3. Be direct and actionable. Use "Based on your clinical profile...".
4. If they have a high BMI, mention metabolic impact. If they use specific meds, warn of interactions if applicable.
5. Provide a single, sophisticated sentence.
`,
});

const getPersonalizedTipFlow = ai.defineFlow(
    {
        name: 'getPersonalizedTipFlow',
        inputSchema: PersonalizedTipInputSchema,
        outputSchema: PersonalizedTipOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
