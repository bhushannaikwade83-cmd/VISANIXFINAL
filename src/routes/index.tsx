import { createFileRoute } from "@tanstack/react-router";
import { ScrollJourney } from "@/components/scroll-journey";
import { headMeta } from "@/components/page-primitives";

export const Route = createFileRoute("/")({
  head: () => headMeta("Your Visa Journey", "Experience the VisaNix travel journey and explore professional visa facilitation and documentation support."),
  component: JourneyPage,
});

function JourneyPage() { return <ScrollJourney />; }
