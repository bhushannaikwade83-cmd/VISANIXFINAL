import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import logoColor from "@/assets/visanix-logo-mark.png";
import logoWhite from "@/assets/visanix-logo-mark-white.png";

type Item = { to: string; label: string };
type Group = { label: string; to: string; items: Item[] };

const visanixGroup: Group = {
  label: "Visanix", to: "/visanix",
  items: [
    { to: "/visanix", label: "Overview" }, { to: "/visa-services", label: "Visa Facilitation" }, { to: "/meet-and-assist", label: "Meet and Assist" },
    { to: "/apostille-attestation", label: "Apostille & Attestation" }, { to: "/travel-insurance", label: "Travel Insurance" },
    { to: "/passport-services", label: "Passport Services" },
  ],
};
const trouvailleGroup: Group = {
  label: "Trouvaille", to: "/trouvaille",
  items: [{ to: "/trouvaille", label: "Overview" }, { to: "/mice", label: "MICE" }, { to: "/holiday-packages", label: "Holiday Packages" }, { to: "/flights-and-stay", label: "Flights and Stay" }],
};

function Wordmark({ venture = false }: { venture?: boolean }) {
  return <span className={`brand-plate${venture ? " has-venture" : ""}`}>
    <span className="brand-imgs">
      <img src={logoWhite} alt="VisaNix" className="brand-logo" />
      <img src={logoColor} alt="" aria-hidden="true" className="brand-logo is-color" />
    </span>
    {venture && <span className="brand-venture">A venture of <b>Trouvaille</b></span>}
  </span>;
}

function SideGroup({ group, pathname, onNavigate }: { group: Group; pathname: string; onNavigate: () => void }) {
  const active = group.items.some(item => pathname === item.to) || pathname === group.to;
  const [open, setOpen] = useState(active);
  useEffect(() => { if (active) setOpen(true); }, [active]);
  return <div className={`side-group${open ? " is-open" : ""}`}>
    <button type="button" className={`side-link side-toggle${active ? " is-active" : ""}`} aria-expanded={open} onClick={() => setOpen(!open)}>{group.label}<ChevronDown /></button>
    {open && <div className="side-sub">{group.items.map(item => <Link key={item.to} to={item.to} onClick={onNavigate}>{item.label}</Link>)}</div>}
  </div>;
}

function SideNav({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return <nav className="side-nav-list" aria-label="Main navigation">
    <p className="side-nav-title">Menu</p><Link to="/home" className="side-link" onClick={onNavigate}>Home</Link>
    <SideGroup group={visanixGroup} pathname={pathname} onNavigate={onNavigate} />
    <Link to="/destinations" className="side-link" onClick={onNavigate}>Destinations</Link>
    <Link to="/partners" className="side-link" onClick={onNavigate}>Corporate &amp; Travel Partners</Link>
    <SideGroup group={trouvailleGroup} pathname={pathname} onNavigate={onNavigate} />
    <Link to="/about" className="side-link" onClick={onNavigate}>About Us</Link>
    <Link to="/faq" className="side-link" onClick={onNavigate}>FAQ&rsquo;s</Link>
    <Link to="/news" className="side-link" onClick={onNavigate}>News</Link>
    <Link to="/featured-projects" className="side-link" onClick={onNavigate}>Featured Projects</Link>
    <Link to="/contact" className="side-link side-contact" onClick={onNavigate}>Contact Us</Link>
  </nav>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });
  const journey = pathname === "/";
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const close = () => setOpen(false);

  if (journey) {
    return <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-container nav-shell">
        <Link to="/" aria-label="VisaNix home" className="brand-link"><Wordmark venture /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/home">Home</Link>
          <div className="nav-dropdown"><Link to="/visanix">Visanix <ChevronDown /></Link><div className="nav-dropdown-panel">
            {visanixGroup.items.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}
          </div></div>
          <Link to="/destinations">Destinations</Link><Link to="/partners">Partners</Link>
          <div className="nav-dropdown"><Link to="/trouvaille">Trouvaille <ChevronDown /></Link><div className="nav-dropdown-panel">
            {trouvailleGroup.items.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}
          </div></div>
          <Link to="/about">About Us</Link><Link to="/faq">FAQ&rsquo;s</Link>
        </nav>
        <Button asChild variant="hero" size="sm" className="desktop-contact"><Link to="/contact">Contact us</Link></Button>
        <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation"><SideNav pathname={pathname} onNavigate={close} /></nav>}
    </header>;
  }

  return <>
    <Link to="/" aria-label="VisaNix home" className="float-logo"><Wordmark venture /></Link>
    <button type="button" className={`float-menu-btn${open ? " is-hidden" : ""}`} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><span /><span /></button>
    {open && <button type="button" className="side-backdrop" aria-label="Close menu" onClick={close} />}
    <aside className={`side-nav${open ? " is-open" : ""}`} aria-hidden={!open}>
      <SideNav pathname={pathname} onNavigate={close} />
      <button type="button" className="float-menu-btn side-close" aria-label="Close menu" onClick={close}><span /><span /></button>
    </aside>
  </>;
}

export function Footer() {
  return <footer className="footer"><div className="site-container footer-grid">
    <div><Wordmark venture /><p>Professional visa facilitation and travel documentation support.</p><p className="footer-mantra">Plan. Prepare. Travel.</p></div>
    <div><h3>Quick links</h3><Link to="/home">Home</Link><Link to="/visa-services">Visa Facilitation</Link><Link to="/destinations">Destinations</Link><Link to="/partners">Corporate &amp; Travel Partners</Link><Link to="/trouvaille">Trouvaille</Link><Link to="/about">About Us</Link><Link to="/values">Our values / Mission / Vision</Link><Link to="/team">Our team</Link><Link to="/faq">FAQ&rsquo;s</Link><Link to="/news">News</Link><Link to="/featured-projects">Featured Projects</Link><Link to="/contact">Contact us</Link></div>
    <div><h3>Services</h3><Link to="/visa-services">Visa Facilitation</Link><Link to="/meet-and-assist">Meet and Assist</Link><Link to="/mice">MICE</Link><Link to="/apostille-attestation">Apostille &amp; Attestation</Link><Link to="/travel-insurance">Travel Insurance</Link><Link to="/flights-and-stay">Flights and Stay</Link><Link to="/holiday-packages">Holiday Packages</Link><Link to="/passport-services">Passport Services</Link></div>
    <div><h3>Contact</h3><a href="tel:+918591707679">+91 85917 07679</a><a href="mailto:info@visanix.in">info@visanix.in</a><h3 className="footer-sub">Our travel partner</h3><Link to="/trouvaille" className="trouvaille-word">TROUVAILLE</Link><p>Holidays · Flights · Hotels · Insurance · Passport · MICE</p></div>
  </div><div className="site-container legal-copy"><p><strong>Website disclaimer:</strong> VisaNix provides visa facilitation, documentation support and application guidance services. VisaNix is not an Embassy, consulate, immigration authority or government agency. Visa decisions are made solely by the relevant embassy, consulate or immigration authority. Visa requirements, processing times, fees, appointment availability and procedures may change without prior notice. Applicants are responsible for providing complete, accurate and truthful information and documentation. VisaNix does not guarantee visa approval, visa issuance, appointment availability or processing timelines. Any guidance provided by VisaNix is based on the information and documentation available at the time of service and does not guarantee a particular visa outcome.</p></div><div className="site-container footer-base"><span>© 2026 VisaNix</span><span>www.visanix.in · +91 85917 07679 · info@visanix.in</span></div></footer>;
}
