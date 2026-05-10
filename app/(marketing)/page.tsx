"use client";

import { useState } from "react";

import Loader from "@/components/global/loader";
import AboutReveal from "@/components/marketing/about-reveal";
import ClientsSection from "@/components/marketing/clients";
import FAQSection from "@/components/marketing/faq";
import Hero from "@/components/marketing/hero";
import ServicesSection from "@/components/marketing/services";
import Footer from "@/components/navigation/footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="fade-in bg-background flex min-h-screen flex-col items-center justify-center overflow-y-hidden py-2">
      <Hero />
      <AboutReveal />
      <ServicesSection />
      <ClientsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
