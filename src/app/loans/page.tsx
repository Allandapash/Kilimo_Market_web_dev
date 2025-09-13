
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { loanProviders, type LoanProvider } from '@/lib/loan-data'; // Mock data
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

// In a real app, this would be fetched from the logged-in user's data
const USER_LOAN_LIMIT = 10000;

const loanFormSchema = z.object({
  amount: z.coerce
    .number()
    .positive({ message: "Loan amount must be positive." })
    .max(USER_LOAN_LIMIT, { message: `Amount cannot exceed your loan limit of KES ${USER_LOAN_LIMIT.toLocaleString()}.` }),
  providerId: z.string().min(1, { message: "You must select a loan provider." }),
});

type LoanFormValues = z.infer<typeof loanFormSchema>;

export default function LoanApplicationPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      amount: 0,
      providerId: '',
    },
  });

  // This would be a real Firestore call in a production app.
  async function submitLoanApplication(data: LoanFormValues) {
    if (!user) {
        toast({ variant: "destructive", title: "You must be logged in." });
        return;
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Submitting loan application to Firestore:", {
                ...data,
                farmer_id: user.id,
                status: 'Pending',
                request_date: new Date().toISOString()
            });
            resolve(true);
        }, 1000);
    });
  }

  async function onSubmit(data: LoanFormValues) {
    setIsSubmitting(true);
    try {
        await submitLoanApplication(data);
        toast({
          title: 'Application Submitted!',
          description: 'Your loan application has been sent for review. You will be notified of the decision.',
        });
        router.push('/dashboard');
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'Could not submit your application. Please try again.',
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Apply for a Farmer's Loan</CardTitle>
          <CardDescription>
            Your current loan limit is <span className="font-bold text-primary">KES {USER_LOAN_LIMIT.toLocaleString()}</span>. Choose a provider and enter the amount you wish to borrow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="providerId"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-semibold">Select a Loan Provider</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {loanProviders.map((provider) => (
                          <FormItem key={provider.id}>
                            <FormControl>
                                <Label className="block cursor-pointer rounded-lg border bg-card p-4 has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary">
                                    <RadioGroupItem value={provider.id} className="sr-only" />
                                    <h3 className="font-bold">{provider.name}</h3>
                                    <p className="text-sm text-muted-foreground">Interest: {provider.interest_rate}% p.a.</p>
                                    <p className="text-sm text-muted-foreground">Max Amount: KES {provider.max_amount.toLocaleString()}</p>
                                </Label>
                            </FormControl>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Loan Amount (KES)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 8000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Application'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
