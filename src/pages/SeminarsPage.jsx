import { ArrowRight, Presentation } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function SeminarsPage() {
  return <div className="training-page"><Header/><main><section className="training-hero"><div className="container"><p className="training-eyebrow">Training &amp; Development / Seminars &amp; Webinars</p><h1>Seminars &amp; Webinars</h1><p>Discover talks and online learning from the ASMMR community.</p></div></section><section className="container training-content"><div className="training-empty"><Presentation size={38}/><h2>More events coming soon</h2><p>Seminar and webinar details will appear here as they become available.</p><Link to="/training/workshops">View Workshops &amp; Trainings <ArrowRight size={17}/></Link></div></section></main><Footer/></div>;
}
