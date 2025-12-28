// Site configuration - customize all content here
export const siteConfig = {
  name: "Pinnacle Financial",
  tagline: "Building Your Financial Future",
  description: "A trusted financial institution providing comprehensive banking and investment services.",
  
  // MySQL API URL for contact form submissions
  mysqlApiUrl: "",
  
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

  // Home Page
  home: {
    servicesSection: {
      title: "Our Services",
      subtitle: "Comprehensive financial solutions designed to meet your unique needs",
    },
    ctaSection: {
      title: "Ready to Get Started?",
      subtitle: "Contact us today to discuss how we can help you achieve your financial goals",
      buttonText: "Contact Us Today",
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

  // Services Page
  servicesPage: {
    hero: {
      title: "Our Services",
      subtitle: "Comprehensive financial solutions tailored to your needs",
    },
    serviceDetails: [
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
    ],
    ctaSection: {
      title: "Interested in Our Services?",
      subtitle: "Get in touch with our team to learn more about how we can help you",
      buttonText: "Contact Us",
    },
  },
  
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
    valuesSection: {
      title: "Our Values",
      subtitle: "The principles that guide everything we do",
    },
    storySection: {
      title: "Our Story",
      paragraphs: [
        "Founded with a vision to revolutionize financial services, Pinnacle Financial has grown into a trusted partner for individuals and businesses seeking comprehensive financial solutions.",
        "Our team of experienced professionals combines deep industry knowledge with innovative approaches to deliver exceptional results for our clients. We believe in building long-term relationships based on trust, transparency, and mutual success.",
        "Today, we continue to expand our services and capabilities while staying true to our core values and commitment to excellence.",
      ],
    },
  },
  
  // Contact
  contact: {
    email: "info@pinnaclefinancial.com",
    phone: "+1 (555) 123-4567",
    address: "123 Financial District, New York, NY 10004",
    hours: "Monday - Friday: 9:00 AM - 5:00 PM",
  },

  // Contact Page
  contactPage: {
    hero: {
      title: "Contact Us",
      subtitle: "Get in touch with our team. We're here to help you with your financial needs.",
    },
    formSection: {
      title: "Send us a Message",
    },
    infoSection: {
      title: "Contact Information",
    },
  },

  // Careers Page
  careersPage: {
    hero: {
      title: "Join Our Team",
      subtitle: "Build your career with a company that values excellence, innovation, and growth",
    },
    whyJoinSection: {
      title: "Why Join Us?",
      subtitle: "We offer more than just a job—we provide opportunities for growth and development",
      benefits: [
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
      ],
    },
    positionsSection: {
      title: "Open Positions",
      subtitle: "Explore current opportunities and find the perfect role for you",
    },
    openPositions: [
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
    ],
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
