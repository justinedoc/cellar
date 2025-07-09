export interface FooterNavItem {
  text: string;
  href: string;
  badge?: string;
}

export interface FooterNavCategory {
  category: string;
  items: FooterNavItem[];
}

export const footerNavs: FooterNavCategory[] = [
  {
    category: "Products",
    items: [
      { text: "Features", href: "#features" },
      { text: "Pricing", href: "/services#pricing" },
      { text: "Integrations", href: "#integrations" },
      { text: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    category: "Company",
    items: [
      { text: "About Us", href: "/connect" },
      { text: "Careers", href: "#careers" },
      { text: "Press Kit", href: "#press-kit" },
      { text: "Sustainability", href: "#sustainability" },
    ],
  },
  {
    category: "Resources",
    items: [
      { text: "Blog", href: "/blogs" },
      { text: "Case Studies", href: "#case-studies" },
      { text: "Help Center", href: "#help-center" },
      { text: "API Docs", href: "#api-docs" },
    ],
  },
  {
    category: "Legal",
    items: [
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Terms of Service", href: "/terms" },
      { text: "GDPR", href: "/gdpr" },
      { text: "Compliance", href: "/compliance" },
    ],
  },
];

export const footerSocialLinks = [
  {
    name: "Instagram",
    icon: "/icons/instagram.svg",
    url: "#",
  },
  {
    name: "Facebook",
    icon: "/icons/facebook.svg",
    url: "#",
  },

  {
    name: "LinkedIn",
    icon: "/icons/linkedIn.svg",
    url: "#",
  },
];
