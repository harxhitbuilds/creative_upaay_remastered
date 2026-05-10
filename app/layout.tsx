import type { Metadata } from "next";
import {
  Host_Grotesk,
  IBM_Plex_Mono,
  Plus_Jakarta_Sans,
  PT_Mono,
} from "next/font/google";

import { cn } from "@/lib/utils";
import { LenisProvider } from "@/providers/lenis-provider";
import ThemeProvider from "@/providers/theme.provider";

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

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tertiary",
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
      suppressHydrationWarning
    >
      <body
        className={`${plusJakartaSans.variable} ${hostGrotesk.variable} ${ibmPlexMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <main>{children}</main>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
