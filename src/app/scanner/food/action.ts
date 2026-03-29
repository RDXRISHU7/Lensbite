'use server';

import { extractIngredientsFromImage } from '@/ai/flows/analyze-ingredients-for-carcinogens';
import { foodScannerRiskAssessment, type FoodScannerOutput } from '@/ai/flows/food-scanner-risk-assessment';
import { getPersonalizedTip } from '@/ai/flows/get-personalized-tip';
import { z } from 'zod';

const FoodProductSchema = z.object({
  productName: z.string().optional(),
  ingredients: z.string().optional(),
  healthReport: z.string().optional(),
  capturedImage: z.string().min(1, 'A photo of the product is required.'),
});

// Re-using the same state structure as the barcode scanner for component compatibility
export type FormState = {
  type: 'initial' | 'success' | 'error';
  productName?: string;
  ingredients?: string[];
  analysis?: FoodScannerOutput;
  tip?: string;
  errorMessage?: string;
  aiNotes?: string;
};

export async function analyzeFoodProductAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Handle reset
  if (formData.get('reset')) {
    return { type: 'initial' };
  }

  const rawFormData = {
      productName: formData.get('productName'),
      ingredients: formData.get('ingredients'),
      healthReport: formData.get('healthReport'),
      capturedImage: formData.get('capturedImage'),
  }

  const validatedFields = FoodProductSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      type: 'error',
      errorMessage: validatedFields.error.flatten().fieldErrors.capturedImage?.[0] || 'Invalid data submitted.',
    };
  }
  
  const { productName, ingredients, healthReport, capturedImage } = validatedFields.data;

  try {
    // Step 1: Use AI to extract ingredients from the image
    const extractedData = await extractIngredientsFromImage({
        photoDataUri: capturedImage,
        userProvidedIngredients: ingredients
    });

    const finalProductName = productName || extractedData.productName;
    const finalIngredients = extractedData.ingredients;

    if (finalIngredients.length === 0) {
        return {
            type: 'error',
            errorMessage: "Could not determine the ingredients from the image or your input. Please provide them manually.",
            aiNotes: extractedData.aiNotes,
        }
    }
    
    // Step 2: Analyze ingredients for risks
    const analysisResult = await foodScannerRiskAssessment({
      ingredients: finalIngredients,
    });
    
    // Step 3: Get personalized tip
    const personalizedTip = await getPersonalizedTip({
      healthReport: healthReport,
      foodAnalysis: analysisResult,
    })

    return {
      type: 'success',
      productName: finalProductName,
      ingredients: finalIngredients,
      analysis: analysisResult,
      tip: personalizedTip,
      aiNotes: extractedData.aiNotes,
    };
  } catch (e: any) {
    console.error(e);
    return {
      type: 'error',
      errorMessage: e.message || 'An unknown error occurred during analysis.',
    };
  }
}
