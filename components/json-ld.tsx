export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Agentic-First SEO",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "100 AI agent personas analyze your website from the perspective of the agentic web. Get scores, verdicts, and actionable SEO recommendations for the AI agent era.",
    url: "https://agentic-first-seo.vercel.app",
    author: {
      "@type": "Organization",
      name: "ConejoCapital",
      url: "https://github.com/ConejoCapital",
    },
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Free",
        description: "20 AI persona analysis, 3 reviews per day",
      },
      {
        "@type": "Offer",
        price: "9.99",
        priceCurrency: "USD",
        name: "Pro",
        description:
          "100 AI persona analysis, unlimited reviews, shareable reports",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
