import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';

const links = ['Home', 'About', 'Research', 'Conferences', 'Membership'];

export default function Header({ light = false }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header ${light ? 'site-header--light' : ''}`}>
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="ASMMR home">
          <img src="/asmmr-logo.png" alt="ASMMR" />
        </Link>
        <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link} to={link === 'Home' ? '/' : `/#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
              {link}
            </NavLink>
          ))}
          <a href="/#opportunities" onClick={() => setOpen(false)}>Opportunities</a>
          <button className="icon-button nav-search" aria-label="Search"><Search size={18} /></button>
          <Link className="button button--small" to="/join" onClick={() => setOpen(false)}>Join now</Link>
        </nav>
        <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
