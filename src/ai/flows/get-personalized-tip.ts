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
A user has scanned a food product. You must analyze the risks based on their detailed health architecture following Clinical Intelligence Protocol v4.0.

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
1. **Biometric Cross-Reference**: Connect a specific hazard or nutrient signature to a specific biometric attribute (BMI, medical condition, or allergy).
2. **Clinical Directness**: Use "Based on your clinical profile...".
3. **Actionable Action**: Provide a sophisticated, single-sentence tip that explains the physiological impact of this food on the user's specific health architecture.
4. **Scrutiny**: If the user has Hypertension, focus on Sodium signatures. If Diabetes, focus on added sugars and glycemic impact.
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