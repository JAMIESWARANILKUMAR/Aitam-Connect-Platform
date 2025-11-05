
'use server';
/**
 * @fileOverview An AI flow to analyze resumes for ATS compatibility and provide improvement suggestions.
 *
 * - analyzeResume - Analyzes resume text and provides a score and feedback.
 * - ResumeCheckerInput - The input type for the flow.
 * - ResumeAnalysisOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';

const ResumeCheckerInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the resume to be analyzed.'),
});
export type ResumeCheckerInput = z.infer<typeof ResumeCheckerInputSchema>;

const ResumeAnalysisOutputSchema = z.object({
  overallScore: z
    .number()
    .describe('A score from 0-100 representing ATS compatibility and overall quality.'),
  overallFeedback: z
    .string()
    .describe('A brief, high-level summary of the resume\'s strengths and weaknesses.'),
  suggestions: z
    .array(z.string())
    .describe('A list of specific, actionable suggestions for improvement.'),
});
export type ResumeAnalysisOutput = z.infer<typeof ResumeAnalysisOutputSchema>;

export async function analyzeResume(input: ResumeCheckerInput): Promise<ResumeAnalysisOutput> {
  return resumeCheckerFlow(input);
}

const resumeAnalysisPrompt = ai.definePrompt({
  name: 'resumeAnalysisPrompt',
  model: googleAI('gemini-1.5-flash-latest'),
  input: { schema: ResumeCheckerInputSchema },
  output: { schema: ResumeAnalysisOutputSchema },
  prompt: `You are an expert career coach and resume reviewer with deep knowledge of how Applicant Tracking Systems (ATS) parse resumes.

Analyze the following resume text. Your goal is to provide a detailed, constructive critique.

1.  **Scoring:** Provide an "overallScore" from 0 to 100. This score should reflect ATS compatibility, clarity, impact, and overall effectiveness.
2.  **Feedback:** Give "overallFeedback" that summarizes the key strengths and areas for improvement.
3.  **Suggestions:** Provide a list of specific, actionable "suggestions" to improve the resume. Focus on formatting, keywords, action verbs, and quantifiable achievements.

Resume Text:
{{{resumeText}}}
`,
});

const resumeCheckerFlow = ai.defineFlow(
  {
    name: 'resumeCheckerFlow',
    inputSchema: ResumeCheckerInputSchema,
    outputSchema: ResumeAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await resumeAnalysisPrompt(input);
    return output!;
  }
);

    