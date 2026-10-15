import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/visanix-logo.png";

const links = [
  ["/values", "Values"], ["/about", "About"], ["/visa-services", "Visa Services"],
  ["/destinations", "Destinations"], ["/apostille-attestation", "Apostille"],
  ["/partners", "Partners"], ["/trouvaille", "Trouvaille"], ["/faq", "FAQ"], ["/team", "Team"],
] as const;

function Wordmark() {
  return <img src={logoImage} alt="VisaNix" className="brand-logo" />;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
    <div className="site-container nav-shell">
      <Link to="/" aria-label="VisaNix home" className="brand-link"><Wordmark /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link to="/home" activeOptions={{ exact: true }}>Home</Link>
        <Link to="/values">Values</Link><Link to="/about">About</Link>
        <div className="nav-dropdown"><Link to="/visa-services">Services <ChevronDown /></Link><div className="nav-dropdown-panel">
          <Link to="/visa-services">Visa Services</Link><Link to="/apostille-attestation">Apostille & Attestation</Link><Link to="/partners">Corporate & Travel Partners</Link>
        </div></div>
        <Link to="/destinations">Destinations</Link><Link to="/trouvaille">Trouvaille</Link><Link to="/faq">FAQ</Link><Link to="/team">Team</Link>
      </nav>
      <Button asChild variant="hero" size="sm" className="desktop-contact"><Link to="/contact">Contact us</Link></Button>
      <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation"><Link to="/home" onClick={() => setOpen(false)}>Home</Link>{links.map(([to,label])=><Link key={to} to={to} onClick={() => setOpen(false)}>{label}</Link>)}<Link to="/contact" onClick={() => setOpen(false)}>Contact us</Link></nav>}
  </header>;
}

export function Footer() {
  return <footer className="footer"><div className="site-container footer-grid">
    <div><Wordmark /><p>Professional visa facilitation and travel documentation support.</p><p className="footer-mantra">Plan. Prepare. Travel.</p></div>
    <div><h3>Quick links</h3><Link to="/home">Home</Link><Link to="/values">Our values / Mission / Vision</Link><Link to="/about">About us</Link><Link to="/visa-services">Visa services</Link><Link to="/destinations">Destinations</Link><Link to="/apostille-attestation">Apostille & Attestation</Link><Link to="/partners">Corporate & Travel Partners</Link><Link to="/trouvaille">Trouvaille</Link><Link to="/faq">FAQ</Link><Link to="/team">Our team</Link><Link to="/contact">Contact us</Link></div>
    <div><h3>Services</h3><Link to="/visa-services">Visa facilitation</Link><Link to="/visa-services">Visa documentation</Link><Link to="/visa-services">Visa application assistance</Link><Link to="/apostille-attestation">Apostille</Link><Link to="/apostille-attestation">Attestation</Link><Link to="/partners">Corporate visa services</Link><Link to="/partners">Travel partner support</Link></div>
    <div><h3>Our travel partner</h3><Link to="/trouvaille" className="trouvaille-word">TROUVAILLE</Link><p>Holidays · Flights · Hotels · Insurance · Passport · MICE</p></div>
  </div><div className="site-container legal-copy"><p><strong>Website disclaimer:</strong> VisaNix provides visa facilitation, documentation support and application guidance services. VisaNix is not an Embassy, consulate, immigration authority or government agency. Visa decisions are made solely by the relevant embassy, consulate or immigration authority. Visa requirements, processing times, fees, appointment availability and procedures may change without prior notice. Applicants are responsible for providing complete, accurate and truthful information and documentation. VisaNix does not guarantee visa approval, visa issuance, appointment availability or processing timelines. Any guidance provided by VisaNix is based on the information and documentation available at the time of service and does not guarantee a particular visa outcome.</p></div><div className="site-container footer-base"><span>© 2026 VisaNix</span><span>www.visanix.in · info@visanix.in</span></div></footer>;
}