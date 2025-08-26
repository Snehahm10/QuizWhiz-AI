'use server';

/**
 * @fileOverview An AI agent for generating multiple-choice questions (MCQs).
 *
 * - generateMcq - A function that generates MCQs for a given topic and subject.
 * - GenerateMcqInput - The input type for the generateMcq function.
 * - GenerateMcqOutput - The return type for the generateMcq function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMcqInputSchema = z.object({
  topic: z.string().optional().describe('The topic for which to generate MCQs. If "random", generate a random question for the subject.'),
  subject: z.string().describe('The subject area of the MCQs.'),
  language: z.enum(['english', 'hindi', 'kannada']).default('english').describe('The language for the MCQ question and answers'),
  difficulty: z.enum(['easy', 'medium', 'difficult']).default('medium').describe('The difficulty level of the MCQs.'),
  previousQuestions: z.array(z.string()).optional().describe('A list of questions that have already been asked in this session to avoid repetition.'),
});
export type GenerateMcqInput = z.infer<typeof GenerateMcqInputSchema>;

const GenerateMcqOutputSchema = z.object({
  question: z.string().describe('The generated MCQ question.'),
  options: z.array(z.string()).describe('The four answer options for the MCQ.'),
  correctAnswerIndex: z.number().min(0).max(3).describe('The index of the correct answer in the options array.'),
  explanation: z.string().optional().describe('Explanation of the correct answer. Required when the user gets the answer wrong.'),
});
export type GenerateMcqOutput = z.infer<typeof GenerateMcqOutputSchema>;

export async function generateMcq(input: GenerateMcqInput): Promise<GenerateMcqOutput> {
  return generateMcqFlow(input);
}

const generateMcqPrompt = ai.definePrompt({
  name: 'generateMcqPrompt',
  input: {schema: GenerateMcqInputSchema},
  output: {schema: GenerateMcqOutputSchema},
  prompt: `You are an expert in generating MCQs for various subjects and topics.

  Generate an MCQ for the following:
  Subject: {{{subject}}}
  {{#if topic}}Topic: {{{topic}}}{{/if}}
  Language: {{{language}}}
  Difficulty: {{{difficulty}}}

  If the topic is "random" or not provided, please generate a random but relevant question from the specified subject.
  The MCQ should have four options, and you should indicate the index of the correct answer.
  Provide a short explanation for the correct answer in the end. Make sure the difficulty level is appropriate for the question.
  
  {{#if previousQuestions}}
  IMPORTANT: Do not repeat any of the following questions that have already been asked in this quiz session:
  {{#each previousQuestions}}
  - "{{{this}}}"
  {{/each}}
  {{/if}}

  The response must be in JSON format, matching the schema. Example:
  {
    "question": "What is the capital of France?",
    "options": ["Berlin", "Paris", "Madrid", "Rome"],
    "correctAnswerIndex": 1,
    "explanation": "Paris is the capital and most populous city of France."
  }
  `,
});

const generateMcqFlow = ai.defineFlow(
  {
    name: 'generateMcqFlow',
    inputSchema: GenerateMcqInputSchema,
    outputSchema: GenerateMcqOutputSchema,
  },
  async input => {
    const {output} = await generateMcqPrompt(input);
    return output!;
  }
);
