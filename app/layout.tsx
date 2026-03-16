import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-first-seo.vercel.app"),
  title: "Agentic-First SEO | Is Your Website Ready for AI Agents?",
  description:
    "100 AI agent personas analyze your website from the perspective of the agentic web. Get scores, verdicts, and actionable recommendations for the AI agent era.",
  keywords: [
    "agentic SEO",
    "AI agent",
    "website review",
    "AI personas",
    "SEO for AI",
    "agentic web",
    "website analysis",
    "AI review",
  ],
  authors: [{ name: "ConejoCapital", url: "https://github.com/ConejoCapital" }],
  openGraph: {
    title: "Agentic-First SEO — Is Your Website Ready for AI Agents?",
    description:
      "100 AI agent personas analyze your website. Get scores, verdicts, and recommendations for the agentic web.",
    type: "website",
    url: "https://agentic-first-seo.vercel.app",
    siteName: "Agentic-First SEO",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Agentic-First SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic-First SEO — Is Your Website Ready for AI Agents?",
    description:
      "100 AI agent personas analyze your website for the agentic web era.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen bg-background font-body antialiased noise-bg">
        <JsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
