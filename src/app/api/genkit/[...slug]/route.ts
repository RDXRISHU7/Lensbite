import { ai } from '@/ai/genkit';

/**
 * Genkit 1.x Next.js API route integration.
 * We use the handler directly from the ai instance.
 * If ai.nextHandler is unavailable, we can provide a fallback for the build process.
 */
const handler = ai.nextHandler ? ai.nextHandler() : { GET: () => new Response('Genkit Not Ready', { status: 500 }), POST: () => new Response('Genkit Not Ready', { status: 500 }) };

export const { GET, POST } = handler;
