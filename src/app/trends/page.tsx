"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Bot, Lightbulb, Loader2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import type { CropTrendOutput } from '@/ai/flows/crop-trend-analysis';
import { analyzeCropTrendAction } from './actions';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

const crops = ['Carrots', 'Apples', 'Tomatoes', 'Wheat', 'Corn', 'Strawberries', 'Potatoes', 'Onions', 'Mangoes'];

const trendFormSchema = z.object({
  crop: z.string().min(1, { message: "Please select a crop." }),
});

type TrendFormValues = z.infer<typeof trendFormSchema>;

export default function TrendsPage() {
  const [analysis, setAnalysis] = useState<CropTrendOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('');

  const form = useForm<TrendFormValues>({
    resolver: zodResolver(trendFormSchema),
  });

  async function onSubmit(data: TrendFormValues) {
    setIsLoading(true);
    setAnalysis(null);
    setError(null);
    setSelectedCrop(data.crop);
    try {
        const result = await analyzeCropTrendAction({ crop: data.crop });
        setAnalysis(result);
    } catch (e) {
        setError("Failed to get analysis. Please try again.");
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  }
  
  const chartConfig = {
      price: {
        label: "Price Index",
      },
      historical: {
        label: "Historical",
        color: "hsl(var(--chart-2))",
      },
      forecasted: {
        label: "Forecast",
        color: "hsl(var(--chart-5))",
      },
    };


  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">AI Crop Trend Analysis</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            Leverage AI to analyze market trends and discover the optimal time to list your crops for maximum profit.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Get Analysis</CardTitle>
          <CardDescription>Select a crop to analyze its market trends.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-end gap-4">
              <FormField
                control={form.control}
                name="crop"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3">
                    <FormLabel>Crop</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a crop to analyze" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Analyze Now
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
          <CardHeader>
              <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                  Analysis Results for {selectedCrop || '...'}
              </CardTitle>
              <CardDescription>Insights from our AI market analyst will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {isLoading && (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <p>Thinking...</p>
              </div>
            )}
            {!isLoading && !analysis && !error && (
                  <div className="flex items-center justify-center h-64 text-center text-muted-foreground p-4">
                    <div>
                        <TrendingUp className="mx-auto h-12 w-12 mb-2" />
                        <p>Your crop trend analysis is waiting.</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="flex items-center justify-center h-64 text-center text-destructive p-4">
                    <p>{error}</p>
                </div>
            )}
            {analysis && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="font-semibold font-headline text-lg mb-4">Price Trend: Last 3 Months & 3-Month Forecast</h3>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <LineChart data={analysis.trendData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid vertical={false} />
                       <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                       <YAxis 
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          label={{ value: 'Price Index', angle: -90, position: 'insideLeft', offset: -10 }}
                        />
                      <Tooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                       <Legend content={<ChartLegendContent />} />
                        <Line
                          dataKey="price"
                          type="monotone"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={2}
                          dot={true}
                          name="Price"
                        />
                    </LineChart>
                  </ChartContainer>
                </div>
                <div className="space-y-4 text-sm md:col-span-1">
                  <div>
                    <h3 className="font-semibold font-headline text-lg text-primary flex items-center gap-2"><Lightbulb />Optimal Listing Time</h3>
                    <p className="mt-1">{analysis.optimalListingTime}</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold font-headline text-lg">AI Analysis</h3>
                    <p className="text-muted-foreground leading-relaxed mt-1">{analysis.analysis}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
              <p className="text-xs text-muted-foreground">Powered by GenAI. Trend data is illustrative.</p>
          </CardFooter>
      </Card>
    </div>
  );
}
