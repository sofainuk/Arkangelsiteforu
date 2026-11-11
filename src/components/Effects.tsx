"use client";

import { useEffect } from "react";
import { openEnquiry, type FormType } from "@/lib/enquiry";

/**
 * One lightweight controller for the whole page:
 * - reveals elements (.reveal) as they scroll into view
 * - runs looping animations only while their section is on screen ([data-anim])
 * - wires every [data-form] button to the enquiry form
 * - drives the top scroll-progress bar (GPU transform, once per frame)
 */
export function Effects() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            reveal.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

    const live = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle("is-paused", !e.isIntersecting);
    });
    document.querySelectorAll("[data-anim]").forEach((el) => live.observe(el));

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-form]");
      if (!el) return;
      e.preventDefault();
      openEnquiry((el.dataset.form === "institutional" ? "institutional" : "individual") as FormType);
    };
    document.addEventListener("click", onClick);

    const bar = document.getElementById("progress");
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar) bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      reveal.disconnect();
      live.disconnect();
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
