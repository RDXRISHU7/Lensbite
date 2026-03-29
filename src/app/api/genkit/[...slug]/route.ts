import { ai } from '@/ai/genkit';
import { nextHandler } from '@genkit-ai/next';

/**
 * Genkit 1.x Next.js API route integration.
 * We use the nextHandler() utility from @genkit-ai/next passing the genkit instance.
 */
export const { GET, POST } = nextHandler(ai);
