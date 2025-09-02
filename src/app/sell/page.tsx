"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
// import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Calendar as CalendarIcon, MapPin, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const sellFormSchema = z.object({
  name: z.string().min(3, { message: "Produce name must be at least 3 characters." }),
  category: z.enum(['Vegetable', 'Fruit', 'Grain', 'Other']),
  quantity: z.coerce.number().positive(),
  unit: z.enum(['kg', 'lbs', 'item', 'bunch']),
  price: z.coerce.number().positive(),
  availability: z.date(),
  description: z.string().max(500).optional(),
  farmName: z.string().min(2, { message: "Farm name is required."}),
  // location: z.object({
  //   lat: z.number(),
  //   lng: z.number(),
  // }).refine(val => val.lat !== 0 && val.lng !== 0, {
  //   message: "Please select a location on the map.",
  // }),
});

type SellFormValues = z.infer<typeof sellFormSchema>;

export default function SellPage() {
  const { toast } = useToast();
  // const [mapCenter, setMapCenter] = useState({ lat: 34.0522, lng: -118.2437 });
  const form = useForm<SellFormValues>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      name: '',
      category: 'Vegetable',
      quantity: 0,
      unit: 'kg',
      price: 0,
      availability: new Date(),
      description: '',
      farmName: '',
      // location: { lat: 0, lng: 0 },
    },
  });

  // const selectedLocation = form.watch('location');

  function onSubmit(data: SellFormValues) {
    console.log(data);
    toast({
      title: 'Listing Submitted!',
      description: `Your listing for ${data.name} has been created.`,
      variant: 'default',
    });
    form.reset();
  }

  // if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
  //   return (
  //       <div className="container mx-auto px-4 py-8">
  //           <Card className="max-w-4xl mx-auto flex items-center justify-center p-8">
  //               <div className="text-center">
  //                   <p className="text-destructive font-semibold">This feature is not available.</p>
  //                   <p className="text-muted-foreground">Google Maps API key is missing.</p>
  //               </div>
  //           </Card>
  //       </div>
  //   )
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Create a New Listing</CardTitle>
          <CardDescription>Fill out the details below to list your produce on the marketplace.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produce Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Organic Carrots" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="category" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Vegetable">Vegetable</SelectItem>
                        <SelectItem value="Fruit">Fruit</SelectItem>
                        <SelectItem value="Grain">Grain</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                  <FormField name="quantity" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl><Input type="number" placeholder="100" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="unit" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="lbs">lbs</SelectItem>
                          <SelectItem value="item">item</SelectItem>
                          <SelectItem value="bunch">bunch</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField name="price" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (per unit)</FormLabel>
                    <FormControl><Input type="number" step="0.01" placeholder="2.50" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField name="availability" control={form.control} render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Availability Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="farmName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farm Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Sunrise Farms" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />


                <FormField name="description" control={form.control} render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="Tell buyers about your produce..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="md:col-span-2 space-y-2">
                    <FormLabel>Farm Location</FormLabel>
                    <Card className="flex items-center justify-center p-8 border-dashed">
                       <div className="text-center">
                          <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Map functionality is temporarily disabled.</p>
                       </div>
                    </Card>
                </div>
              </div>
              <Button type="submit" size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Create Listing
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
