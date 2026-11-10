import { Anchor, BedDouble, BookOpenCheck, BriefcaseBusiness, CalendarDays, FileCheck2, GraduationCap, Handshake, Map, Palmtree, Plane, ShieldCheck, Stamp, Trophy } from "lucide-react";

export const services = [
  { icon: Plane, title: "Visa Facilitation", to: "/visa-services", copy: "Professional assistance throughout the visa application process, from understanding requirements to submission and tracking for Corporates, Travel Partners & Travellers." },
  { icon: Handshake, title: "Meet and Assist", to: "/meet-and-assist", copy: "Personalised assistance throughout the visa application process, ensuring a smooth, hassle-free, and seamless experience from submission to completion." },
  { icon: CalendarDays, title: "MICE", to: "/mice", copy: "End-to-end MICE solutions for corporate meetings, incentive trips, conferences, exhibitions and business events" },
  { icon: Stamp, title: "Apostille and Attestation Services", to: "/apostille-attestation", copy: "Comprehensive assistance with Apostille, document attestation, and legalisation procedures, ensuring documents meet the necessary authentication requirements for international use." },
  { icon: ShieldCheck, title: "Travel Insurance", to: "/travel-insurance", copy: "Travel insurance solutions offering financial protection and peace of mind throughout your journey." },
  { icon: BedDouble, title: "Flights and Stay", to: "/flights-and-stay", copy: "End-to-end flight and accommodation arrangements tailored to your travel needs, ensuring comfort, convenience, and seamless travel planning." },
  { icon: Palmtree, title: "Holiday Packages", to: "/holiday-packages", copy: "Curated holiday packages offering seamless travel experiences, personalised itineraries, and memorable journeys worldwide." },
  { icon: BookOpenCheck, title: "Passport Services", to: "/passport-services", copy: "Assistance with applicable passport-related services." },
] as const;

export const visaTypes = [
  { icon: Map, title: "Tourist Visa", copy: "Documentation and application guidance for international holidays and leisure travel." },
  { icon: BriefcaseBusiness, title: "Business Visa", copy: "Support for eligible meetings, conferences, exhibitions, training and corporate visits." },
  { icon: GraduationCap, title: "Student Visa", copy: "Documentation and application guidance for students preparing to study overseas." },
  { icon: FileCheck2, title: "Visa Reapplication", copy: "Review of available refusal information and support preparing a potential future application." },
  { icon: Anchor, title: "Seaman Visa", copy: "Dedicated visa assistance for seafarers joining vessels, transiting internationally, and travelling for maritime assignments worldwide." },
  { icon: Trophy, title: "Sports Visa", copy: "Comprehensive visa and travel support for athletes, sports professionals, officials, judges, and adjudicators participating in international sporting events, tournaments, and competitions." },
];

export const cares = [
  ["C", "Customer First", "Your journey, your needs and your peace of mind come first."],
  ["A", "Accountable", "We take ownership and keep our commitments."],
  ["R", "Reliable", "Dependable guidance, consistent support and clear communication."],
  ["E", "Empathetic", "We listen, understand and support you with care."],
  ["S", "Solution Driven", "We look for practical, compliant and simpler ways forward."],
];

export const caresDetailed = [
  ["C", "Customer First", "Your journey comes first. We put our clients at the centre of every decision and take time to understand their requirements, plans and concerns."],
  ["A", "Accountable", "We take ownership. We believe in responsibility, clear communication and following through on our commitments."],
  ["R", "Reliable", "You can count on us. We strive to provide dependable guidance, accurate information and consistent support at every stage."],
  ["E", "Empathetic", "We understand what the journey means to you. We listen, understand concerns and provide support with patience, respect and care."],
  ["S", "Solution Driven", "We look for better ways forward. We focus on practical, compliant and simpler solutions when navigating visa and documentation processes."],
];

export const whyChoose = [
  ["Specialised visa focus", "Dedicated to visas and travel documentation."],
  ["Professional guidance", "Clear support through the application process."],
  ["Documentation focus", "Attention to completeness, consistency and relevance."],
  ["Structured process", "A systematic approach to each stage."],
  ["Transparent communication", "Keeping clients informed."],
  ["Individual and corporate support", "Services for travellers, businesses and travel partners."],
];

export const destinations = ["Europe", "North & South America", "Asia", "Middle East", "Australia & New Zealand"];

export const faq = [
  ["What does VisaNix do?", "VisaNix provides visa facilitation, documentation assistance, application guidance, Apostille and Attestation support and related travel documentation services."],
  ["Does VisaNix guarantee visa approval?", "No. Visa approval is solely at the discretion of the relevant embassy, consulate or immigration authority. VisaNix does not guarantee visa approval."],
  ["Which countries does VisaNix handle?", "We support a wide range of destinations worldwide, subject to the applicable visa category and service availability."],
  ["Can you help with visa documentation?", "Yes. We provide guidance regarding applicable documentation and assist with organising and reviewing documents."],
  ["Can you help with visa appointments?", "Where appointment procedures apply, we provide guidance and assistance with the relevant process."],
  ["Do you provide Apostille services?", "Yes. VisaNix provides Apostille assistance for applicable documents and destinations."],
  ["Do you provide Attestation services?", "Yes. We provide assistance with applicable document attestation and legalisation procedures."],
  ["Can you assist companies with employee visas?", "Yes. We provide corporate visa facilitation and documentation support for eligible business travellers and employees."],
  ["Can travel agencies partner with VisaNix?", "Yes. VisaNix provides specialised visa and documentation support for travel partners."],
  ["How long does visa processing take?", "Processing times vary by country, visa category, season, application volume and the relevant authority. Processing times are controlled by the respective embassy, consulate or immigration authority."],
  ["Does VisaNix guarantee expedited processing?", "No. Expedited processing is subject to the policies and availability of the relevant authority."],
  ["What happens if my visa is refused?", "We can help you understand the refusal communication and discuss possible next steps. A refusal does not automatically mean that a future application will be successful."],
];

export const disclaimer = "Visa approval is solely at the discretion of the relevant embassy, consulate or immigration authority. VisaNix does not guarantee visa approval, appointment availability or processing timelines.";
// Add real entries here; sections show a "coming soon" note while these are empty.
export const brandsWeWorkWith: { name: string }[] = [];
export const testimonials: { quote: string; name: string; role: string }[] = [];
export const news: { title: string; copy: string }[] = [];
export const featuredProjects: { title: string; copy: string }[] = [];
