import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { ScrollJourney } from "./scroll-journey";

vi.mock("@tanstack/react-router", () => ({ Link: ({ children }: { children: ReactNode }) => <a>{children}</a> }));
vi.mock("@/components/page-primitives", () => ({ Eyebrow: ({ children }: { children: ReactNode }) => <span>{children}</span> }));

describe("Scroll journey media recovery", () => {
  let runFrame: FrameRequestCallback | undefined;
  beforeEach(() => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { runFrame = callback; return 1; });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); runFrame = undefined; });

  function setup() {
    const { container } = render(<ScrollJourney />);
    const video = container.querySelector("video");
    const section = container.querySelector("section");
    if (!video || !section) throw new Error("Journey media missing");
    let progress = .75;
    let ready = 1;
    let seeking = false;
    Object.defineProperties(video, {
      duration: { configurable: true, value: 20 },
      readyState: { configurable: true, get: () => ready },
      seeking: { configurable: true, get: () => seeking },
    });
    Object.defineProperty(section, "offsetHeight", { configurable: true, value: window.innerHeight + 1000 });
    vi.spyOn(section, "getBoundingClientRect").mockImplementation(() => ({ top: -progress * 1000 }) as DOMRect);
    const flush = () => { const callback = runFrame; runFrame = undefined; act(() => { callback?.(0); }); };
    flush();
    return { video, flush, setReady: () => { ready = 4; }, setSeeking: (value: boolean) => { seeking = value; }, setProgress: (value: number) => { progress = value; } };
  }

  it("waits for decoded data then catches up without another scroll", () => {
    const media = setup();
    expect(media.video.currentTime).toBe(0);
    media.setReady();
    fireEvent.loadedData(media.video);
    media.flush();
    expect(media.video.currentTime).toBe(15);
  });

  it("applies the latest reverse-scroll target after a pending seek completes", () => {
    const media = setup();
    media.setReady();
    fireEvent.canPlay(media.video);
    media.flush();
    media.setSeeking(true);
    media.setProgress(.2);
    fireEvent.scroll(window);
    media.flush();
    expect(media.video.currentTime).toBe(15);
    media.setSeeking(false);
    fireEvent.seeked(media.video);
    expect(media.video.currentTime).toBe(4);
  });

  it("keeps the video when one source fails so the browser can try the alternate", () => {
    const media = setup();
    const source = media.video.querySelector("source");
    if (!source) throw new Error("Missing media source");
    fireEvent.error(source);
    expect(media.video.isConnected).toBe(true);
    fireEvent.error(media.video);
    expect(media.video.isConnected).toBe(false);
  });
});