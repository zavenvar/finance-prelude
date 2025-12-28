import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

const ContentManager = () => {
  const { content, updateContent } = useSiteContent();

  const handleSave = () => {
    updateContent(content);
    toast.success("Content saved successfully!");
  };

  const setContent = (newContent: typeof content) => {
    updateContent(newContent);
  };

  // Service update helper
  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...content.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setContent({ ...content, services: newServices });
  };

  // Service details update helper
  const updateServiceDetail = (index: number, field: string, value: any) => {
    const newServiceDetails = [...(content.servicesPage?.serviceDetails || [])];
    newServiceDetails[index] = { ...newServiceDetails[index], [field]: value };
    setContent({
      ...content,
      servicesPage: {
        ...content.servicesPage,
        serviceDetails: newServiceDetails,
      },
    });
  };

  // Update feature in service detail
  const updateServiceFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServiceDetails = [...(content.servicesPage?.serviceDetails || [])];
    const newFeatures = [...newServiceDetails[serviceIndex].features];
    newFeatures[featureIndex] = value;
    newServiceDetails[serviceIndex] = { ...newServiceDetails[serviceIndex], features: newFeatures };
    setContent({
      ...content,
      servicesPage: {
        ...content.servicesPage,
        serviceDetails: newServiceDetails,
      },
    });
  };

  // Value update helper
  const updateValue = (index: number, field: string, value: string) => {
    const newValues = [...content.about.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setContent({
      ...content,
      about: { ...content.about, values: newValues },
    });
  };

  // Story paragraph update helper
  const updateStoryParagraph = (index: number, value: string) => {
    const newParagraphs = [...(content.about.storySection?.paragraphs || [])];
    newParagraphs[index] = value;
    setContent({
      ...content,
      about: {
        ...content.about,
        storySection: {
          ...content.about.storySection,
          title: content.about.storySection?.title || "Our Story",
          paragraphs: newParagraphs,
        },
      },
    });
  };

  // Benefit update helper
  const updateBenefit = (index: number, field: string, value: string) => {
    const newBenefits = [...(content.careersPage?.whyJoinSection?.benefits || [])];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setContent({
      ...content,
      careersPage: {
        ...content.careersPage,
        whyJoinSection: {
          ...content.careersPage?.whyJoinSection,
          title: content.careersPage?.whyJoinSection?.title || "Why Join Us?",
          subtitle: content.careersPage?.whyJoinSection?.subtitle || "",
          benefits: newBenefits,
        },
      },
    });
  };

  // Position update helper
  const updatePosition = (index: number, field: string, value: string) => {
    const newPositions = [...(content.careersPage?.openPositions || [])];
    newPositions[index] = { ...newPositions[index], [field]: value };
    setContent({
      ...content,
      careersPage: {
        ...content.careersPage,
        openPositions: newPositions,
      },
    });
  };

  // Add new position
  const addPosition = () => {
    const newPositions = [
      ...(content.careersPage?.openPositions || []),
      {
        title: "New Position",
        department: "Department",
        location: "Location",
        type: "Full-time",
        description: "Position description",
      },
    ];
    setContent({
      ...content,
      careersPage: {
        ...content.careersPage,
        openPositions: newPositions,
      },
    });
  };

  // Remove position
  const removePosition = (index: number) => {
    const newPositions = (content.careersPage?.openPositions || []).filter((_, i) => i !== index);
    setContent({
      ...content,
      careersPage: {
        ...content.careersPage,
        openPositions: newPositions,
      },
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Content Management</h2>
          <Button onClick={handleSave}>Save All Changes</Button>
        </div>

        <Tabs defaultValue="site" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="site">Site Info</TabsTrigger>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
          </TabsList>

          {/* Site Info Tab */}
          <TabsContent value="site" className="space-y-6">
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
                  <Label>Tagline</Label>
                  <Input
                    value={content.tagline}
                    onChange={(e) => setContent({ ...content, tagline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Site Description</Label>
                  <Textarea
                    value={content.description}
                    onChange={(e) => setContent({ ...content, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>MySQL API URL (for contact form)</Label>
                  <Input
                    value={content.mysqlApiUrl || ""}
                    onChange={(e) => setContent({ ...content, mysqlApiUrl: e.target.value })}
                    placeholder="https://your-api.com/contacts"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Hero Title</Label>
                  <Input
                    value={content.hero.title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, title: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hero Subtitle</Label>
                  <Textarea
                    value={content.hero.subtitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, subtitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Button Text</Label>
                    <Input
                      value={content.hero.cta.primary}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, cta: { ...content.hero.cta, primary: e.target.value } },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Button Text</Label>
                    <Input
                      value={content.hero.cta.secondary}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, cta: { ...content.hero.cta, secondary: e.target.value } },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={content.home?.servicesSection?.title || "Our Services"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: {
                          ...content.home,
                          servicesSection: {
                            ...content.home?.servicesSection,
                            title: e.target.value,
                            subtitle: content.home?.servicesSection?.subtitle || "",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Subtitle</Label>
                  <Textarea
                    value={content.home?.servicesSection?.subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: {
                          ...content.home,
                          servicesSection: {
                            ...content.home?.servicesSection,
                            title: content.home?.servicesSection?.title || "Our Services",
                            subtitle: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Cards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Service {index + 1} Title</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(index, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={service.description}
                        onChange={(e) => updateService(index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CTA Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>CTA Title</Label>
                  <Input
                    value={content.home?.ctaSection?.title || "Ready to Get Started?"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: {
                          ...content.home,
                          ctaSection: {
                            ...content.home?.ctaSection,
                            title: e.target.value,
                            subtitle: content.home?.ctaSection?.subtitle || "",
                            buttonText: content.home?.ctaSection?.buttonText || "Contact Us Today",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>CTA Subtitle</Label>
                  <Textarea
                    value={content.home?.ctaSection?.subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: {
                          ...content.home,
                          ctaSection: {
                            ...content.home?.ctaSection,
                            title: content.home?.ctaSection?.title || "Ready to Get Started?",
                            subtitle: e.target.value,
                            buttonText: content.home?.ctaSection?.buttonText || "Contact Us Today",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={content.home?.ctaSection?.buttonText || "Contact Us Today"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home: {
                          ...content.home,
                          ctaSection: {
                            ...content.home?.ctaSection,
                            title: content.home?.ctaSection?.title || "Ready to Get Started?",
                            subtitle: content.home?.ctaSection?.subtitle || "",
                            buttonText: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={content.about.title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, title: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mission Statement</Label>
                  <Textarea
                    value={content.about.mission}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, mission: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Values Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={content.about.valuesSection?.title || "Our Values"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          valuesSection: {
                            ...content.about.valuesSection,
                            title: e.target.value,
                            subtitle: content.about.valuesSection?.subtitle || "",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Subtitle</Label>
                  <Input
                    value={content.about.valuesSection?.subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          valuesSection: {
                            ...content.about.valuesSection,
                            title: content.about.valuesSection?.title || "Our Values",
                            subtitle: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>

                {content.about.values.map((value, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Value {index + 1} Title</Label>
                      <Input
                        value={value.title}
                        onChange={(e) => updateValue(index, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={value.description}
                        onChange={(e) => updateValue(index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Story Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={content.about.storySection?.title || "Our Story"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          storySection: {
                            ...content.about.storySection,
                            title: e.target.value,
                            paragraphs: content.about.storySection?.paragraphs || [],
                          },
                        },
                      })
                    }
                  />
                </div>
                {(content.about.storySection?.paragraphs || []).map((paragraph, index) => (
                  <div key={index} className="space-y-2">
                    <Label>Paragraph {index + 1}</Label>
                    <Textarea
                      value={paragraph}
                      onChange={(e) => updateStoryParagraph(index, e.target.value)}
                      rows={4}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={content.servicesPage?.hero?.title || "Our Services"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        servicesPage: {
                          ...content.servicesPage,
                          hero: {
                            ...content.servicesPage?.hero,
                            title: e.target.value,
                            subtitle: content.servicesPage?.hero?.subtitle || "",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.servicesPage?.hero?.subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        servicesPage: {
                          ...content.servicesPage,
                          hero: {
                            ...content.servicesPage?.hero,
                            title: content.servicesPage?.hero?.title || "Our Services",
                            subtitle: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {(content.servicesPage?.serviceDetails || []).map((service, serviceIndex) => (
                  <div key={serviceIndex} className="border rounded-lg p-4 space-y-4">
                    <div className="space-y-2">
                      <Label>{service.title} - Features</Label>
                      {service.features.map((feature, featureIndex) => (
                        <Input
                          key={featureIndex}
                          value={feature}
                          onChange={(e) => updateServiceFeature(serviceIndex, featureIndex, e.target.value)}
                          placeholder={`Feature ${featureIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CTA Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={content.servicesPage?.ctaSection?.title || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        servicesPage: {
                          ...content.servicesPage,
                          ctaSection: {
                            ...content.servicesPage?.ctaSection,
                            title: e.target.value,
                            subtitle: content.servicesPage?.ctaSection?.subtitle || "",
                            buttonText: content.servicesPage?.ctaSection?.buttonText || "Contact Us",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.servicesPage?.ctaSection?.subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        servicesPage: {
                          ...content.servicesPage,
                          ctaSection: {
                            ...content.servicesPage?.ctaSection,
                            title: content.servicesPage?.ctaSection?.title || "",
                            subtitle: e.target.value,
                            buttonText: content.servicesPage?.ctaSection?.buttonText || "Contact Us",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={content.servicesPage?.ctaSection?.buttonText || "Contact Us"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        servicesPage: {
                          ...content.servicesPage,
                          ctaSection: {
                            ...content.servicesPage?.ctaSection,
                            title: content.servicesPage?.ctaSection?.title || "",
                            subtitle: content.servicesPage?.ctaSection?.subtitle || "",
                            buttonText: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={content.contactPage?.hero?.title || "Contact Us"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contactPage: {
                          ...content.contactPage,
                          hero: {
                            ...content.contactPage?.hero,
                            title: e.target.value,
                            subtitle: content.contactPage?.hero?.subtitle || "",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.contactPage?.hero?.subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contactPage: {
                          ...content.contactPage,
                          hero: {
                            ...content.contactPage?.hero,
                            title: content.contactPage?.hero?.title || "Contact Us",
                            subtitle: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Form Title</Label>
                  <Input
                    value={content.contactPage?.formSection?.title || "Send us a Message"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contactPage: {
                          ...content.contactPage,
                          formSection: {
                            ...content.contactPage?.formSection,
                            title: e.target.value,
                          },
                        },
                      })
                    }
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
                  <Label>Section Title</Label>
                  <Input
                    value={content.contactPage?.infoSection?.title || "Contact Information"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contactPage: {
                          ...content.contactPage,
                          infoSection: {
                            ...content.contactPage?.infoSection,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea
                    value={content.contact.address}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, address: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={content.careersPage?.hero?.title || "Join Our Team"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        careersPage: {
                          ...content.careersPage,
                          hero: {
                            ...content.careersPage?.hero,
                            title: e.target.value,
                            subtitle: content.careersPage?.hero?.subtitle || "",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={content.careersPage?.hero?.subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        careersPage: {
                          ...content.careersPage,
                          hero: {
                            ...content.careersPage?.hero,
                            title: content.careersPage?.hero?.title || "Join Our Team",
                            subtitle: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Join Us Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={content.careersPage?.whyJoinSection?.title || "Why Join Us?"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        careersPage: {
                          ...content.careersPage,
                          whyJoinSection: {
                            ...content.careersPage?.whyJoinSection,
                            title: e.target.value,
                            subtitle: content.careersPage?.whyJoinSection?.subtitle || "",
                            benefits: content.careersPage?.whyJoinSection?.benefits || [],
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Subtitle</Label>
                  <Textarea
                    value={content.careersPage?.whyJoinSection?.subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        careersPage: {
                          ...content.careersPage,
                          whyJoinSection: {
                            ...content.careersPage?.whyJoinSection,
                            title: content.careersPage?.whyJoinSection?.title || "Why Join Us?",
                            subtitle: e.target.value,
                            benefits: content.careersPage?.whyJoinSection?.benefits || [],
                          },
                        },
                      })
                    }
                  />
                </div>

                {(content.careersPage?.whyJoinSection?.benefits || []).map((benefit, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Benefit {index + 1} Title</Label>
                      <Input
                        value={benefit.title}
                        onChange={(e) => updateBenefit(index, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={benefit.description}
                        onChange={(e) => updateBenefit(index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Positions Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={content.careersPage?.positionsSection?.title || "Open Positions"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        careersPage: {
                          ...content.careersPage,
                          positionsSection: {
                            ...content.careersPage?.positionsSection,
                            title: e.target.value,
                            subtitle: content.careersPage?.positionsSection?.subtitle || "",
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Subtitle</Label>
                  <Textarea
                    value={content.careersPage?.positionsSection?.subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        careersPage: {
                          ...content.careersPage,
                          positionsSection: {
                            ...content.careersPage?.positionsSection,
                            title: content.careersPage?.positionsSection?.title || "Open Positions",
                            subtitle: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Job Positions</CardTitle>
                <Button onClick={addPosition} size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Add Position
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {(content.careersPage?.openPositions || []).map((position, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Position {index + 1}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removePosition(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={position.title}
                          onChange={(e) => updatePosition(index, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Input
                          value={position.department}
                          onChange={(e) => updatePosition(index, "department", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={position.location}
                          onChange={(e) => updatePosition(index, "location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Input
                          value={position.type}
                          onChange={(e) => updatePosition(index, "type", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={position.description}
                        onChange={(e) => updatePosition(index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContentManager;
