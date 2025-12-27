import { useParams, Navigate } from "react-router-dom";
import { useSiteContent } from "@/contexts/SiteContentContext";

export default function DynamicPage() {
  const { slug } = useParams();
  const { content } = useSiteContent();
  
  const page = content.dynamicPages?.find(p => p.path === `/${slug}`);

  if (!page || page.status !== "Published") {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="flex flex-col">
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {page.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-lg text-muted-foreground whitespace-pre-wrap">
              {page.content}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
