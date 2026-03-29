import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit instance configuration.
 * Note: We don't need a separate nextjs() plugin in 1.x for nextHandler to work,
 * but ensuring the instance is correctly configured for the environment.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
