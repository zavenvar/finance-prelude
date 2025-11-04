// Site configuration - customize all content here
export const siteConfig = {
  name: "Pinnacle Financial",
  tagline: "Building Your Financial Future",
  description: "A trusted financial institution providing comprehensive banking and investment services.",
  
  // Navigation
  nav: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ],
  
  // Hero Section
  hero: {
    title: "Your Trusted Financial Partner",
    subtitle: "Building secure financial futures with personalized solutions and expert guidance",
    cta: {
      primary: "Get Started",
      secondary: "Learn More",
    },
  },
  
  // Services
  services: [
    {
      title: "Personal Banking",
      description: "Comprehensive banking solutions tailored to your personal financial needs.",
      icon: "Wallet",
    },
    {
      title: "Business Solutions",
      description: "Expert financial services designed to help your business grow and thrive.",
      icon: "Building2",
    },
    {
      title: "Investment Management",
      description: "Strategic investment planning to maximize your portfolio's potential.",
      icon: "TrendingUp",
    },
    {
      title: "Wealth Advisory",
      description: "Personalized guidance to help you build and preserve wealth over time.",
      icon: "Shield",
    },
  ],
  
  // About
  about: {
    title: "About Pinnacle Financial",
    mission: "Our mission is to provide exceptional financial services that empower our clients to achieve their goals with confidence and security.",
    values: [
      {
        title: "Trust",
        description: "Building lasting relationships through transparency and integrity.",
      },
      {
        title: "Excellence",
        description: "Delivering superior service and innovative solutions.",
      },
      {
        title: "Security",
        description: "Protecting your assets with industry-leading safeguards.",
      },
    ],
  },
  
  // Contact
  contact: {
    email: "info@pinnaclefinancial.com",
    phone: "+1 (555) 123-4567",
    address: "123 Financial District, New York, NY 10004",
    hours: "Monday - Friday: 9:00 AM - 5:00 PM",
  },
  
  // Footer
  footer: {
    tagline: "Your partner in financial success",
    links: {
      company: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
      services: [
        { name: "Personal Banking", href: "/services" },
        { name: "Business Solutions", href: "/services" },
        { name: "Investments", href: "/services" },
      ],
      legal: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Security", href: "#" },
      ],
    },
  },
};
