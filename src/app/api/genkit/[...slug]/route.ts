import { ai } from '@/ai/genkit';

/**
 * Genkit 1.x Next.js API route integration.
 * We use the nextHandler() method from the Genkit instance.
 * This pattern is the most stable for Next.js App Router.
 */
export const { GET, POST } = ai.nextHandler();
