import { ArrowRight, CalendarDays, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ConferencePlaceholderPage({ kind }) {
  const upcoming = kind === 'upcoming';
  const title = upcoming ? 'Upcoming Conferences' : 'Conference Proceedings';
  const Icon = upcoming ? CalendarDays : BookOpen;
  return <div className="conference-page"><Header/><main><section className="conference-hero conference-hero--simple"><div className="container"><p className="conference-eyebrow">Conferences &amp; Events</p><h1>{title}</h1><p>{upcoming ? 'Find the next opportunity to share research and connect.' : 'Explore the research shared at ASMMR conferences.'}</p></div></section><div className="conference-tabs"><div className="container"><Link className={upcoming ? 'is-active' : ''} to="/conferences/upcoming" aria-current={upcoming ? 'page' : undefined}>Upcoming Conferences</Link><Link to="/conferences/previous">Previous Conferences</Link><Link className={!upcoming ? 'is-active' : ''} to="/conferences/proceedings" aria-current={!upcoming ? 'page' : undefined}>Conference Proceedings</Link></div></div><section className="container conference-content"><div className="conference-empty"><Icon size={35}/><h2>{upcoming ? 'New conferences will appear here' : 'Proceedings will appear here'}</h2><p>Details will be added when they are available.</p><Link to="/conferences/previous">Explore Previous Conferences <ArrowRight size={17}/></Link></div></section></main><Footer/></div>;
}
