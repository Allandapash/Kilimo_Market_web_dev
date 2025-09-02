import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline text-primary">About AgriLink</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Connecting local farmers directly with buyers to foster a fresher, more sustainable food system.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="text-primary" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90">
          <p>
            At AgriLink, our mission is to bridge the gap between the hardworking farmers who cultivate our food and the buyers who seek fresh, high-quality produce. We believe in the power of direct connections to create a more transparent, efficient, and sustainable agricultural marketplace.
          </p>
          <p>
            By removing unnecessary intermediaries, we empower farmers to get fair prices for their products and help buyers access the freshest goods directly from the source. Our platform is designed to be intuitive, powerful, and supportive of local economies.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="text-primary" />
            Our Vision
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90">
          <p>
            We envision a world where every farmer has the tools to thrive in a digital marketplace and every buyer has access to the story behind their food. We are committed to leveraging technology, like our AI-powered trend analysis, to provide valuable insights and create a more intelligent food supply chain.
          </p>
          <p>
            Join us in building a community that values freshness, quality, and direct relationships.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
