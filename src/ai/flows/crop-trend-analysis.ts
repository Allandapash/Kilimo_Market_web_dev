'use server';

/**
 * @fileOverview AI flow for analyzing crop market trends to suggest optimal listing times.
 *
 * - analyzeCropTrend - Analyzes market trends for a given crop.
 * - CropTrendInput - The input type for the analyzeCropTrend function.
 * - CropTrendOutput - The return type for the analyzeCropTrend function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropTrendInputSchema = z.object({
  crop: z.string().describe('The name of the crop to analyze.'),
  marketData: z.string().describe('Market data for the crop, including historical prices and demand.'),
});
export type CropTrendInput = z.infer<typeof CropTrendInputSchema>;

const CropTrendOutputSchema = z.object({
  optimalListingTime: z.string().describe('The optimal time to list the crop to maximize profit, based on the analysis.'),
  reasoning: z.string().describe('The reasoning behind the optimal listing time suggestion.'),
});
export type CropTrendOutput = z.infer<typeof CropTrendOutputSchema>;

export async function analyzeCropTrend(input: CropTrendInput): Promise<CropTrendOutput> {
  return analyzeCropTrendFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropTrendAnalysisPrompt',
  input: {schema: CropTrendInputSchema},
  output: {schema: CropTrendOutputSchema},
  prompt: `You are an expert agricultural market analyst. Analyze the provided market data for the specified crop and determine the optimal time to list the crop to maximize profit.

Crop: {{{crop}}}
Market Data: {{{marketData}}}

Based on this information, what is the optimal time to list the crop, and what is your reasoning? Provide a detailed explanation.
\nOptimal Listing Time: {{optimalListingTime}}
Reasoning: {{reasoning}}`,
});

const analyzeCropTrendFlow = ai.defineFlow(
  {
    name: 'analyzeCropTrendFlow',
    inputSchema: CropTrendInputSchema,
    outputSchema: CropTrendOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
