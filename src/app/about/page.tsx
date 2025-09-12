
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Users, Tractor } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline text-primary">About Kilimo_Market African</h1>
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
            <Info className="text-primary" />
            Why Choose Us?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90">
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>Empowering Farmers:</strong> We provide farmers with direct market access, fair pricing, and AI-powered tools to optimize their sales.
                </li>
                <li>
                    <strong>Quality for Buyers:</strong> Buyers get access to the freshest produce directly from the source, with transparent information about its origin.
                </li>
                 <li>
                    <strong>Community Focused:</strong> By supporting local agriculture, you contribute to stronger local economies and a more sustainable food future.
                </li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
