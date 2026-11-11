"use client";

import { useEffect, useState } from "react";

/** Cycles through words with a light CSS slide (no animation library). */
export function RotatingWords({ words, interval = 2800 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span className="rotator">
      <span className="rotator-sizer" aria-hidden="true">{longest}</span>
      <span key={i} className="rotator-word grad-text">{words[i]}</span>
    </span>
  );
}
