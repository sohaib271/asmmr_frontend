import { ArrowRight, Globe2, MapPin, Search, Users, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getMembers, memberPhotoUrl } from '../services/membershipService';

function MemberPhoto({ member }) {
  const [failed, setFailed] = useState(false);
  const initials = (member.fullName || '').split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  return <div className="network-avatar">
    {member.profilePicture && !failed
      ? <img src={memberPhotoUrl(member.profilePicture)} alt={member.fullName} onError={() => setFailed(true)} />
      : <span aria-hidden="true">{initials || '?'}</span>}
  </div>;
}

export default function MembershipNetworkPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [designation, setDesignation] = useState('');
  const [country, setCountry] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    getMembers({ signal: controller.signal })
      .then(setMembers)
      .catch(err => { if (err.name !== 'AbortError') setError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = event => { if (event.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  const designations = useMemo(() => [...new Set(members.map(member => member.designation).filter(Boolean))].sort(), [members]);
  const countries = useMemo(() => [...new Set(members.map(member => member.country).filter(Boolean))].sort(), [members]);
  const filtered = useMemo(() => members.filter(member => {
    const query = search.trim().toLowerCase();
    const text = [member.fullName, member.institution, member.country, ...(member.interests || [])].join(' ').toLowerCase();
    return (!query || text.includes(query)) && (!designation || member.designation === designation) && (!country || member.country === country);
  }), [members, search, designation, country]);

  return <div className="network-page">
    <Header />
    <main>
      <section className="network-hero">
        <div className="container network-hero-inner">
          <div className="network-hero-copy">
            <p className="network-eyebrow">Researcher network</p>
            <h1>Connect. Collaborate. <span>Grow.</span></h1>
            <p>Discover researchers from around the world and build meaningful collaborations.</p>
          </div>
          <div className="network-globe" aria-hidden="true"><Globe2 /><i className="network-dot dot-one"/><i className="network-dot dot-two"/><i className="network-dot dot-three"/></div>
        </div>
      </section>
      <section className="network-content container" aria-label="Member directory">
        <div className="network-filters">
          <label className="network-search"><Search size={18}/><span className="sr-only">Search members</span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search by name, institution, or research area..." /></label>
          <label className="network-select"><span className="sr-only">Filter by designation</span><select value={designation} onChange={event => setDesignation(event.target.value)}><option value="">All designations</option>{designations.map(item => <option key={item}>{item}</option>)}</select></label>
          <label className="network-select"><span className="sr-only">Filter by country</span><select value={country} onChange={event => setCountry(event.target.value)}><option value="">All countries</option>{countries.map(item => <option key={item}>{item}</option>)}</select></label>
        </div>
        {loading && <p className="network-state" role="status">Loading members...</p>}
        {!loading && error && <p className="network-state network-state--error" role="alert">{error}</p>}
        {!loading && !error && <>
          <p className="network-count">{filtered.length} {filtered.length === 1 ? 'member' : 'members'} found</p>
          {filtered.length ? <div className="network-grid">{filtered.map(member => <article className="network-card" key={member._id}>
            <MemberPhoto member={member}/>
            <h2>{member.fullName}</h2>
            <p className="network-role">{member.designation}</p>
            <p className="network-institution">{member.institution}</p>
            <p className="network-location"><MapPin size={13}/>{member.country}</p>
            <div className="network-tags">{(member.interests || []).slice(0, 2).map(interest => <span key={interest}>{interest}</span>)}</div>
            <button className="network-profile-button" onClick={() => setSelected(member)}>View Profile</button>
          </article>)}</div> : <p className="network-state">{members.length ? 'No members match your search. Try another filter.' : 'No approved members are listed yet. Check back soon.'}</p>}
        </>}
        <Link className="network-join" to="/join"><span className="network-join-icon"><Users size={30}/></span><span><strong>Join the ASMMR Researcher Network</strong><small>Showcase your work and connect with global researchers.</small></span><span className="network-join-arrow"><ArrowRight size={21}/></span></Link>
      </section>
    </main>
    <Footer />
    {selected && <div className="network-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}><section className="network-modal" role="dialog" aria-modal="true" aria-labelledby="member-profile-title"><button className="network-modal-close" onClick={() => setSelected(null)} aria-label="Close profile"><X/></button><MemberPhoto member={selected}/><p className="network-eyebrow">Researcher profile</p><h2 id="member-profile-title">{selected.fullName}</h2><p>{selected.designation} · {selected.institution}</p><p className="network-location"><MapPin size={15}/>{selected.country}</p>{selected.contribution && <div className="network-modal-section"><h3>About their research</h3><p>{selected.contribution}</p></div>}{selected.interests?.length > 0 && <div className="network-modal-section"><h3>Research interests</h3><div className="network-tags">{selected.interests.map(interest => <span key={interest}>{interest}</span>)}</div></div>}</section></div>}
  </div>;
}
