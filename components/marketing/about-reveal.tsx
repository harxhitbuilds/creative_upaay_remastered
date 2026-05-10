"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutReveal: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const animeTextContainersRef = useRef<NodeListOf<Element> | null>(null);

  // Your signature solid pop colors
  const popColors = [
    "#FF9EE6",
    "#D0FF71",
    "#B4A1FF",
    "#88E5FF",
    "#FFC071",
    "#A5F3FC",
  ];

  useEffect(() => {
    ctaRef.current = document.querySelector(".cta-panel");
    aboutRef.current = document.querySelector(".about-section");
    animeTextContainersRef.current = document.querySelectorAll(
      ".anime-text-container",
    );

    if (
      !animeTextContainersRef.current ||
      animeTextContainersRef.current.length === 0
    )
      return;

    const animeTextParagraphs = document.querySelectorAll(".anime-text p");

    const keywords = [
      "premium",
      "intelligent",
      "systems",
      "scalable",
      "ai",
      "automations",
      "crafted",
      "transformative",
      "future",
    ];

    animeTextParagraphs.forEach((paragraph) => {
      const text = paragraph.textContent || "";
      const words = text.split(/\s+/);
      paragraph.innerHTML = "";

      words.forEach((word, i) => {
        if (word.trim()) {
          const wordContainer = document.createElement("div");
          // Base classes for words
          wordContainer.className =
            "inline-block mr-[0.25em] mb-[0.1em] transition-all duration-300";
          wordContainer.style.opacity = "0";

          const wordText = document.createElement("span");
          wordText.textContent = word;
          wordText.style.opacity = "0";

          const normalizedWord = word.toLowerCase().replace(/[.,!?;:]/g, "");

          if (keywords.includes(normalizedWord)) {
            // Assign a random pop color to this keyword
            const randomColor =
              popColors[Math.floor(Math.random() * popColors.length)];

            // Styling the keyword as a "Sticker"
            wordContainer.style.backgroundColor = randomColor;
            wordContainer.style.padding = "0 0.4em";
            wordContainer.style.borderRadius = "0.2em";
            wordContainer.style.transform = `rotate(${Math.random() * 4 - 2}deg)`; // Subtle random tilt

            wordText.style.color = "#141414"; // Contrast dark text on vibrant bg
            wordText.classList.add("font-black");
          } else {
            wordText.classList.add("text-zinc-500");
          }

          wordContainer.appendChild(wordText);
          paragraph.appendChild(wordContainer);

          if (i < words.length - 1) {
            paragraph.appendChild(document.createTextNode(" "));
          }
        }
      });
    });

    // Updated highlight bg to be invisible initially since the words carry their own color now
    const wordHighlightBgColor = "255, 255, 255";

    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: "100%" });
    }

    animeTextContainersRef.current.forEach((container) => {
      const isMobile = window.innerWidth < 768;
      const scrollMultiplier = isMobile ? 2 : 4;

      ScrollTrigger.create({
        trigger: container,
        pin: container,
        start: "top top",
        end: `+=${window.innerHeight * scrollMultiplier}`,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const words = Array.from(
            container.querySelectorAll(".anime-text div"),
          );
          const totalWords = words.length;
          const cta = ctaRef.current;

          if (progress <= 0.7 && cta) {
            gsap.set(cta, { y: "100%" });
          }

          if (progress <= 0.7) {
            const progressTarget = 0.7;
            const revealProgress = Math.min(1, progress / progressTarget);
            const overlapWords = isMobile ? 8 : 15;
            const totalAnimationLength = 1 + overlapWords / totalWords;

            words.forEach((word, index) => {
              const wordText = word.querySelector("span") as HTMLElement | null;
              const wordStart = index / totalWords;
              const wordEnd = wordStart + overlapWords / totalWords;
              const timelineScale =
                1 /
                Math.min(
                  totalAnimationLength,
                  1 + (totalWords - 1) / totalWords + overlapWords / totalWords,
                );
              const adjustedStart = wordStart * timelineScale;
              const adjustedEnd = wordEnd * timelineScale;
              const duration = adjustedEnd - adjustedStart;

              const wordProgress =
                revealProgress <= adjustedStart
                  ? 0
                  : revealProgress >= adjustedEnd
                    ? 1
                    : (revealProgress - adjustedStart) / duration;

              (word as HTMLElement).style.opacity = wordProgress.toString();

              if (wordText) {
                const textRevealThreshold = 0.9;
                const textRevealProgress =
                  wordProgress >= textRevealThreshold
                    ? (wordProgress - textRevealThreshold) /
                      (1 - textRevealThreshold)
                    : 0;
                wordText.style.opacity = Math.pow(
                  textRevealProgress,
                  0.5,
                ).toString();
              }
            });
          } else {
            const reverseProgress = (progress - 0.7) / 0.3;
            const reverseOverlapWords = isMobile ? 3 : 5;

            words.forEach((word, index) => {
              const wordText = word.querySelector("span") as HTMLElement | null;
              (word as HTMLElement).style.opacity = "1";

              const reverseWordStart = index / totalWords;
              const reverseWordEnd =
                reverseWordStart + reverseOverlapWords / totalWords;
              const reverseTimelineScale =
                1 /
                Math.max(
                  1,
                  (totalWords - 1) / totalWords +
                    reverseOverlapWords / totalWords,
                );
              const reverseAdjustedStart =
                reverseWordStart * reverseTimelineScale;
              const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
              const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;

              const reverseWordProgress =
                reverseProgress <= reverseAdjustedStart
                  ? 0
                  : reverseProgress >= reverseAdjustedEnd
                    ? 1
                    : (reverseProgress - reverseAdjustedStart) /
                      reverseDuration;

              if (wordText) {
                if (reverseWordProgress > 0) {
                  wordText.style.opacity = (
                    1 *
                    (1 - reverseWordProgress)
                  ).toString();
                } else {
                  wordText.style.opacity = "1";
                }
              }
            });

            if (cta) {
              const startY = 100;
              const endY = 0;
              const currentY = startY + (endY - startY) * reverseProgress;
              gsap.set(cta, { y: `${currentY}%` });
            }
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={aboutRef}
      className="about-section anime-text-container relative h-full min-h-screen w-full overflow-hidden bg-[#0e0d09] p-4 text-white md:p-8"
    >
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-2xl text-center lg:rounded-3xl">
        <h1 className="font-primary mb-8 text-3xl leading-tight font-black tracking-tight text-white md:mb-16 md:text-5xl lg:text-3xl">
          About{" "}
          <span className="ml-2 inline-block rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1 text-zinc-100 shadow-lg md:px-6 md:py-2">
            Creative Upaay
          </span>
        </h1>

        <div className="anime-text font-primary w-full max-w-[90vw] space-y-6 text-xl tracking-tight md:max-w-[75vw] md:space-y-8 md:text-3xl lg:max-w-[60vw] lg:text-3xl">
          <p className="text-center leading-snug font-bold md:leading-normal">
            Creative Upaay is a premium digital agency that bridges the gap
            between stunning design and intelligent systems. We don't just build
            websites; we engineer scalable solutions that empower brands to
            thrive.
          </p>
          <p className="text-center leading-snug font-bold md:leading-normal">
            By combining deeply crafted user interfaces with powerful AI agents
            and workflow automations, we create digital experiences that are
            fundamentally transformative. We build for the future.
          </p>
        </div>
      </div>

      {/* Solid Pop CTA Panel */}
      <div
        ref={ctaRef}
        className="cta-panel absolute inset-0 z-20 flex h-full w-full items-center justify-center"
        style={{ backgroundColor: "#D0FF71" }} // Acid Lime/Yellow base for the panel
      >
        <div className="mx-auto flex h-full w-full flex-col items-center justify-center p-6 text-center md:p-12">
          <h1 className="font-primary mb-12 w-full max-w-[90vw] text-4xl leading-tight font-black tracking-tighter text-[#141414] md:mb-20 md:max-w-[80vw] md:text-6xl lg:text-8xl">
            A playground for{" "}
            <span className="mx-2 rounded-lg bg-[#141414] px-4 text-white italic">
              bold
            </span>{" "}
            ideas <br className="hidden md:block" />
            and intelligent interfaces.
          </h1>

          <div className="mb-12 grid w-full max-w-6xl grid-cols-2 gap-8 text-[#141414] md:grid-cols-4 md:gap-12">
            <div className="flex flex-col items-center border-r border-[#141414]/20 last:border-0">
              <h2 className="font-primary mb-2 text-5xl font-black md:text-7xl">
                350+
              </h2>
              <p className="font-secondary text-sm font-bold tracking-widest uppercase opacity-60 md:text-base">
                Projects
              </p>
            </div>

            <div className="flex flex-col items-center border-r border-[#141414]/20 last:border-0">
              <h2 className="font-primary mb-2 text-5xl font-black md:text-7xl">
                2020
              </h2>
              <p className="font-secondary text-sm font-bold tracking-widest uppercase opacity-60 md:text-base">
                Founded
              </p>
            </div>

            <div className="flex flex-col items-center border-r border-[#141414]/20 last:border-0">
              <h2 className="font-primary mb-2 text-5xl font-black md:text-7xl">
                15+
              </h2>
              <p className="font-secondary text-sm font-bold tracking-widest uppercase opacity-60 md:text-base">
                AI Agents
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="font-primary mb-2 text-5xl font-black md:text-7xl">
                100%
              </h2>
              <p className="font-secondary text-sm font-bold tracking-widest uppercase opacity-60 md:text-base">
                Crafted
              </p>
            </div>
          </div>

          <div className="mt-8 w-full text-center">
            <button className="font-secondary mx-auto flex items-center justify-center gap-3 rounded-full bg-[#141414] px-10 py-5 text-xl font-black text-white shadow-xl transition-transform hover:scale-105 active:scale-95">
              Start a Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutReveal;
