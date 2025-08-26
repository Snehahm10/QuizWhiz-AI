'use server';

import { generateMcq, type GenerateMcqInput, type GenerateMcqOutput } from '@/ai/flows/generate-mcq';

export type Mcq = GenerateMcqOutput;

export async function generateMcqAction(input: Omit<GenerateMcqInput, 'topic'>): Promise<Mcq> {
  try {
    const mcq = await generateMcq({ topic: 'random', ...input });
    if (!mcq.question || mcq.options.length !== 4) {
      throw new Error('AI failed to generate a valid MCQ.');
    }
    return mcq;
  } catch (error) {
    console.error('Error generating MCQ:', error);
    throw new Error('Failed to generate a new question. Please try again.');
  }
}
