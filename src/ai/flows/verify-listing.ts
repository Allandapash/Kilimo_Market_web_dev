'use server';

/**
 * @fileOverview An AI flow for verifying new produce listings.
 *
 * - verifyListing - Analyzes a new listing for correctness.
 * - VerifyListingInput - The input type for the verifyListing function.
 * - VerifyListingOutput - The return type for the verifyListing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyListingInputSchema = z.object({
  name: z.string().describe('The name of the produce.'),
  price: z.number().describe('The price per unit.'),
  unit: z.string().describe('The unit of measurement (e.g., kg, lbs).'),
  region: z.string().describe('The region in Kenya where the produce is being sold.'),
  image: z.string().describe("A data URI of the produce image. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type VerifyListingInput = z.infer<typeof VerifyListingInputSchema>;

const VerifyListingOutputSchema = z.object({
    isImageValid: z.boolean().describe('Whether the image appears to be of the specified produce.'),
    imageReasoning: z.string().describe('A brief explanation of why the image is valid or not.'),
    isPriceReasonable: z.boolean().describe('Whether the price is reasonable for the produce in the specified region.'),
    priceReasoning: z.string().describe('A brief explanation of why the price is reasonable or not, considering regional market values.'),
    suggestedPrice: z.string().optional().describe('A suggested price range in Kenyan Shillings if the provided price is unreasonable.'),
});
export type VerifyListingOutput = z.infer<typeof VerifyListingOutputSchema>;


export async function verifyListing(input: VerifyListingInput): Promise<VerifyListingOutput> {
  return verifyListingFlow(input);
}

const prompt = ai.definePrompt({
    name: 'verifyListingPrompt',
    input: {schema: VerifyListingInputSchema},
    output: {schema: VerifyListingOutputSchema},
    prompt: `You are an expert agricultural marketplace moderator for Kenya. Your task is to verify a new produce listing based on the provided image, price, and region. You have access to current market data for various crops across different regions in Kenya.

    Produce Name: {{{name}}}
    Region: {{{region}}}
    Price: Ksh {{{price}}} per {{{unit}}}
    Image: {{media url=image}}

    1.  **Image Verification:** Analyze the image. Does it clearly show the specified produce, "{{{name}}}"?
    2.  **Price Verification:** Analyze the price. Based on current market values in the "{{{region}}}" region of Kenya, is Ksh {{{price}}} per {{{unit}}} a reasonable price for "{{{name}}}"? For example, prices in Nairobi might be higher than in rural areas like Eldoret.

    Provide your verification results in the requested format. Be concise in your reasoning. If the price is unreasonable, provide a suggested price range in Kenyan Shillings (e.g., "Ksh 150 - Ksh 180").`,
});

const verifyListingFlow = ai.defineFlow(
  {
    name: 'verifyListingFlow',
    inputSchema: VerifyListingInputSchema,
    outputSchema: VerifyListingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
