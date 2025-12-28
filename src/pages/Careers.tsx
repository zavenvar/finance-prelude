import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

export default function Careers() {
  const { content } = useSiteContent();

  const whyJoinBenefits = content.careersPage?.whyJoinSection?.benefits || [
    {
      title: "Professional Growth",
      description: "Continuous learning opportunities and career advancement programs",
    },
    {
      title: "Competitive Benefits",
      description: "Comprehensive health coverage, retirement plans, and performance bonuses",
    },
    {
      title: "Work-Life Balance",
      description: "Flexible schedules, remote work options, and generous paid time off",
    },
  ];

  const openPositions = content.careersPage?.openPositions || [
    {
      title: "Senior Financial Advisor",
      department: "Wealth Management",
      location: "New York, NY",
      type: "Full-time",
      description: "Help clients achieve their financial goals through comprehensive planning and investment strategies.",
    },
    {
      title: "Business Banking Specialist",
      department: "Commercial Banking",
      location: "New York, NY",
      type: "Full-time",
      description: "Build relationships with business clients and provide tailored banking solutions.",
    },
    {
      title: "Risk Analyst",
      department: "Risk Management",
      location: "New York, NY",
      type: "Full-time",
      description: "Analyze and mitigate financial risks across our portfolio of services.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.careersPage?.hero?.title || "Join Our Team"}
            </h1>
            <p className="text-xl opacity-90">
              {content.careersPage?.hero?.subtitle || "Build your career with a company that values excellence, innovation, and growth"}
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.careersPage?.whyJoinSection?.title || "Why Join Us?"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.careersPage?.whyJoinSection?.subtitle || "We offer more than just a job—we provide opportunities for growth and development"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyJoinBenefits.map((benefit) => (
              <Card key={benefit.title} className="text-center border-border">
                <CardHeader>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.careersPage?.positionsSection?.title || "Open Positions"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.careersPage?.positionsSection?.subtitle || "Explore current opportunities and find the perfect role for you"}
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((position) => (
              <Card key={position.title} className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                      <CardDescription className="text-base">
                        {position.description}
                      </CardDescription>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-muted-foreground">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="text-sm">{position.department}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{position.location}</span>
                    </div>
                    <Badge variant="secondary">{position.type}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
