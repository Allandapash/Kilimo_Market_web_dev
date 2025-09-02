"use server";

import { analyzeCropTrend, type CropTrendInput, type CropTrendOutput } from '@/ai/flows/crop-trend-analysis';

// Dummy market data for demonstration purposes.
// In a real application, this would be fetched from a database or a market data API.
const dummyMarketData: Record<string, string> = {
    'Carrots': "Prices for carrots have been steadily increasing over the past two weeks, up 15%. Demand is expected to peak around major holidays. Current inventory levels across markets are moderate.",
    'Apples': "Apple prices are at their seasonal low post-harvest. A large surplus is reported this year. Demand will likely increase as schools reopen and fall baking season begins in 1-2 months.",
    'Tomatoes': "Heirloom tomato prices are high due to a short peak season. Standard varieties are stable. A recent heatwave in a major growing region might cause a supply shortage in 3-4 weeks.",
    'Wheat': "Global wheat prices have been volatile due to geopolitical events. Domestic prices are currently stable but are projected to rise by 5-10% in the next quarter due to export demand.",
    'Corn': "Corn futures are slightly down due to a promising weather forecast for the upcoming harvest. Ethanol demand is a major factor, which is currently flat.",
    'Strawberries': "The strawberry season is nearing its end, leading to higher prices and lower availability. Demand remains high for fresh berries. The frozen market is well-supplied.",
};


export async function analyzeCropTrendAction(input: {crop: string}): Promise<CropTrendOutput> {
    const marketData = dummyMarketData[input.crop] || "No specific market data available for this crop.";
    
    const aiInput: CropTrendInput = {
        crop: input.crop,
        marketData: marketData,
    };

    try {
        const result = await analyzeCropTrend(aiInput);
        return result;
    } catch (error) {
        console.error("Error in AI trend analysis:", error);
        throw new Error("Failed to analyze crop trends. Please try again later.");
    }
}
