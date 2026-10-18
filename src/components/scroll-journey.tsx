import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/page-primitives";
import poster from "@/assets/visanix-journey-poster.jpg.asset.json";

const chapters = [
  { start: .3, end: 2.1, tag: "Chapter 01 — The Dream", heading: "Your Journey Starts Here." },
  { start: 2.5, end: 3.6, tag: "Chapter 02 — Meet VisaNix", heading: "Expert Guidance, From Hello." },
  { start: 4, end: 7.9, tag: "Chapter 03 — Documents", heading: "Every Paper, Perfectly in Place." },
  { start: 8.4, end: 10.1, tag: "Chapter 04 — The Decision", heading: "The Moment Everything Changes." },
  { start: 10.4, end: 11.6, tag: "Chapter 05 — Departure", heading: "Wheels Up." },
  { start: 12.1, end: 13.6, tag: "Chapter 06 — VisaNix", heading: "Start Your Global Journey." },
];

const FRAME_COUNT = 219;
const DURATION = 18.25;
const KEEP = 90;
const AHEAD = 24;
const frameUrl = (i: number) => `/frames/journey/f_${String(i + 1).padStart(4, "0")}.webp`;

export function ScrollJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chapter, setChapter] = useState(-1);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const blobs: (Blob | undefined)[] = new Array(FRAME_COUNT);
    const pending = new Set<number>();
    const bitmaps = new Map<number, ImageBitmap>();
    const decoding = new Set<number>();
    let disposed = false;
    let raf = 0;
    let progress = 0;
    let smooth = 0;
    let dir = 1;
    let shown = -1;
    let last = performance.now();
    let lastChapter = -2;

    const fetchBlob = async (i: number) => {
      if (blobs[i] || pending.has(i)) return;
      pending.add(i);
      try {
        const res = await fetch(frameUrl(i));
        if (!res.ok) throw new Error(String(res.status));
        blobs[i] = await res.blob();
      } catch {
        if (i === 0 && !disposed) setFailed(true);
      } finally { pending.delete(i); }
    };
    const decode = async (i: number) => {
      if (bitmaps.has(i) || decoding.has(i)) return;
      if (!blobs[i]) { void fetchBlob(i); return; }
      decoding.add(i);
      try {
        const bitmap = await createImageBitmap(blobs[i]!);
        if (disposed) bitmap.close(); else bitmaps.set(i, bitmap);
      } catch { /* retried on the next tick */ }
      decoding.delete(i);
    };
    const nearest = (i: number) => {
      if (bitmaps.has(i)) return i;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (bitmaps.has(i - d)) return i - d;
        if (bitmaps.has(i + d)) return i + d;
      }
      return -1;
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      shown = -1;
    };
    const draw = (i: number) => {
      const j = nearest(i);
      if (j < 0) return;
      const bmp = bitmaps.get(j)!;
      const s = Math.max(canvas.width / bmp.width, canvas.height / bmp.height);
      const w = bmp.width * s, h = bmp.height * s;
      ctx.drawImage(bmp, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      shown = j;
    };
    const readProgress = () => {
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      return Math.max(0, Math.min(1, -section.getBoundingClientRect().top / distance));
    };
    const tick = (now: number) => {
      raf = window.requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, .5) || .016;
      last = now;
      const next = reduced.matches ? 0 : readProgress();
      if (next !== progress) dir = next >= progress ? 1 : -1;
      progress = next;
      section.dataset["progress"] = String(progress);
      const seconds = progress * DURATION;
      const active = reduced.matches ? -1 : chapters.findIndex(c => seconds >= c.start && seconds < c.end);
      if (active !== lastChapter) { lastChapter = active; setChapter(active); }
      const target = progress * (FRAME_COUNT - 1);
      smooth += (target - smooth) * (1 - Math.exp(-dt * 14));
      if (Math.abs(target - smooth) < .5) smooth = target;
      const i = Math.round(smooth);
      for (let d = 0; d <= AHEAD; d++) {
        const ahead = i + d * dir, behind = i - Math.min(d, 6) * dir;
        if (ahead >= 0 && ahead < FRAME_COUNT) void decode(ahead);
        if (behind >= 0 && behind < FRAME_COUNT) void decode(behind);
      }
      if (bitmaps.size > KEEP * 2) {
        for (const [index, bitmap] of bitmaps) if (Math.abs(index - i) > KEEP) { bitmap.close(); bitmaps.delete(index); }
      }
      if (i !== shown || shown === -1) draw(i);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(tick);
    void (async () => {
      const eager = Array.from({ length: 30 }, (_, i) => fetchBlob(i));
      await Promise.all(eager);
      let next = 30;
      await Promise.all(Array.from({ length: 4 }, async () => {
        while (!disposed && next < FRAME_COUNT) await fetchBlob(next++);
      }));
    })();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      bitmaps.forEach(bitmap => bitmap.close());
      bitmaps.clear();
    };
  }, []);
  return <>
    <section ref={sectionRef} className="scroll-journey" aria-label="The VisaNix journey, start to finish">
      <div className="journey-stage">
        {failed
          ? <img className="journey-film" src={poster.url} alt="VisaNix animated travel journey" />
          : <canvas ref={canvasRef} className="journey-film" role="img" style={{ backgroundImage: `url(${poster.url})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-label="Animated traveller meeting a visa consultant and preparing travel documents" />}
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
