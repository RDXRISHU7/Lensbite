'use server';
/**
 * @fileOverview An AI agent for extracting product information from an image.
 *
 * - extractIngredientsFromImage - A function that analyzes a food product image.
 * - ExtractIngredientsInput - The input type for the function.
 * - ExtractIngredientsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExtractIngredientsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a food product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userProvidedIngredients: z.string().optional().describe('A string containing ingredients manually entered by the user.'),
});
export type ExtractIngredientsInput = z.infer<typeof ExtractIngredientsInputSchema>;

const ExtractIngredientsOutputSchema = z.object({
  productName: z.string().describe('The name of the food product identified in the image.'),
  ingredients: z.array(z.string()).describe('A comprehensive list of ingredients for the product.'),
  aiNotes: z.string().optional().describe('Any notes from the AI, like if it had to guess ingredients or if the image was unclear.'),
});
export type ExtractIngredientsOutput = z.infer<typeof ExtractIngredientsOutputSchema>;

export async function extractIngredientsFromImage(
  input: ExtractIngredientsInput
): Promise<ExtractIngredientsOutput> {
  return extractIngredientsFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractIngredientsPrompt',
  input: { schema: ExtractIngredientsInputSchema },
  output: { schema: ExtractIngredientsOutputSchema },
  prompt: `You are an expert at analyzing images of food products to identify them and extract their ingredients.

You will be given a photo of a food product and an optional list of ingredients provided by the user.

Your tasks are:
1.  **Identify the Product**: Determine the name of the product in the image.
2.  **Extract Ingredients from Image**: Carefully read the ingredients list from the product packaging in the photo. If the list is not visible or readable, note that.
3.  **Combine & Complete**:
    - If the user provided ingredients, merge them with the ingredients you extracted from the image. Remove any duplicates.
    - If the ingredients list is not visible in the image and the user didn't provide any, make an educated guess of the typical ingredients for the identified product.
    - If the user provided some ingredients but the list in the image seems more complete, use the list from the image and mention that you've supplemented the user's input.
4.  **Format Output**: Return the product name, a complete array of ingredients, and any notes about your process (e.g., "The image was blurry, but I was able to identify most ingredients," or "I guessed the ingredients based on it being a loaf of white bread.").

Image to analyze:
{{media url=photoDataUri}}

User-provided ingredients:
{{{userProvidedIngredients}}}
`,
});

const extractIngredientsFromImageFlow = ai.defineFlow(
  {
    name: 'extractIngredientsFromImageFlow',
    inputSchema: ExtractIngredientsInputSchema,
    outputSchema: ExtractIngredientsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
