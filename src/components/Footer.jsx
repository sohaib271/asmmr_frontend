import { Link } from 'react-router-dom';
import { Link2, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><img className="footer-logo" src="/asmmr-logo.png" alt="ASMMR" /><p>Connecting researchers, creating opportunities, and advancing knowledge across borders.</p></div>
        <div><h3>Explore</h3><a href="/#research">Research</a><a href="/#conferences">Conferences</a><Link to="/join">Membership</Link></div>
        <div><h3>Connect</h3><a href="mailto:hello@asmmr.org"><Mail size={16} /> hello@asmmr.org</a><span><MapPin size={16} /> Global community</span><a href="#linkedin"><Link2 size={16} /> LinkedIn</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} ASMMR. All rights reserved.</span><span>Research without borders.</span></div>
    </footer>
  );
}
