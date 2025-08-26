// src/ai/flows/translate-mcq.ts
'use server';

/**
 * @fileOverview A flow to translate MCQs into different languages.
 *
 * - translateMcq - A function that handles the translation of an MCQ.
 * - TranslateMcqInput - The input type for the translateMcq function.
 * - TranslateMcqOutput - The return type for the translateMcq function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateMcqInputSchema = z.object({
  question: z.string().describe('The MCQ question to translate.'),
  options: z.array(z.string()).describe('The answer options for the MCQ.'),
  language: z.enum(['english', 'hindi', 'kannada']).describe('The target language for translation.'),
});
export type TranslateMcqInput = z.infer<typeof TranslateMcqInputSchema>;

const TranslateMcqOutputSchema = z.object({
  translatedQuestion: z.string().describe('The translated MCQ question.'),
  translatedOptions: z.array(z.string()).describe('The translated answer options.'),
});
export type TranslateMcqOutput = z.infer<typeof TranslateMcqOutputSchema>;

export async function translateMcq(input: TranslateMcqInput): Promise<TranslateMcqOutput> {
  return translateMcqFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateMcqPrompt',
  input: {schema: TranslateMcqInputSchema},
  output: {schema: TranslateMcqOutputSchema},
  prompt: `Translate the following multiple-choice question and its options to {{language}}:

Question: {{{question}}}
Options:
{{#each options}}
- {{{this}}}
{{/each}}

Ensure that the translated question and options retain their original meaning and context.

Output the translated question and options as a JSON object with "translatedQuestion" and "translatedOptions" fields.
`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const translateMcqFlow = ai.defineFlow(
  {
    name: 'translateMcqFlow',
    inputSchema: TranslateMcqInputSchema,
    outputSchema: TranslateMcqOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
