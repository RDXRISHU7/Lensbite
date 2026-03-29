import { ai } from '@/ai/genkit';

/**
 * Genkit 1.x Next.js API route integration.
 * We use the nextHandler() method from the Genkit instance.
 */
const handler = ai.nextHandler();

export const GET = handler.GET;
export const POST = handler.POST;
