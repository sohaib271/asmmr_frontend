import { ArrowRight, BookOpen, Globe2, Handshake, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const benefits = [
  { icon: Users, title: 'A global research network', description: 'Connect with researchers across disciplines, institutions, and countries.' },
  { icon: Handshake, title: 'Meaningful collaboration', description: 'Meet peers with shared interests and explore opportunities to work together.' },
  { icon: BookOpen, title: 'Research visibility', description: 'Share your expertise and interests through your member profile.' },
  { icon: Globe2, title: 'A wider perspective', description: 'Exchange ideas with an international community focused on research impact.' },
];

export default function MembershipBenefitsPage() {
  return <div className="network-page"><Header/><main className="benefits-page"><section className="benefits-hero container"><p className="network-eyebrow">ASMMR membership</p><h1>Grow your research with a global community.</h1><p>Membership brings researchers together to share ideas, find peers, and build lasting collaborations.</p><Link className="button" to="/join">Join the network <ArrowRight size={18}/></Link></section><section className="benefits-grid container">{benefits.map(({ icon: Icon, title, description }) => <article key={title}><Icon size={28}/><h2>{title}</h2><p>{description}</p></article>)}</section><div className="container benefits-link"><Link to="/membership/network">Explore the Membership Network <ArrowRight size={17}/></Link></div></main><Footer/></div>;
}
