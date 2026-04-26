import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit instance configuration.
 * We explicitly pass the API key from environment variables to ensure clinical integrity.
 * If the key is missing, Genkit will throw a clear error in the server logs.
 * Ensure you have added GEMINI_API_KEY to your .env file or Environment Variables.
 */
export const ai = genkit({
  plugins: [
    googleAI({ 
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY 
    })
  ],
  model: 'googleai/gemini-2.5-flash',
});
