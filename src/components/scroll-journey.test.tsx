import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { ScrollJourney } from "./scroll-journey";

vi.mock("@tanstack/react-router", () => ({ Link: ({ children }: { children: ReactNode }) => <a>{children}</a> }));
vi.mock("@/components/page-primitives", () => ({ Eyebrow: ({ children }: { children: ReactNode }) => <span>{children}</span> }));

describe("Scroll journey frame scrubber", () => {
  let runFrame: FrameRequestCallback | undefined;
  beforeEach(() => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { runFrame = callback; return 1; });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({ drawImage: vi.fn() } as unknown as CanvasRenderingContext2D);
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() });
  });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); runFrame = undefined; });

  function setup(fetchImpl: typeof fetch) {
    vi.stubGlobal("fetch", fetchImpl);
    const { container } = render(<ScrollJourney />);
    const section = container.querySelector("section");
    if (!section) throw new Error("Journey section missing");
    let progress = 0;
    Object.defineProperty(section, "offsetHeight", { configurable: true, value: window.innerHeight + 1000 });
    vi.spyOn(section, "getBoundingClientRect").mockImplementation(() => ({ top: -progress * 1000 }) as DOMRect);
    const flush = () => { const callback = runFrame; runFrame = undefined; act(() => { callback?.(16); }); };
    return { container, section, flush, setProgress: (value: number) => { progress = value; } };
  }

  it("renders a canvas and publishes scroll progress with the matching chapter caption", () => {
    const media = setup(vi.fn().mockResolvedValue(new Response(new Blob(["x"]))));
    expect(media.container.querySelector("canvas")).not.toBeNull();
    expect(media.container.querySelector("video")).toBeNull();
    media.setProgress(.5);
    media.flush();
    expect(media.section.dataset["progress"]).toBe("0.5");
    expect(media.container.querySelector(".journey-caption.is-active")?.textContent).toContain("Chapter 04");
  });

  it("falls back to the poster image when the first frame cannot load", async () => {
    const media = setup(vi.fn().mockRejectedValue(new Error("offline")));
    await act(async () => { await Promise.resolve(); await Promise.resolve(); });
    expect(media.container.querySelector("canvas")).toBeNull();
    expect(media.container.querySelector("img.journey-film")).not.toBeNull();
  });
});
