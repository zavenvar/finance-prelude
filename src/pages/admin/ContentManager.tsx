import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";

const ContentManager = () => {
  const [content, setContent] = useState(siteConfig);

  useEffect(() => {
    const saved = localStorage.getItem("siteContent");
    if (saved) {
      setContent(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("siteContent", JSON.stringify(content));
    toast.success("Content saved successfully!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Content Management</h2>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Site Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input
                value={content.name}
                onChange={(e) => setContent({ ...content, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Site Description</Label>
              <Textarea
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Hero Title</Label>
              <Input
                value={content.hero.title}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Subtitle</Label>
              <Textarea
                value={content.hero.subtitle}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, subtitle: e.target.value }
                })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={content.contact.email}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, email: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={content.contact.phone}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, phone: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea
                value={content.contact.address}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, address: e.target.value }
                })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ContentManager;
