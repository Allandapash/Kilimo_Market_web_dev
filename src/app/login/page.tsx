"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    console.log(data);
    // In a real app, you'd authenticate the user here.
    // We'll simulate the role based on the email address for demonstration.
    
    const isFarmer = data.email.toLowerCase().includes('farmer');

    toast({
      title: "Logged In Successfully!",
      description: `Welcome back! Redirecting you to your ${isFarmer ? 'farmer dashboard' : 'dashboard'}.`,
    });
    
    // Redirect based on the simulated role.
    if (isFarmer) {
        // Farmers go to the page to list their items.
        router.push('/sell');
    } else {
        // Buyers and other roles go to the main dashboard to see all items.
        router.push('/dashboard');
    }

    form.reset();
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-12">
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold font-headline">Login</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                            <Input type="email" placeholder="farmer@example.com or buyer@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="w-full">
                        <LogIn className="mr-2 h-5 w-5" />
                        Login
                    </Button>
                    </form>
                </Form>
                <div className="mt-6 text-center text-sm">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-primary hover:underline">
                        Register here
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
