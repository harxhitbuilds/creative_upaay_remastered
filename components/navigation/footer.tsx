"use client";

import { gsap } from "gsap";
import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

import { useRef } from "react";

const navLinks = [
  { name: "Home", href: "/", color: "#D0FF71" }, // Pop Lime
  { name: "Services", href: "/#services", color: "#FF9EE6" }, // Pop Pink
  { name: "About", href: "/#about", color: "#B4A1FF" }, // Pop Violet
  { name: "Contact", href: "/contact", color: "#88E5FF" }, // Pop Cyan
];

export default function Footer() {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  return (
    <footer className="w-full border-t border-zinc-800/50 bg-[#0e0d09] px-6 py-12 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* --- Top Section: Big Type & Stats --- */}
        <div className="mb-24 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Agency Brief (Left) */}
          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <h2 className="font-primary mb-2 text-2xl font-black text-white">
                Creative Upaay.
              </h2>
              <p className="font-secondary max-w-xs text-sm leading-relaxed text-zinc-500">
                Engineering intelligent systems and premium digital interfaces
                for the next generation of brands.
              </p>
            </div>

            {/* Location Module */}
            <div className="mt-12">
              <p className="font-tertiary mb-2 text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
                Location
              </p>
              <p className="font-secondary text-white">Udaipur, India</p>
              <p className="font-secondary text-sm text-zinc-500">
                6:40 PM IST
              </p>
            </div>
          </div>

          {/* Massive Navigation (Right) */}
          <div className="lg:col-span-8">
            <p className="font-tertiary mb-6 text-[10px] tracking-[0.2em] text-zinc-600 uppercase lg:text-right">
              Index
            </p>
            <div className="flex flex-col">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  className="group relative flex items-center justify-between overflow-hidden border-b border-zinc-800/50 py-4 transition-all duration-500 hover:px-8"
                  onMouseEnter={() => {
                    gsap.to(linkRefs.current[i], {
                      color: link.color,
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(linkRefs.current[i], {
                      color: "#ffffff",
                      duration: 0.3,
                    });
                  }}
                >
                  <span className="font-primary relative z-10 text-5xl font-black tracking-tighter text-white transition-colors duration-500 md:text-7xl lg:text-2xl">
                    {link.name}
                  </span>
                  <ArrowUpRight className="h-8 w-8 text-zinc-800 transition-all duration-500 group-hover:rotate-45 group-hover:text-current md:h-10 md:w-10" />

                  {/* Hover Slide Background */}
                  <div
                    className="ease-expo absolute inset-0 -z-0 w-0 opacity-10 transition-all duration-700 group-hover:w-full"
                    style={{ backgroundColor: link.color }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Socials & Copyright --- */}
        <div className="flex flex-col items-center justify-between gap-8 border-t border-zinc-800/50 pt-12 md:flex-row">
          {/* Social Grid */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="font-tertiary text-[11px] tracking-widest text-zinc-500 uppercase transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href="#"
              className="font-tertiary text-[11px] tracking-widest text-zinc-500 uppercase transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="font-tertiary text-[11px] tracking-widest text-zinc-500 uppercase transition-colors hover:text-white"
            >
              Twitter
            </a>
            <a
              href="#"
              className="font-tertiary text-[11px] tracking-widest text-zinc-500 uppercase transition-colors hover:text-white"
            >
              Email
            </a>
          </div>

          {/* Legal Bits */}
          <div className="flex flex-col items-center md:items-end">
            <p className="font-tertiary text-[10px] tracking-widest text-zinc-600 uppercase">
              &copy; 2026 Creative Upaay &mdash; All Rights Reserved.
            </p>
            <p className="font-tertiary mt-1 text-[9px] tracking-widest text-zinc-800 uppercase">
              Crafted with Precision by Harshit Parmar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
