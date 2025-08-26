'use server';

/**
 * @fileOverview AI-powered explanation generator for quiz answers.
 *
 * - explainAnswer - A function that generates explanations for quiz answers, especially incorrect ones.
 * - ExplainAnswerInput - The input type for the explainAnswer function.
 * - ExplainAnswerOutput - The return type for the explainAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAnswerInputSchema = z.object({
  question: z.string().describe('The quiz question.'),
  answer: z.string().describe('The answer given by the user.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  isCorrect: z.boolean().describe('Whether the user answered correctly.'),
});
export type ExplainAnswerInput = z.infer<typeof ExplainAnswerInputSchema>;

const ExplainAnswerOutputSchema = z.object({
  explanation: z.string().describe('The explanation for the answer.'),
});
export type ExplainAnswerOutput = z.infer<typeof ExplainAnswerOutputSchema>;

export async function explainAnswer(input: ExplainAnswerInput): Promise<ExplainAnswerOutput> {
  return explainAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainAnswerPrompt',
  input: {schema: ExplainAnswerInputSchema},
  output: {schema: ExplainAnswerOutputSchema},
  prompt: `You are a helpful AI tutor. A student answered the following question:

Question: {{{question}}}

Student's Answer: {{{answer}}}
Correct Answer: {{{correctAnswer}}}

Is Correct: {{{isCorrect}}}

Provide a clear and concise explanation of the answer, especially focusing on why the student's answer was incorrect if applicable. Focus on teaching the underlying concepts.`,
});

const explainAnswerFlow = ai.defineFlow(
  {
    name: 'explainAnswerFlow',
    inputSchema: ExplainAnswerInputSchema,
    outputSchema: ExplainAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
