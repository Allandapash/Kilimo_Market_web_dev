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
  prompt: `You are an expert agricultural market analyst with access to real-time global market data. Your task is to analyze the current market trends for a specific crop and suggest the optimal time for a farmer in Kenya to list it on the MavunoLink Africa platform to maximize their profit.

Consider the following factors in your analysis:
-   **Global Supply and Demand:** Major harvests, shortages, or gluts in key producing countries.
-   **Geopolitical Events:** Trade policies, tariffs, or conflicts affecting agricultural trade.
-   **Seasonal Trends:** Typical seasonal price fluctuations for the given crop.
-   **Kenyan Market Context:** Local demand, import/export dynamics, and typical harvest seasons within Kenya.
-   **Future Outlook:** Project potential price movements over the next 1-3 months.

**Crop to Analyze:** {{{crop}}}

Based on a comprehensive analysis of the current world markets, what is the optimal time for a Kenyan farmer to list this crop? Provide your reasoning, citing the key factors that influenced your decision.`,
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
