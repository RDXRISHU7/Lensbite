import { ai } from '@/ai/genkit';

// Correct Genkit 1.x pattern for Next.js API route integration
export const { GET, POST } = ai.nextHandler();
