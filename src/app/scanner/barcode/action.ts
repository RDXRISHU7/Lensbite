'use server';

import { getProductFromBarcode } from '@/ai/flows/get-product-from-barcode';
import { foodScannerRiskAssessment, type FoodScannerOutput } from '@/ai/flows/food-scanner-risk-assessment';
import { getPersonalizedTip } from '@/ai/flows/get-personalized-tip';
import { z } from 'zod';

const BarcodeSchema = z.string().min(1, 'Please provide a barcode.');
const HealthReportSchema = z.string().optional();

export type FormState = {
  type: 'initial' | 'success' | 'error';
  productName?: string;
  ingredients?: string[];
  analysis?: FoodScannerOutput;
  tip?: string;
  errorMessage?: string;
};

export async function analyzeBarcodeAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const barcodeValue = formData.get('barcode');
  const healthReportValue = formData.get('healthReport');

  if (barcodeValue === 'reset') {
    return { type: 'initial' };
  }

  const validatedBarcode = BarcodeSchema.safeParse(barcodeValue);
  const validatedHealthReport = HealthReportSchema.safeParse(healthReportValue);

  if (!validatedBarcode.success) {
    return {
      type: 'error',
      errorMessage: 'Invalid barcode data submitted.',
    };
  }
  
  try {
    // Step 1: Get product info from barcode
    const productInfo = await getProductFromBarcode(validatedBarcode.data);

    if (!productInfo || !productInfo.ingredients || productInfo.ingredients.length === 0) {
       return {
         type: 'error',
         errorMessage: 'Could not find product information for this barcode. It might not be in our database.',
       };
    }

    // Step 2: Analyze ingredients for risks
    const analysisResult = await foodScannerRiskAssessment({
      ingredients: productInfo.ingredients,
    });
    
    // Step 3: Get personalized tip
    const personalizedTip = await getPersonalizedTip({
      healthReport: validatedHealthReport.success ? validatedHealthReport.data : undefined,
      foodAnalysis: analysisResult,
    })

    return {
      type: 'success',
      productName: productInfo.productName,
      ingredients: productInfo.ingredients,
      analysis: analysisResult,
      tip: personalizedTip,
    };
  } catch (e: any) {
    console.error(e);
    return {
      type: 'error',
      errorMessage: e.message || 'An unknown error occurred during analysis.',
    };
  }
}
