import { ai } from '@/ai/genkit';

/**
 * Genkit 1.x Next.js API route integration.
 * We use the nextHandler method directly from the ai instance.
 * We include a fallback for the build environment to prevent build-time failures.
 */
export const { GET, POST } = ai.nextHandler ? ai.nextHandler() : { 
  GET: () => new Response('Genkit Not Ready', { status: 500 }), 
  POST: () => new Response('Genkit Not Ready', { status: 500 }) 
};
