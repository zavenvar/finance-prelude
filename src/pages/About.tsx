import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteContent } from "@/contexts/SiteContentContext";

export default function About() {
  const { content } = useSiteContent();
  
  const storyParagraphs = content.about.storySection?.paragraphs || [
    `Founded with a vision to revolutionize financial services, ${content.name} has grown into a trusted partner for individuals and businesses seeking comprehensive financial solutions.`,
    "Our team of experienced professionals combines deep industry knowledge with innovative approaches to deliver exceptional results for our clients. We believe in building long-term relationships based on trust, transparency, and mutual success.",
    "Today, we continue to expand our services and capabilities while staying true to our core values and commitment to excellence.",
  ];
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.about.title}
            </h1>
            <p className="text-xl opacity-90">
              {content.about.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.about.valuesSection?.title || "Our Values"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.about.valuesSection?.subtitle || "The principles that guide everything we do"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {content.about.values.map((value) => (
              <Card key={value.title} className="text-center border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              {content.about.storySection?.title || "Our Story"}
            </h2>
            <div className="prose prose-lg max-w-none">
              {storyParagraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
