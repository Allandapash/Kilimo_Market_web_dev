
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Leaf, Info, Users, Tractor, Handshake, Send } from 'lucide-react';
import { useAuth, UserRole } from '@/context/auth-context';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";


const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;


export default function Home() {
  const { user, isMounted } = useAuth();
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onContactSubmit(data: ContactFormValues) {
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://picsum.photos/seed/local-market-tech/1920/1080"
          alt="Vibrant outdoor African market with farmers selling fresh produce and a person holding a smartphone."
          fill
          className="object-cover"
          data-ai-hint="african market"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl font-bold font-headline drop-shadow-lg">
            Connecting Farmers and Buyers
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            Kilimo_Market Africa is the premier marketplace for fresh, high-quality produce directly from the source. Discover, buy, and sell with confidence.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/marketplace">Browse Listings</Link>
            </Button>
            {isMounted && user?.role === UserRole.Farmer && (
                <Button asChild size="lg" variant="secondary">
                    <Link href="/sell">Sell Your Produce</Link>
                </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Fresh & Direct</h3>
              <p className="text-muted-foreground mt-2">
                Get produce straight from the farm to your business, ensuring peak freshness and quality.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold">Support Local</h3>
              <p className="text-muted-foreground mt-2">
                Empower local farmers and strengthen your community by purchasing directly from the source.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Leaf className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold">AI-Powered Insights</h3>
              <p className="text-muted-foreground mt-2">
                Utilize our market trends analysis to make informed decisions for buying and selling.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="bg-card py-20 px-4">
        <div className="container mx-auto max-w-4xl">
           <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline text-primary">About Kilimo_Market Africa</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Connecting local farmers directly with buyers to foster a fresher, more sustainable food system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tractor className="text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/90">
                <p>
                  To bridge the gap between the hardworking farmers who cultivate our food and the buyers who seek fresh, high-quality produce. We believe in the power of direct connections to create a transparent and efficient agricultural marketplace.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/90">
                <p>
                  We envision a world where every farmer has the tools to thrive in a digital marketplace. We are committed to leveraging technology to provide valuable insights and create an intelligent and sustainable food supply chain for Africa.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="text-primary" />
                Our Partners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
                <p>We collaborate with leading financial institutions to provide our farmers with access to the capital they need to grow their businesses.</p>
                <ul className="list-disc list-inside space-y-2 font-semibold">
                    <li>Equity Bank AgriLoan</li>
                    <li>Stima SACCO FarmerPlus</li>
                    <li>Wakulima Cooperative Fund</li>
                    <li>World Bank</li>
                    <li>Britam</li>
                </ul>
            </CardContent>
          </Card>
        </div>
      </section>

       {/* Contact Section */}
       <section id="contact" className="bg-background py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
              <CardHeader className="text-center">
                  <CardTitle className="text-4xl font-bold font-headline">Contact Us</CardTitle>
                  <CardDescription>Have a question or feedback? Fill out the form below.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-6">
                      <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                              <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                              <Input placeholder="john.doe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                              <Input placeholder="Question about a listing" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                              <Textarea
                                  placeholder="Your message here..."
                                  className="min-h-[120px]"
                                  {...field}
                              />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <Button type="submit" size="lg" className="w-full">
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                      </Button>
                      </form>
                  </Form>
              </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

    