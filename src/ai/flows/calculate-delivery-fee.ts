
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
  subtotal: z.number().describe('The subtotal of the order before any fees, in Kenyan Shillings (Ksh).'),
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
    prompt: `You are a logistics coordinator for Kilimo_Market Africa, a Kenyan agricultural marketplace. Your task is to calculate a delivery fee for an order based on the provided details.

    **IMPORTANT RULE:** The final delivery fee CANNOT be more than the order subtotal. If your calculated fee is higher than the subtotal, you must cap the delivery fee at the subtotal amount and mention in your reasoning that the fee was capped.

    You must follow a strict calculation model to ensure consistency. Use the following parameters and rules:
    -   **Base Fee:** Start with a base fee of Ksh 400 for every delivery.
    -   **Weight Charge:** Add Ksh 50 for every kilogram of weight.
    -   **Urgency Premium:**
        -   'Standard' delivery has no extra charge (1.0x multiplier).
        -   'Express' delivery (1-2 days) adds a 50% premium (1.5x multiplier) to the combined base and weight fee.
    -   **Regional Multiplier (Distance & Road Conditions):** Apply a multiplier based on the destination region, assuming a start point of Nairobi.
        -   **Tier 1 (1.0x):** Close and accessible (e.g., Kiambu, Nairobi, Kajiado, Machakos, Murang'a, Nakuru).
        -   **Tier 2 (1.2x):** Mid-range distance (e.g., Nyeri, Kericho, Kisumu, Eldoret, Embu, Meru).
        -   **Tier 3 (1.5x):** Far distance or challenging roads (e.g., Mombasa, Kilifi, Turkana, Mandera, Lamu, Garissa).

    **Calculation Steps:**
    1.  Calculate Weight Cost: totalWeight * 50.
    2.  Calculate Subtotal: Base Fee (400) + Weight Cost.
    3.  Apply Urgency Premium: Result from step 2 * (1.5 for Express, 1.0 for Standard).
    4.  Apply Regional Multiplier: Result from step 3 * Regional Multiplier.
    5.  Check against subtotal: Compare the result from step 4 with the order subtotal. The final deliveryFee is the lower of the two values.
    6.  Round the final result to the nearest whole number.

    **Order Details:**
    -   **Order Subtotal:** Ksh {{{subtotal}}}
    -   **Total Weight:** {{{totalWeight}}} kg
    -   **Urgency:** {{{urgency}}}
    -   **Destination Region:** {{{destinationRegion}}}

    Calculate a final delivery fee in Kenyan Shillings. Provide a brief reasoning for your calculation based on the steps above.
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
