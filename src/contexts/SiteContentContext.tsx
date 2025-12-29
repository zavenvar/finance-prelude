import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { contentApi, SiteContent as ApiSiteContent } from "@/lib/api";

export interface DynamicPage {
  id: string;
  name: string;
  path: string;
  content: string;
  status: "Published" | "Draft";
}

export interface StaticPageOverride {
  id: string;
  name: string;
  path: string;
  content: string;
  status: "Published" | "Draft";
}

type SiteContent = typeof siteConfig & {
  dynamicPages: DynamicPage[];
  staticPageOverrides: Record<string, StaticPageOverride>;
};

interface SiteContentContextType {
  content: SiteContent;
  isLoading: boolean;
  updateContent: (newContent: SiteContent) => Promise<void>;
  refreshContent: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const defaultDynamicPages: DynamicPage[] = [];
const defaultStaticPageOverrides: Record<string, StaticPageOverride> = {};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>({
    ...siteConfig,
    dynamicPages: defaultDynamicPages,
    staticPageOverrides: defaultStaticPageOverrides,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const apiContent = await contentApi.get();
      
      // Merge API content with default siteConfig
      setContent({
        ...siteConfig,
        ...apiContent,
        name: apiContent.name || siteConfig.name,
        tagline: apiContent.tagline || siteConfig.tagline,
        description: apiContent.description || siteConfig.description,
        nav: apiContent.nav || siteConfig.nav,
        hero: apiContent.hero || siteConfig.hero,
        home: apiContent.home || siteConfig.home,
        services: apiContent.services || siteConfig.services,
        servicesPage: apiContent.servicesPage || siteConfig.servicesPage,
        about: apiContent.about || siteConfig.about,
        contact: apiContent.contact || siteConfig.contact,
        contactPage: apiContent.contactPage || siteConfig.contactPage,
        careersPage: apiContent.careersPage || siteConfig.careersPage,
        footer: apiContent.footer || siteConfig.footer,
        dynamicPages: apiContent.dynamicPages || defaultDynamicPages,
        staticPageOverrides: apiContent.staticPageOverrides || defaultStaticPageOverrides,
      });
    } catch (error) {
      console.error("Failed to fetch content from API, using defaults:", error);
      // Keep using default siteConfig if API fails
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateContent = async (newContent: SiteContent) => {
    try {
      await contentApi.update(newContent as unknown as ApiSiteContent);
      setContent(newContent);
    } catch (error) {
      console.error("Failed to update content:", error);
      throw error;
    }
  };

  const refreshContent = async () => {
    setIsLoading(true);
    await fetchContent();
  };

  return (
    <SiteContentContext.Provider value={{ content, isLoading, updateContent, refreshContent }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
};
