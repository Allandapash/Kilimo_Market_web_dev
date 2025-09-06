"use server";

import { analyzeCropTrend, type CropTrendInput, type CropTrendOutput } from '@/ai/flows/crop-trend-analysis';

export async function analyzeCropTrendAction(input: {crop: string}): Promise<CropTrendOutput> {
    const aiInput: CropTrendInput = {
        crop: input.crop,
    };

    try {
        const result = await analyzeCropTrend(aiInput);
        return result;
    } catch (error) {
        console.error("Error in AI trend analysis:", error);
        throw new Error("Failed to analyze crop trends. Please try again later.");
    }
}
