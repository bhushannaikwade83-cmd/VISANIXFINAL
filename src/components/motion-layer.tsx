import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

const revealSelector = [
  ".section-heading",
  ".two-copy > article",
  ".story-copy",
  ".story-image",
  ".metrics-grid > div",
  ".service-row",
  ".cares-grid > article",
  ".principles > article",
  ".feature-grid > article",
  ".region-list > article",
  ".brand-bridge .site-container > div",
  ".center-copy",
  ".notice .site-container > *",
  ".contact-grid > *",
  ".faq-wrap > *",
  ".cta-band .site-container > *",
  ".footer-grid > div",
].join(",");

export function MotionLayer() {
  const location = useLocation();

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

      elements.forEach((element, index) => {
        element.classList.add("motion-reveal");
        element.dataset["motionOrder"] = String((index % 5) + 1);
      });

      if (reduced || !("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -10%", threshold: 0.08 },
      );

      elements.forEach((element) => observer?.observe(element));
    }, 250);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return <div key={location.pathname} className="route-veil" aria-hidden="true" />;
}