"use client";

import { Expo, gsap } from "gsap";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: Expo.easeOut,
          delay: 0.2,
        },
      );

      gsap.to(".glow-orb", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 flex h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] blur-[100px] dark:opacity-[0.15]">
        <div className="glow-orb h-full w-1/2 rounded-full bg-[#7f5af0] mix-blend-multiply" />
        <div className="glow-orb -ml-24 h-full w-1/2 rounded-full bg-[#f15bb5] mix-blend-multiply" />
      </div>

      <div className="hero-element mb-8 opacity-0">
        <div className="border-border bg-background/50 flex items-center gap-3 rounded-none border px-5 py-2 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7f5af0] opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7f5af0]"></span>
          </span>
          <span className="font-tertiary text-muted-foreground text-xs font-medium tracking-widest uppercase md:text-xs">
            350+ Projects Delivered Since 2020
          </span>
        </div>
      </div>

      <div className="hero-element mb-8 flex max-w-5xl flex-col items-center text-center opacity-0">
        <h1 className="font-primary text-foreground text-5xl leading-[1.1] font-extrabold tracking-tighter md:text-8xl md:leading-[1.2] lg:text-[5rem]">
          Design
          <AnimatedTitleIcon />
          <span className="text-muted-foreground pr-2 font-medium italic">
            meets
          </span>{" "}
          <br className="hidden md:block" />
          Intelligent Systems
        </h1>
      </div>

      <p className="hero-element font-secondary text-muted-foreground mb-12 max-w-2xl text-center text-lg leading-relaxed opacity-0 md:text-xl lg:text-lg">
        Creative Upaay builds premium web experiences powered by AI agents,
        workflow automations, and beautiful product design.
      </p>

      <div className="hero-element mb-20 flex w-full flex-col items-center gap-4 opacity-0 sm:w-auto sm:flex-row md:gap-6">
        <button className="bg-foreground text-background font-secondary flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
          Start a Project
          <ArrowRightIcon />
        </button>
        <button className="text-foreground border-border font-secondary hover:bg-muted flex w-full items-center justify-center rounded-full border bg-transparent px-8 py-4 text-lg font-bold transition-colors sm:w-auto">
          View Our Work
        </button>
      </div>

      <div className="hero-element flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-8 opacity-0">
        <div className="flex items-center gap-2">
          <CheckIcon />
          <span className="font-tertiary text-foreground text-sm font-medium md:text-xs">
            Worry-Free Pricing
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckIcon />
          <span className="font-tertiary text-foreground text-sm font-medium md:text-xs">
            Customized Strategies
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckIcon />
          <span className="font-tertiary text-foreground text-sm font-medium md:text-xs">
            Lightning-Fast Delivery
          </span>
        </div>
      </div>
    </section>
  );
}

function AnimatedTitleIcon() {
  const [index, setIndex] = useState(0);
  const iconRef = useRef<HTMLSpanElement>(null);

  const icons = [
    <Placeholder1 key="1" />,
    <Placeholder2 key="2" />,
    <Placeholder3 key="3" />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(iconRef.current, {
        filter: "blur(20px)",
        scale: 0.8,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % icons.length);

          gsap.to(iconRef.current, {
            filter: "blur(0px)",
            scale: 1,
            duration: 0.4,
            ease: "power2.inOut",
          });
        },
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <span
      ref={iconRef}
      className="mx-2 inline-flex h-[0.85em] w-[1.2em] items-center justify-center rounded-[0.4em] align-middle"
    >
      {icons[index]}
    </span>
  );
}

function Placeholder1() {
  return (
    <Image
      src="/icons/icon_1.png"
      alt="Design Icon"
      width={80}
      height={80}
      className="h-full w-full rounded-md object-contain"
    />
  );
}

function Placeholder2() {
  return (
    <Image
      src="/icons/icon_5.png"
      alt="Automate Icon"
      width={80}
      height={80}
      className="h-full w-full object-contain"
    />
  );
}

function Placeholder3() {
  return (
    <Image
      src="/icons/icon_3.png"
      alt="Scale Icon"
      width={80}
      height={80}
      className="h-full w-full rounded-md object-contain"
    />
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7f5af0]/10 text-[#7f5af0]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}
