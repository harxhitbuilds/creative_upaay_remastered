"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import { ReactNode, useEffect, useRef } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const checkLenis = () => {
      const lenis = lenisRef.current?.lenis;
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        if (typeof window !== "undefined") {
          (window as any).ScrollTrigger = ScrollTrigger;
          (window as any).gsap = gsap;
        }

        return true;
      }
      return false;
    };

    if (!checkLenis()) {
      const timer = setTimeout(() => {
        checkLenis();
      }, 100);

      return () => clearTimeout(timer);
    }

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      const lenis = lenisRef.current?.lenis;
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
      }
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: true }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};
