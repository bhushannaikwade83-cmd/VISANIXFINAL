import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/page-primitives";
import journey from "@/assets/visanix-journey.webm.asset.json";
import journeyMp4 from "@/assets/visanix-journey.mp4.asset.json";
import poster from "@/assets/visanix-journey-poster.jpg.asset.json";

const chapters = [
  { start: .3, end: 2.1, tag: "Chapter 01 — The Dream", heading: "Your Journey Starts Here." },
  { start: 2.5, end: 3.6, tag: "Chapter 02 — Meet VisaNix", heading: "Expert Guidance, From Hello." },
  { start: 4, end: 7.9, tag: "Chapter 03 — Documents", heading: "Every Paper, Perfectly in Place." },
  { start: 8.4, end: 10.1, tag: "Chapter 04 — The Decision", heading: "The Moment Everything Changes." },
  { start: 10.4, end: 11.6, tag: "Chapter 05 — Departure", heading: "Wheels Up." },
  { start: 12.1, end: 13.6, tag: "Chapter 06 — VisaNix", heading: "Start Your Global Journey." },
];

export function ScrollJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [chapter, setChapter] = useState(-1);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let progress = 0;
    let disposed = false;
    const seek = () => {
      if (disposed || video.readyState < 2 || !Number.isFinite(video.duration) || video.seeking) return;
      const target = reduced.matches ? 0 : progress * video.duration;
      const time = Math.min(target, Math.max(0, video.duration - 1 / 24));
      if (Math.abs(video.currentTime - time) > 1 / 48) {
        // A browser can temporarily reject a seek while new media data arrives.
        // Keep the latest scroll position and retry on the next readiness event.
        try { video.currentTime = time; } catch { /* Retried when media is ready. */ }
      }
    };
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      progress = Math.max(0, Math.min(1, -rect.top / distance));
      const target = reduced.matches ? 0 : progress * (Number.isFinite(video.duration) ? video.duration : 18.25);
      section.dataset["progress"] = String(progress);
      setChapter(reduced.matches ? -1 : chapters.findIndex(c => target >= c.start && target < c.end));
      seek();
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const readinessEvents = ["loadedmetadata", "loadeddata", "canplay", "progress"];
    readinessEvents.forEach(event => video.addEventListener(event, schedule));
    video.addEventListener("seeked", seek);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener("change", schedule);
    schedule();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      readinessEvents.forEach(event => video.removeEventListener(event, schedule));
      video.removeEventListener("seeked", seek);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      document.removeEventListener("visibilitychange", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return <>
    <section ref={sectionRef} className="scroll-journey" aria-label="The VisaNix journey, start to finish">
      <div className="journey-stage">
        {failed ? <img className="journey-film" src={poster.url} alt="VisaNix animated travel journey" /> :
          <video ref={videoRef} className="journey-film" poster={poster.url} muted playsInline preload="auto" onError={event => { if (event.target === event.currentTarget) setFailed(true); }} aria-label="Animated traveller meeting a visa consultant and preparing travel documents">
            <source src={journeyMp4.url} type="video/mp4" />
            <source src={journey.url} type="video/webm" />
          </video>}
        <div className="journey-shade" />
        {chapters.map((c, index) => <div key={c.tag} className={`journey-caption${chapter === index ? " is-active" : ""}`} aria-hidden={chapter !== index}>
          <span>{c.tag}</span><h2>{c.heading}</h2>
        </div>)}
        <h1 className="sr-only">VisaNix — Your Visa Journey</h1>
        <p className="journey-disclaimer">Illustrative journey. Visa approval is solely at the relevant authority’s discretion.</p>
        <Button asChild variant="hero" size="sm" className="journey-explore"><Link to="/home">Explore Full Website <ArrowRight /></Link></Button>
      </div>
    </section>
    <section className="journey-closing">
      <div className="site-container center-copy">
        <Eyebrow>VisaNix · Visa made effortless.</Eyebrow>
        <h2>Start Your Global Journey Today</h2>
        <p>Professional visa facilitation and documentation support for your next destination.</p>
        <div className="button-row">
          <Button asChild variant="hero" size="lg"><Link to="/contact">Book Consultation <ArrowRight /></Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/contact">Apply Now</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/home">Explore Full Website <ArrowRight /></Link></Button>
        </div>
      </div>
    </section>
  </>;
}
