"use client";

import { useEffect, useRef, useState } from "react";
import { localizeDigits, type Locale } from "@/i18n/dictionaries";

/** Counts up once when scrolled into view (requestAnimationFrame, no library). */
export function Counter({ to, suffix = "", lang }: { to: number; suffix?: string; lang: Locale }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        setValue(0);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {localizeDigits(value, lang)}
      {suffix}
    </span>
  );
}
