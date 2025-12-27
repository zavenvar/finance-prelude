import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Wallet, Building2, TrendingUp, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import servicesBg from "@/assets/services-bg.jpg";

const iconMap = {
  Wallet,
  Building2,
  TrendingUp,
  Shield,
};

const serviceDetails = [
  {
    title: "Personal Banking",
    icon: "Wallet",
    features: [
      "Checking & Savings Accounts",
      "Personal Loans & Mortgages",
      "Credit & Debit Cards",
      "Online & Mobile Banking",
    ],
  },
  {
    title: "Business Solutions",
    icon: "Building2",
    features: [
      "Business Checking & Savings",
      "Commercial Lending",
      "Merchant Services",
      "Cash Management",
    ],
  },
  {
    title: "Investment Management",
    icon: "TrendingUp",
    features: [
      "Portfolio Management",
      "Retirement Planning",
      "Asset Allocation",
      "Market Analysis",
    ],
  },
  {
    title: "Wealth Advisory",
    icon: "Shield",
    features: [
      "Estate Planning",
      "Tax Optimization",
      "Risk Management",
      "Legacy Planning",
    ],
  },
];

export default function Services() {
  const { content } = useSiteContent();
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${servicesBg})` }}
      >
        <div className="absolute inset-0 bg-primary/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl opacity-90">
              Comprehensive financial solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {serviceDetails.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <Card key={service.title} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {content.services.find(s => s.title === service.title)?.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Interested in Our Services?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch with our team to learn more about how we can help you
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">
              Contact Us <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
