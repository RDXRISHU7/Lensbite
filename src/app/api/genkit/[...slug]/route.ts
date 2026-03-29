import { ai } from '@/ai/genkit';

/**
 * Genkit 1.x Next.js API route integration.
 * The nextHandler method is part of the Genkit instance in version 1.x.
 */
export const { GET, POST } = ai.nextHandler();
