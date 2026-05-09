import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Host_Grotesk } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: {
    default: "Creative Upaay — Design, AI Agents & Workflow Automation",
    template: "%s — Creative Upaay",
  },
  description:
    "Creative Upaay builds premium web experiences powered by AI agents, workflow automations, and smart system solutions.",
  applicationName: "Creative Upaay",
  keywords: [
    "Creative Upaay",
    "AI agents",
    "workflow automation",
    "web design",
    "web apps",
    "product design",
    "smart systems",
  ],
  metadataBase: new URL("https://creativeupaay.com"),
  openGraph: {
    type: "website",
    title: "Creative Upaay — Beautiful Design Meets Intelligent Automation",
    description:
      "We build stunning digital experiences powered by AI agents and smart systems to scale your business.",
    siteName: "Creative Upaay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Upaay — Design + AI Automation",
    description:
      "Premium web experiences powered by AI agents and workflow automations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-secondary",
        plusJakartaSans.variable,
        hostGrotesk.variable,
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
