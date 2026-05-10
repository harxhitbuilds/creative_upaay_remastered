"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import ModeToggleButton from "../themes/mode-toggle";

const menuLinks = [
  { title: "Home", href: "/" },
  { title: "Our Services", href: "/services" },
  { title: "Our Works", href: "/works" },
  { title: "Blogs", href: "/blogs" },
];

const interests = ["Design", "Webflow development", "Full package"];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTalkOpen, setIsTalkOpen] = useState(false);
  const [activeInterest, setActiveInterest] = useState("Design");

  const menuShutterRef = useRef<HTMLDivElement>(null);
  const talkShutterRef = useRef<HTMLDivElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  const talkTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    menuTimeline.current = gsap
      .timeline({ paused: true })
      .to(menuShutterRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
      })
      .to(
        ".menu-text-reveal",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4",
      );

    talkTimeline.current = gsap
      .timeline({ paused: true })
      .to(talkShutterRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
      })
      .to(
        ".talk-text-reveal",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.4",
      );

    return () => {
      menuTimeline.current?.kill();
      talkTimeline.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) menuTimeline.current?.play();
    else menuTimeline.current?.reverse();
  }, [isMenuOpen]);

  useEffect(() => {
    if (isTalkOpen) talkTimeline.current?.play();
    else talkTimeline.current?.reverse();
  }, [isTalkOpen]);

  const isOverlayOpen = isMenuOpen || isTalkOpen;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 flex w-full items-center justify-between px-16 py-6 transition-all duration-500 ease-in-out",
          isOverlayOpen
            ? "pointer-events-none -translate-y-10 opacity-0"
            : "translate-y-0 opacity-100",
        )}
      >
        <div className="flex items-center gap-24">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Creative Upaay Logo"
              width={110}
              height={50}
              className="object-contain"
            />
          </Link>
          <ModeToggleButton />
        </div>

        <div className="flex items-center gap-16">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="font-tertiary text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase transition-colors duration-300"
          >
            Menu
          </button>

          <button
            onClick={() => setIsTalkOpen(true)}
            className="font-tertiary text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase transition-colors duration-300"
          >
            Let's Talk
          </button>
        </div>
      </nav>

      <div
        ref={menuShutterRef}
        className="fixed top-0 left-0 z-[60] flex h-screen w-full -translate-y-full flex-col items-center justify-center bg-[#0e0d09]"
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="font-tertiary absolute top-6 right-16 text-sm tracking-widest text-zinc-400 uppercase transition-colors duration-300 hover:text-white"
        >
          Close
        </button>

        <div className="flex flex-col items-center gap-4">
          {menuLinks.map((link, index) => (
            <div key={index} className="overflow-hidden p-2">
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="menu-text-reveal font-primary block translate-y-full text-6xl font-bold tracking-tighter text-white uppercase opacity-0 transition-all duration-300 hover:italic md:text-8xl lg:text-9xl"
                style={{ transformOrigin: "bottom left" }}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={talkShutterRef}
        className="bg-background text-foreground fixed top-0 left-0 z-[60] flex h-screen w-full -translate-y-full flex-col overflow-y-auto pb-24"
      >
        <button
          onClick={() => setIsTalkOpen(false)}
          className="font-tertiary text-muted-foreground hover:text-foreground absolute top-6 right-16 z-10 text-sm tracking-widest uppercase transition-colors duration-300"
        >
          Close
        </button>

        <div className="max-w-8xl mx-auto mt-24 grid w-full flex-1 grid-cols-1 gap-16 px-8 md:px-16 lg:grid-cols-2 lg:gap-8">
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-2">
              <div className="overflow-hidden">
                <h2 className="talk-text-reveal font-primary translate-y-full text-6xl leading-[0.85] font-extrabold tracking-tighter uppercase opacity-0 md:text-8xl lg:text-9xl">
                  Let's Work
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="talk-text-reveal font-primary translate-y-full text-6xl leading-[0.85] font-extrabold tracking-tighter uppercase opacity-0 md:text-8xl lg:text-9xl">
                  Together
                </h2>
              </div>
            </div>

            <div className="mt-12 hidden overflow-hidden md:block lg:mt-0">
              <p className="talk-text-reveal font-secondary text-muted-foreground translate-y-[100%] text-2xl leading-tight opacity-0 md:text-4xl">
                We think craft <br /> & design
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="overflow-hidden">
              <div className="talk-text-reveal border-border flex translate-y-full flex-col gap-2 border-b pb-4 opacity-0">
                <label className="font-tertiary text-muted-foreground text-sm tracking-widest uppercase">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Creative Upaay"
                  className="font-secondary placeholder:text-foreground/20 bg-transparent text-3xl font-bold outline-none md:text-5xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="overflow-hidden">
                <div className="talk-text-reveal border-border flex translate-y-full flex-col gap-2 border-b pb-4 opacity-0">
                  <label className="font-tertiary text-muted-foreground text-sm tracking-widest uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="hello@agency.com"
                    className="font-secondary placeholder:text-foreground/20 bg-transparent text-2xl outline-none md:text-3xl"
                  />
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="talk-text-reveal border-border flex translate-y-full flex-col gap-2 border-b pb-4 opacity-0">
                  <label className="font-tertiary text-muted-foreground text-sm tracking-widest uppercase">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 000 000 0000"
                    className="font-secondary placeholder:text-foreground/20 bg-transparent text-2xl outline-none md:text-3xl"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="talk-text-reveal flex translate-y-full flex-col gap-4 opacity-0">
                <label className="font-tertiary text-muted-foreground text-sm tracking-widest uppercase">
                  Interest
                </label>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => setActiveInterest(interest)}
                      className={cn(
                        "font-secondary rounded-full border px-6 py-3 text-sm transition-all duration-300",
                        activeInterest === interest
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                      )}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="talk-text-reveal border-border flex translate-y-full flex-col gap-2 border-b pb-4 opacity-0">
                <label className="font-tertiary text-muted-foreground text-sm tracking-widest uppercase">
                  Message
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your project..."
                  className="font-secondary placeholder:text-foreground/20 mt-2 resize-none bg-transparent text-2xl outline-none md:text-3xl"
                />
              </div>
            </div>

            <div className="mt-4 overflow-hidden">
              <div className="talk-text-reveal flex translate-y-full flex-col-reverse justify-between gap-6 opacity-0 md:flex-row md:items-center">
                <p className="font-tertiary text-muted-foreground max-w-[250px] text-xs leading-relaxed">
                  By clicking on "Send", you accept our policy.
                </p>
                <button className="font-primary hover:border-foreground border-b-2 border-transparent pb-1 text-3xl font-bold transition-all duration-300 hover:italic md:text-5xl">
                  Send Message ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
