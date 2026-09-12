import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { OurApproach } from "@/components/OurApproach";
import { CreditRepairSection } from "@/components/CreditRepairSection";
import { CreditJourney } from "@/components/CreditJourney";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { CreditAssessmentForm } from "@/components/CreditAssessmentForm";
import { Testimonials } from "@/components/Testimonials";
import { LoanAssistance } from "@/components/LoanAssistance";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-white selection:bg-indigo-600 selection:text-white">
      {/* Responsive Animated Sticky Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="grow">
        {/* 1. Hero Section with Live Animated Credit Score Gauge */}
        <Hero />

        {/* 2. Problem Section */}
        <ProblemSection />

        {/* 3. Interactive Active Step-Switcher Workflow: Our Approach */}
        <OurApproach />

        {/* 4. Core Credit Repair Section Process */}
        <CreditRepairSection />

        {/* 5. Credit Journey Conceptual Roadmap */}
        <CreditJourney />

        {/* 6. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 7. How It Works Timeline Section */}
        <HowItWorks />

        {/* 8. Primary Form: Free Credit Assessment Wizard / Form */}
        <CreditAssessmentForm />

        {/* 9. Client Testimonials */}
        <Testimonials />

        {/* 10. Secondary Service: Dynamic Multi-Step Loan Assistance Capture */}
        <LoanAssistance />

        {/* 11. FAQ Accordion Section */}
        <FAQ />

        {/* 12. Final Closing CTA */}
        <FinalCTA />
      </main>

      {/* Mobile Sticky Conversion Bar */}
      <StickyMobileCTA />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
