import { ArrowRight, Award, BookOpen, CalendarDays, Globe2, Handshake, Lightbulb, Network, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const stats = [
  ['10,000+', 'Researchers', Users], ['100+', 'Countries', Globe2], ['500+', 'Publications', BookOpen], ['50+', 'Partner institutions', Handshake],
];
const pillars = [
  ['Research', 'Collaborate on original challenges.', Network], ['Conferences', 'Join global academic events.', CalendarDays], ['Opportunities', 'Access grants and calls.', Lightbulb], ['Community', 'Connect with researchers.', Users],
];

export default function HomePage() {
  return <div className="home-page">
    <div className="hero-shell">
      <Header />
      <main className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">People · Research · Collaboration · Impact</p>
          <h1>A Global Research Community for a <span>Better Tomorrow</span></h1>
          <p className="hero-description">Connecting researchers, creating opportunities, and advancing knowledge across borders.</p>
          <div className="hero-actions"><Link className="button" to="/join">Join ASMMR <ArrowRight size={18} /></Link><a className="button button--ghost" href="#research"><Search size={17} /> Explore research</a></div>
        </div>
        <div className="globe-scene" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="globe"><span className="land land-a"/><span className="land land-b"/><span className="land land-c"/></div><div className="globe-glow" /></div>
      </main>
      <div className="stats-bar"><div className="container stats-grid">{stats.map(([value,label,Icon]) => <div className="stat" key={label}><Icon/><div><strong>{value}</strong><span>{label}</span></div></div>)}</div></div>
    </div>
    <section className="pillars container" id="research">{pillars.map(([title,text,Icon]) => <article className="pillar" key={title}><div className="pillar-icon"><Icon /></div><h2>{title}</h2><p>{text}</p><a href={`#${title.toLowerCase()}`} aria-label={`Learn about ${title}`}><ArrowRight /></a></article>)}</section>
    <section className="mission-section" id="about"><div className="container mission-grid"><div><p className="eyebrow eyebrow--blue">Built for meaningful impact</p><h2>Ideas grow stronger when researchers connect.</h2></div><div><p>ASMMR brings academics, practitioners, and emerging scholars into one inclusive international network—turning shared inquiry into practical progress.</p><div className="mission-points"><span><Award/>Quality-led</span><span><Globe2/>Globally connected</span><span><Handshake/>Open collaboration</span></div></div></div></section>
    <Footer />
  </div>;
}
