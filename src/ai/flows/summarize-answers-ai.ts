
'use server';
/**
 * @fileOverview A flow that summarizes answers to a question using AI, focusing on grammar improvements and common, informative responses.
 *
 * - summarizeAnswers - A function that summarizes answers using AI.
 * - SummarizeAnswersInput - The input type for the summarizeAnswers function.
 * - SummarizeAnswersOutput - The return type for the summarizeAnswers function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const SummarizeAnswersInputSchema = z.object({
  answers: z.array(z.string()).describe('An array of answers to summarize.'),
});
export type SummarizeAnswersInput = z.infer<typeof SummarizeAnswersInputSchema>;

const SummarizeAnswersOutputSchema = z.object({
  summary: z.string().describe('A summarized version of the answers, focusing on grammar and common themes.'),
});
export type SummarizeAnswersOutput = z.infer<typeof SummarizeAnswersOutputSchema>;

export async function summarizeAnswers(input: SummarizeAnswersInput): Promise<SummarizeAnswersOutput> {
  return summarizeAnswersFlow(input);
}

const summarizeAnswersPrompt = ai.definePrompt({
  name: 'summarizeAnswersPrompt',
  model: googleAI('gemini-pro'),
  input: {schema: SummarizeAnswersInputSchema},
  output: {schema: SummarizeAnswersOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing answers to a question. Analyze the following answers and provide a single, comprehensive summary that incorporates the key information from the most common and informative responses. Correct any grammatical errors and ensure the summary is clear and concise.

Answers:
{{#each answers}}- {{{this}}}
{{/each}}

Summary: `,
});

const summarizeAnswersFlow = ai.defineFlow(
  {
    name: 'summarizeAnswersFlow',
    inputSchema: SummarizeAnswersInputSchema,
    outputSchema: SummarizeAnswersOutputSchema,
  },
  async input => {
    const {output} = await summarizeAnswersPrompt(input);
    return output!;
  }
);
