import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Eyebrow({children}:{children:React.ReactNode}) { return <p className="eyebrow">{children}</p>; }
export function ScriptWord({children}:{children:React.ReactNode}) { return <span className="script-word">{children}</span>; }
export function PageHero({eyebrow,title,accent,copy,image}:{eyebrow:string,title:string,accent?:string,copy:string,image?:string}) {
 return <section className="page-hero"><div className="site-container page-hero-grid"><div className="reveal"><Eyebrow>{eyebrow}</Eyebrow><h1>{title} {accent && <ScriptWord>{accent}</ScriptWord>}</h1><p>{copy}</p></div>{image && <img src={image} alt="" width={800} height={600} />}</div></section>;
}
export function CTA({title="Ready to start your visa journey?",copy="Don't let complicated paperwork stand between you and your destination."}:{title?:string,copy?:string}) {
 return <section className="cta-band"><div className="site-container"><Eyebrow>Visa made effortless.</Eyebrow><h2>{title}</h2><p>{copy}</p><Button asChild variant="hero" size="lg"><Link to="/contact">Get visa assistance <ArrowRight /></Link></Button></div></section>;
}
export function BulletList({items}:{items:string[]}) { return <ul className="check-list">{items.map(x=><li key={x}><CheckCircle2 />{x}</li>)}</ul>; }
export function Meta({title,description}:{title:string,description:string}) { return null; }
export const headMeta = (title:string, description:string) => ({meta:[{title:`${title} — VisaNix`},{name:"description",content:description},{property:"og:title",content:`${title} — VisaNix`},{property:"og:description",content:description},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]});