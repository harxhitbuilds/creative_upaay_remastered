"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect, useRef, useState } from "react";

interface ServiceCardProps {
  title: string;
  copy: string;
  index: number;
  color: string;
  icon: React.ReactNode;
}

const ServiceCard = ({ title, copy, color, icon, index }: ServiceCardProps) => {
  return (
    <div className="relative h-[280px] w-full" id={`card-${index + 1}`}>
      <div
        className="relative flex h-full w-full flex-col gap-4 rounded-3xl p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 md:p-8"
        style={{ backgroundColor: color }}
      >
        <div className="flex h-full flex-col justify-between text-left">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#141414] text-white shadow-md">
              {icon}
            </div>

            <h3 className="font-primary mt-1 text-2xl leading-tight font-black text-[#141414] md:mt-2 md:text-3xl">
              {title}
            </h3>
          </div>

          <p className="font-secondary text-base leading-relaxed font-bold text-[#141414]/80 md:text-lg">
            {copy}
          </p>
        </div>
      </div>
    </div>
  );
};

const MobileServicesSection = ({ services }: { services: any[] }) => {
  return (
    <div className="overflow-hidden bg-[#0e0d09] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="font-primary mb-6 leading-tight font-black">
            What We <span className="text-zinc-500 italic">Offer.</span>
          </h2>
          <p className="font-secondary mx-auto max-w-2xl text-lg text-zinc-400">
            Premium digital services designed to scale your business and
            automate the mundane.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    gsap.registerPlugin(ScrollTrigger);

    const initAnimation = () => {
      cardRefs.current.forEach((card) => {
        if (card) gsap.set(card, { y: "100vh", opacity: 0 });
      });

      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const numCards = cardRefs.current.length;

            const step = 1 / numCards;

            cardRefs.current.forEach((card, index) => {
              if (!card) return;

              const start = index * step;
              const end = start + step;

              const cardProgress = Math.max(
                0,
                Math.min(1, (progress - start) / step),
              );

              const easedProgress = 1 - Math.pow(1 - cardProgress, 3);

              if (progress <= start) {
                gsap.set(card, { y: "100vh", opacity: 0 });
              } else if (progress >= end) {
                gsap.set(card, { y: "0vh", opacity: 1 });
              } else {
                gsap.set(card, {
                  y: `${100 * (1 - easedProgress)}vh`,
                  opacity: easedProgress,
                });
              }
            });
          },
        });
      }
    };

    const timer = setTimeout(initAnimation, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isClient]);

  const services = [
    {
      title: "Premium Web Design",
      copy: "Award-winning, conversion-optimized interfaces that command attention and build instant brand trust.",
      color: "#FF9EE6", // Pop Pink
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      ),
    },
    {
      title: "AI Agents",
      copy: "Custom LLM-powered chatbots and agents that handle customer support, sales, and internal logic 24/7.",
      color: "#D0FF71", // Pop Lime / Acid Yellow
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      ),
    },
    {
      title: "Workflow Automation",
      copy: "Complex API integrations using Zapier and Make to connect your tools and eliminate manual data entry.",
      color: "#B4A1FF", // Pop Violet
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <line x1="12" y1="22" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      title: "Web Applications",
      copy: "Highly scalable, deeply interactive full-stack platforms built with Next.js, React, and modern backends.",
      color: "#88E5FF", // Pop Cyan/Blue
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: "System Audits",
      copy: "Comprehensive reviews of your current tech stack for speed, SEO, security, and architectural integrity.",
      color: "#A5F3FC", // Pop Mint
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <polyline points="11 8 11 11 14 14" />
        </svg>
      ),
    },
  ];

  if (!isClient) return null;

  return (
    <div className="bg-[#0e0d09] text-white">
      <div
        ref={sectionRef}
        className="relative hidden min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#0e0d09] md:flex"
      >
        <div className="mx-auto flex h-screen w-full max-w-7xl flex-col justify-center px-8">
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="relative z-10 flex w-full flex-col justify-center py-8">
              <h1 className="font-primary mb-6 text-5xl leading-tight font-black text-white lg:text-4xl">
                What We <br />
                <span className="text-zinc-500">Offer.</span>
              </h1>
              <p className="font-secondary text-xl leading-relaxed font-medium text-zinc-400">
                Premium digital services designed to scale your business and
                automate the mundane.
              </p>
            </div>

            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="will-change-transform"
              >
                <ServiceCard {...service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <MobileServicesSection services={services} />
      </div>
    </div>
  );
}
