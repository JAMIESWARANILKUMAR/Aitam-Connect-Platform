
'use server';
/**
 * @fileOverview AI flow to synthesize multiple answers into a single, high-quality response.
 *
 * - synthesizeAnswers - Consolidates answers, corrects grammar, and maintains factual accuracy.
 * - SynthesizeAnswersInput - The input type for the flow.
 * - SynthesizeAnswersOutput - The return type for the flow.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';
import { marked } from 'marked';


const SynthesizeAnswersInputSchema = z.object({
  questionTitle: z.string().describe('The title of the question being answered.'),
  questionDescription: z.string().describe('The detailed description of the question.'),
  answers: z.array(z.string()).describe('An array of raw answers submitted by the community.'),
});
export type SynthesizeAnswersInput = z.infer<typeof SynthesizeAnswersInputSchema>;

const SynthesizeAnswersOutputSchema = z.object({
  consolidatedAnswer: z.string().describe('A single, comprehensive, and grammatically correct answer synthesized from the provided responses, formatted in Markdown.'),
});
export type SynthesizeAnswersOutput = z.infer<typeof SynthesizeAnswersOutputSchema>;

export async function synthesizeAnswers(input: SynthesizeAnswersInput): Promise<SynthesizeAnswersOutput> {
  return synthesizeAnswersFlow(input);
}

const synthesizeAnswersPrompt = ai.definePrompt({
  name: 'synthesizeAnswersPrompt',
  model: googleAI('gemini-pro'),
  input: {schema: SynthesizeAnswersInputSchema},
  output: {schema: SynthesizeAnswersOutputSchema},
  system: `You are an expert academic synthesis engine for a college community. Your task is to consolidate the provided answers into a single, comprehensive, highly readable response. You MUST correct grammar and spelling errors. CRITICALLY, you MUST NOT change the core factual or technical meaning of the consensus points. Structure the final output clearly using Markdown.`,
  prompt: `
**Question Title:** {{{questionTitle}}}
**Question Description:** {{{questionDescription}}}

**Community Answers to Synthesize:**
{{#each answers}}
- {{{this}}}
{{/each}}
`,
});

const synthesizeAnswersFlow = ai.defineFlow(
  {
    name: 'synthesizeAnswersFlow',
    inputSchema: SynthesizeAnswersInputSchema,
    outputSchema: SynthesizeAnswersOutputSchema,
  },
  async input => {
    const {output} = await synthesizeAnswersPrompt(input);
    const htmlOutput = marked.parse(output!.consolidatedAnswer);
    return {
      consolidatedAnswer: htmlOutput
    };
  }
);

    