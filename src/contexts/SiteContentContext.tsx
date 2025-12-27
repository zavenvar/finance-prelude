import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { siteConfig } from "@/config/site";

type SiteContent = typeof siteConfig;

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(siteConfig);

  useEffect(() => {
    const saved = localStorage.getItem("siteContent");
    if (saved) {
      setContent(JSON.parse(saved));
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
