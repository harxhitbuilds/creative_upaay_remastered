"use client";

import { useEffect, useState } from "react";

export default function NavFooter() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();

      const formattedTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setTime(`${formattedTime} IST`);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="pointer-events-none fixed bottom-0 left-0 z-40 flex w-full flex-col items-center justify-between gap-4 px-16 py-6 mix-blend-difference md:flex-row md:gap-0">
      <p className="font-tertiary text-xs tracking-widest text-zinc-400 uppercase md:text-xs">
        We craft bold design & clean Webflow
      </p>

      <div className="font-tertiary flex items-center gap-3 text-xs tracking-widest text-zinc-400 uppercase md:gap-6 md:text-xs">
        <p>Udaipur, Rajasthan</p>

        <span className="hidden h-1 w-1 rounded-full bg-zinc-400 md:inline-block"></span>

        <p className="min-w-[120px] text-left tabular-nums">
          {mounted ? time : "--:--:-- -- IST"}
        </p>
      </div>
    </nav>
  );
}
