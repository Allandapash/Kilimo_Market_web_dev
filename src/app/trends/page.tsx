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

const crops = ['Carrots', 'Apples', 'Tomatoes', 'Wheat', 'Corn', 'Strawberries'];

const trendFormSchema = z.object({
  crop: z.string().min(1, { message: "Please select a crop." }),
});

type TrendFormValues = z.infer<typeof trendFormSchema>;

export default function TrendsPage() {
  const [analysis, setAnalysis] = useState<CropTrendOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TrendFormValues>({
    resolver: zodResolver(trendFormSchema),
  });

  async function onSubmit(data: TrendFormValues) {
    setIsLoading(true);
    setAnalysis(null);
    setError(null);
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

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">AI Crop Trend Analysis</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            Leverage AI to analyze market trends and discover the optimal time to list your crops for maximum profit.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Get Analysis</CardTitle>
            <CardDescription>Select a crop to analyze its market trends.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
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
                <Button type="submit" disabled={isLoading} className="w-full">
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
                    <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                    Analysis Results
                </CardTitle>
                <CardDescription>Insights from our AI market analyst will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
            {isLoading && (
              <div className="text-center text-muted-foreground">
                <Loader2 className="mx-auto h-8 w-8 animate-spin mb-2" />
                <p>Thinking...</p>
              </div>
            )}
            {!isLoading && !analysis && !error && (
                 <div className="text-center text-muted-foreground p-4">
                    <TrendingUp className="mx-auto h-12 w-12 mb-2" />
                    <p>Your crop trend analysis is waiting.</p>
                </div>
            )}
            {error && (
                <div className="text-center text-destructive p-4">
                    <p>{error}</p>
                </div>
            )}
            {analysis && (
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold font-headline text-lg text-primary">Optimal Listing Time</h3>
                  <p>{analysis.optimalListingTime}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold font-headline text-lg">Reasoning</h3>
                  <p className="text-muted-foreground leading-relaxed">{analysis.reasoning}</p>
                </div>
              </div>
            )}
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">Powered by GenAI</p>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
