"use client";

import { useState } from "react";

import Loader from "@/components/global/loader";
import Hero from "@/components/marketing/hero";

export default function Home() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="fade-in bg-background flex min-h-screen flex-col items-center justify-center py-2">
      <Hero />
    </div>
  );
}
