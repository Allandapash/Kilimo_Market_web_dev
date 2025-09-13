
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, DollarSign, Tractor, TrendingUp, Banknote } from 'lucide-react';
import Link from 'next/link';

export default function FarmerDashboard() {
    // In a real app, this would be fetched from the user's data
    const userLoanLimit = 10000; 

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold font-headline text-primary">Farmer Dashboard</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Manage your farm, sell your produce, and get market insights.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <DollarSign className="text-primary" /> Sell Produce / Breeds
                        </CardTitle>
                        <CardDescription>
                            List your crops, livestock, or animal breeds for sale in the marketplace.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                       <Button asChild className="w-full">
                           <Link href="/sell">
                                Create a Listing <ArrowRight className="ml-2" />
                           </Link>
                       </Button>
                    </CardContent>
                </Card>
                 <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Tractor className="text-primary" /> Purchase Seeds / Seedlings
                        </CardTitle>
                         <CardDescription>
                            Browse and buy certified seeds and healthy seedlings from trusted suppliers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                       <Button asChild className="w-full" variant="secondary">
                           <Link href="/marketplace">
                                Browse Supplies <ArrowRight className="ml-2" />
                           </Link>
                       </Button>
                    </CardContent>
                </Card>
                 <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <TrendingUp className="text-primary" /> Analyze Market Trends
                        </CardTitle>
                        <CardDescription>
                            Use our AI tools to analyze market data and decide the best time to sell.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                       <Button asChild className="w-full">
                           <Link href="/trends">
                                View Trends <ArrowRight className="ml-2" />
                           </Link>
                       </Button>
                    </CardContent>
                </Card>
                <Card className="flex flex-col lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Banknote className="text-primary" /> Apply for a Loan
                        </CardTitle>
                        <CardDescription>
                            Your loan limit is <span className="font-bold text-primary">KES {userLoanLimit.toLocaleString()}</span>. Access funds to grow your farming business.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                       <Button asChild className="w-full">
                           <Link href="/loans">
                                Apply Now <ArrowRight className="ml-2" />
                           </Link>
                       </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
