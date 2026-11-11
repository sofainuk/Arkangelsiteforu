"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setShow(window.scrollY > 800);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href="#top" className={`to-top${show ? " is-visible" : ""}`} aria-label={label} tabIndex={show ? 0 : -1}>
      <Icon name="up" size={22} strokeWidth={2.2} />
    </a>
  );
}
