'use server';

/**
 * @fileOverview An AI flow for calculating produce delivery fees in Kenya.
 *
 * - calculateDeliveryFee - Calculates the fee based on weight, urgency, and region.
 * - DeliveryFeeInput - The input type for the calculateDeliveryFee function.
 * - DeliveryFeeOutput - The return type for the calculateDeliveryFee function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeliveryFeeInputSchema = z.object({
  totalWeight: z.number().describe('The total weight of the order in kilograms (kg).'),
  urgency: z.enum(['Standard', 'Express']).describe("The desired delivery speed. 'Standard' is 3-5 days, 'Express' is 1-2 days."),
  destinationRegion: z.string().describe('The destination county/region in Kenya where the order will be delivered.'),
});
export type DeliveryFeeInput = z.infer<typeof DeliveryFeeInputSchema>;

const DeliveryFeeOutputSchema = z.object({
    deliveryFee: z.number().describe('The calculated delivery fee in Kenyan Shillings (Ksh).'),
    reasoning: z.string().describe('A brief explanation of how the fee was calculated, considering the inputs.'),
});
export type DeliveryFeeOutput = z.infer<typeof DeliveryFeeOutputSchema>;


export async function calculateDeliveryFee(input: DeliveryFeeInput): Promise<DeliveryFeeOutput> {
  return calculateDeliveryFeeFlow(input);
}

const prompt = ai.definePrompt({
    name: 'calculateDeliveryFeePrompt',
    input: {schema: DeliveryFeeInputSchema},
    output: {schema: DeliveryFeeOutputSchema},
    prompt: `You are a logistics coordinator for AgriLink, a Kenyan agricultural marketplace. Your task is to calculate a delivery fee for an order based on the provided details.

    You must consider the following factors, using realistic estimates for the Kenyan market:
    1.  **Weight:** Heavier items cost more to transport. Base rate should increase with weight.
    2.  **Urgency:** 'Express' delivery (1-2 days) should cost significantly more than 'Standard' delivery (3-5 days). Add a premium for express service.
    3.  **Distance & Road Conditions:** Use the destination region to estimate distance from a central hub (assume Nairobi) and typical road conditions. Deliveries to remote or counties with poor road infrastructure (e.g., Turkana, Mandera) should have a higher cost than deliveries to closer, more accessible counties (e.g., Kiambu, Nakuru).

    **Order Details:**
    -   **Total Weight:** {{{totalWeight}}} kg
    -   **Urgency:** {{{urgency}}}
    -   **Destination Region:** {{{destinationRegion}}}

    Calculate a final delivery fee in Kenyan Shillings. Provide a brief reasoning for your calculation.
    `,
});

const calculateDeliveryFeeFlow = ai.defineFlow(
  {
    name: 'calculateDeliveryFeeFlow',
    inputSchema: DeliveryFeeInputSchema,
    outputSchema: DeliveryFeeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
