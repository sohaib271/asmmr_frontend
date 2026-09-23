import { BookOpen, CheckCircle2, Clock3, FileText, LogOut, Plus, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const labels = { pending: 'Pending', 'under-review': 'Under review', published: 'Published', rejected: 'Rejected', reviewing: 'Under review', approved: 'Approved', declined: 'Rejected' };
export default function PortalPage() {
  const { user, membership, logout, refresh } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]); const [showForm, setShowForm] = useState(false); const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', type: 'journal', abstract: '', manuscriptUrl: '' });
  const load = () => api('/publications/mine').then(result => setItems(result.data)).catch(issue => setError(issue.message));
  useEffect(() => { load(); refresh(); }, []);
  const submit = async event => { event.preventDefault(); setError(''); try { await api('/publications', { method: 'POST', body: JSON.stringify(form) }); setForm({ title: '', type: 'journal', abstract: '', manuscriptUrl: '' }); setShowForm(false); load(); } catch (issue) { setError(issue.message); } };
  const doLogout = async () => { await logout(); navigate('/'); };
  return <div className="portal-page"><Header light/><main className="portal-shell"><header className="portal-welcome"><div><p className="eyebrow eyebrow--blue">Member portal</p><h1>Welcome, {user.name}</h1><p>{user.email}</p></div><button className="portal-logout" onClick={doLogout}><LogOut/> Sign out</button></header>
    <section className="portal-summary"><article><Clock3/><div><span>Membership</span><strong className={`status-pill status-${membership?.status || 'none'}`}>{membership ? labels[membership.status] : 'Not submitted'}</strong></div></article><article><BookOpen/><div><span>Published work</span><strong>{items.filter(item => item.status === 'published').length}</strong></div></article><article><FileText/><div><span>In review</span><strong>{items.filter(item => ['pending','under-review'].includes(item.status)).length}</strong></div></article></section>
    {!membership && <section className="portal-callout"><div><h2>Complete your membership application</h2><p>Your account is ready. Submit the application to join the ASMMR member network.</p></div><Link className="button" to="/join">Start application</Link></section>}
    {membership?.reviewReason && <section className={`review-note status-${membership.status}`}><strong>Membership review note</strong><p>{membership.reviewReason}</p></section>}
    <section className="portal-section"><div className="portal-section-head"><div><h2>Your publications</h2><p>Track journals and research papers through the review process.</p></div><button className="button button--small" onClick={() => setShowForm(value => !value)}><Plus/> New submission</button></div>
      {showForm && <form className="publication-form" onSubmit={submit}><label>Title<input value={form.title} onChange={e => setForm({...form,title:e.target.value})} required/></label><label>Type<select value={form.type} onChange={e => setForm({...form,type:e.target.value})}><option value="journal">Journal</option><option value="research-paper">Research paper</option></select></label><label className="wide">Abstract<textarea rows="5" maxLength="3000" value={form.abstract} onChange={e => setForm({...form,abstract:e.target.value})} required/></label><label className="wide">Manuscript link <small>(optional)</small><input type="url" value={form.manuscriptUrl} onChange={e => setForm({...form,manuscriptUrl:e.target.value})} placeholder="https://"/></label><button className="button"><Send/> Submit for review</button></form>}
      {error && <p className="auth-error">{error}</p>}<div className="submission-list">{items.length ? items.map(item => <article key={item._id}><div className="submission-icon">{item.status === 'published' ? <CheckCircle2/> : <FileText/>}</div><div><span>{item.type === 'journal' ? 'Journal' : 'Research paper'}</span><h3>{item.title}</h3><p>Submitted {new Date(item.createdAt).toLocaleDateString()}</p>{item.reviewReason && <p className="submission-reason">Reviewer note: {item.reviewReason}</p>}</div><strong className={`status-pill status-${item.status}`}>{labels[item.status]}</strong></article>) : <div className="portal-empty"><BookOpen/><h3>No publications submitted yet</h3><p>Your journals and research papers will appear here.</p></div>}</div>
    </section></main></div>;
}
