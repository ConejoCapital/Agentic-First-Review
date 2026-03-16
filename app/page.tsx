import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { WhyAgentic } from "@/components/why-agentic";
import { SocialProof } from "@/components/social-proof";
import { PricingSection } from "@/components/pricing-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <WhyAgentic />
      <SocialProof />
      <PricingSection />
    </>
  );
}
