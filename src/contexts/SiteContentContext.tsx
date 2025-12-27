import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { siteConfig } from "@/config/site";

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
  updateContent: (newContent: SiteContent) => void;
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

  useEffect(() => {
    const saved = localStorage.getItem("siteContent");
    if (saved) {
      const parsed = JSON.parse(saved);
      setContent({
        ...siteConfig,
        ...parsed,
        dynamicPages: parsed.dynamicPages || defaultDynamicPages,
        staticPageOverrides: parsed.staticPageOverrides || defaultStaticPageOverrides,
      });
    }
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem("siteContent", JSON.stringify(newContent));
  };

  return (
    <SiteContentContext.Provider value={{ content, updateContent }}>
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
