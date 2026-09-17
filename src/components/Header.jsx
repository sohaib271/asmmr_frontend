import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, Search, X } from 'lucide-react';

const links = ['Home', 'About'];

export default function Header({ light = false }) {
  const [open, setOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [conferencesOpen, setConferencesOpen] = useState(false);
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
          <div className={`nav-dropdown ${conferencesOpen ? 'is-expanded' : ''}`}>
            <button type="button" className="nav-dropdown-trigger" aria-label="Conferences and Events pages" aria-haspopup="true" aria-expanded={conferencesOpen} onClick={() => setConferencesOpen(value => !value)}>
              Conferences &amp; Events <ChevronDown size={15} />
            </button>
            <div className="nav-dropdown-menu">
              <Link to="/conferences/upcoming" onClick={() => { setOpen(false); setConferencesOpen(false); }}>Upcoming Conferences</Link>
              <Link to="/conferences/previous" onClick={() => { setOpen(false); setConferencesOpen(false); }}>Previous Conferences</Link>
              <Link to="/conferences/proceedings" onClick={() => { setOpen(false); setConferencesOpen(false); }}>Conference Proceedings</Link>
            </div>
          </div>
          <div className={`nav-dropdown ${membershipOpen ? 'is-expanded' : ''}`}>
            <button type="button" className="nav-dropdown-trigger" aria-label="Membership pages" aria-haspopup="true" aria-expanded={membershipOpen} onClick={() => setMembershipOpen(value => !value)}>
              Membership <ChevronDown size={15} />
            </button>
            <div className="nav-dropdown-menu">
              <Link to="/membership/network" onClick={() => { setOpen(false); setMembershipOpen(false); }}>Membership Network</Link>
              <Link to="/membership/benefits" onClick={() => { setOpen(false); setMembershipOpen(false); }}>Membership Benefits</Link>
            </div>
          </div>
          <div className={`nav-dropdown ${trainingOpen ? 'is-expanded' : ''}`}>
            <button type="button" className="nav-dropdown-trigger" aria-label="Training and Development pages" aria-haspopup="true" aria-expanded={trainingOpen} onClick={() => setTrainingOpen(value => !value)}>
              Training &amp; Development <ChevronDown size={15} />
            </button>
            <div className="nav-dropdown-menu">
              <Link to="/training/workshops" onClick={() => { setOpen(false); setTrainingOpen(false); }}>Workshops &amp; Trainings</Link>
              <Link to="/training/seminars" onClick={() => { setOpen(false); setTrainingOpen(false); }}>Seminars &amp; Webinars</Link>
            </div>
          </div>
          <div className={`nav-dropdown ${membershipOpen ? 'is-expanded' : ''}`}>
            <button type="button" className="nav-dropdown-trigger" aria-label="Membership pages" aria-haspopup="true" aria-expanded={membershipOpen} onClick={() => setMembershipOpen(value => !value)}>
              Publications <ChevronDown size={15} />
            </button>
            <div className="nav-dropdown-menu">
              <Link to="/publications/journal" onClick={() => { setOpen(false); setMembershipOpen(false); }}>Journal</Link>
              <Link to="/publications/case-studies" onClick={() => { setOpen(false); setMembershipOpen(false); }}>Case Studies</Link>
            </div>
          </div>
          <div className={`nav-dropdown ${conferencesOpen ? 'is-expanded' : ''}`}>
            <button type="button" className="nav-dropdown-trigger" aria-label="Conferences and Events pages" aria-haspopup="true" aria-expanded={conferencesOpen} onClick={() => setConferencesOpen(value => !value)}>
              Resources
            </button>
            <div className="nav-dropdown-menu">
              <Link to="/resources/funding" onClick={() => { setOpen(false); setConferencesOpen(false); }}>Funding & Grants</Link>
              <Link to="/resources/fellowship" onClick={() => { setOpen(false); setConferencesOpen(false); }}>Fellowships</Link>
              <Link to="/resourcesces/scholarship" onClick={() => { setOpen(false); setConferencesOpen(false); }}>Scholarships</Link>
              <Link to="/resourcesces/survey" onClick={() => { setOpen(false); setConferencesOpen(false); }}>Survey Form</Link>
            </div>
          </div>
          <a href="/#contact" onClick={() => setOpen(false)}>Contact</a>
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
