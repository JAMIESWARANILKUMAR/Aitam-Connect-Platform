
'use server';
/**
 * @fileOverview A flow that generates presentation slides for a given topic.
 *
 * - generateSlides - A function that generates presentation slides.
 * - GenerateSlidesInput - The input type for the generateSlides function.
 * - GenerateSlidesOutput - The return type for the generateSlides function.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

// Dedicated AI instance for the PPT maker using its own API key.
const pptMakerAi = genkit({
  plugins: [googleAI({ apiKey: process.env.PPT_MAKER_API_KEY || process.env.GEMINI_API_KEY })],
});


const GenerateSlidesInputSchema = z.object({
  topic: z.string().describe('The topic for the presentation.'),
});
export type GenerateSlidesInput = z.infer<typeof GenerateSlidesInputSchema>;

const SlideSchema = z.object({
    title: z.string().describe('The title of the slide.'),
    content: z.array(z.string()).describe('An array of bullet points for the slide content.'),
});

const GenerateSlidesOutputSchema = z.object({
  slides: z.array(SlideSchema).describe('An array of generated presentation slides.'),
});
export type GenerateSlidesOutput = z.infer<typeof GenerateSlidesOutputSchema>;

export async function generateSlides(input: GenerateSlidesInput): Promise<GenerateSlidesOutput> {
  return generateSlidesFlow(input);
}

const geminiPro = googleAI('gemini-pro');

const generateSlidesPrompt = pptMakerAi.definePrompt({
  name: 'generateSlidesPrompt',
  model: geminiPro,
  input: {schema: GenerateSlidesInputSchema},
  output: {schema: GenerateSlidesOutputSchema},
  prompt: `You are an AI assistant that creates presentations. Generate a 5-slide presentation on the given topic. For each slide, provide a title and a few bullet points.

Topic: {{{topic}}}
`,
});

const generateSlidesFlow = pptMakerAi.defineFlow(
  {
    name: 'generateSlidesFlow',
    inputSchema: GenerateSlidesInputSchema,
    outputSchema: GenerateSlidesOutputSchema,
  },
  async input => {
    const {output} = await generateSlidesPrompt(input);
    return output!;
  }
);
