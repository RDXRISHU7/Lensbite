import { ai } from '@/ai/genkit';

/**
 * Genkit 1.x Next.js API route integration.
 * We use the nextHandler method directly from the ai instance.
 * We use a robust export pattern to ensure the build process succeeds.
 */
const handler = ai.nextHandler ? ai.nextHandler() : {
  GET: () => new Response('Genkit Not Ready', { status: 500 }),
  POST: () => new Response('Genkit Not Ready', { status: 500 })
};

export const GET = handler.GET;
export const POST = handler.POST;
