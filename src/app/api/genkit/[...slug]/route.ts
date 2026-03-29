import { ai } from '@/ai/genkit';

/**
 * Genkit 1.x Next.js API route integration.
 * The nextHandler method is provided by the ai instance.
 */
export const { GET, POST } = ai.nextHandler();
