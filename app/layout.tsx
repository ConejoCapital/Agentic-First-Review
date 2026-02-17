import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Agentic First Review | 100 AI Expert Personas Review Your Website",
  description:
    "Paste any URL and get actionable feedback from 100 AI expert personas — developers, marketers, designers, investors, and more.",
  openGraph: {
    title: "Agentic First Review",
    description: "Get your website reviewed by 100 AI expert personas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
