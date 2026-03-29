'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BarcodeInputSchema = z.object({
  barcode: z.string().describe('The barcode value (e.g., a UPC).'),
});

const ProductOutputSchema = z.object({
  productName: z.string(),
  ingredients: z.array(z.string()),
});

type ProductOutput = z.infer<typeof ProductOutputSchema>;

export async function getProductFromBarcode(barcode: string): Promise<ProductOutput> {
    // We now use the Open Food Facts API instead of a mock database.
    return getProductFromBarcodeFlow({ barcode });
}

const getProductFromBarcodeFlow = ai.defineFlow(
  {
    name: 'getProductFromBarcodeFlow',
    inputSchema: BarcodeInputSchema,
    outputSchema: ProductOutputSchema,
  },
  async ({ barcode }) => {
    console.log(`Looking up barcode with Open Food Facts API: ${barcode}`);
    
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch product data. The API might be down.');
    }

    const data = await response.json();

    if (data.status === 0 || !data.product) {
        throw new Error(`Product not found in the Open Food Facts database. It might be a new or rare item.`);
    }

    const product = data.product;
    const productName = product.product_name || 'Unknown Product';
    
    let ingredients: string[] = [];
    if (product.ingredients_text) {
        // The ingredients_text is often a single string. We'll split it by comma,
        // trying to keep parenthetical phrases with their ingredient.
        ingredients = product.ingredients_text
            // Split by comma or period, but not inside parentheses
            .split(/[,.]\s*(?![^()]*\))/) 
            .map((i: string) => i.trim()) // trim whitespace
            .filter((i: string) => i && i.length > 1); // remove any empty strings
    }
    
    if (ingredients.length === 0) {
        throw new Error('No ingredients list found for this product.');
    }

    return {
        productName,
        ingredients,
    };
  }
);
