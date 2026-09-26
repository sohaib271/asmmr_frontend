import { Download, FileCheck2, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { API_URL, api } from '../services/api';

const labels = { pending: 'Pending', 'under-review': 'Under review', approved: 'Approved', rejected: 'Rejected', 'revision-requested': 'Revision requested' };
export default function ReviewerPortalPage() {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  const [items, setItems] = useState([]); const [notes, setNotes] = useState({}); const [error, setError] = useState(''); const [saving, setSaving] = useState('');
  const load = () => api('/reviewer/assignments').then(result => setItems(result.data)).catch(issue => setError(issue.message));
  useEffect(() => { load(); }, []);
  const decide = async (item, status) => { const reason = (notes[item._id] || '').trim(); if (status !== 'approved' && !reason) { setError('Add a reason or suggested improvements before returning the paper.'); return; } setSaving(item._id); setError(''); try { await api(`/reviewer/publications/${item._id}/decision`, { method: 'PATCH', body: JSON.stringify({ status, reason }) }); await load(); } catch (issue) { setError(issue.message); } finally { setSaving(''); } };
  const doLogout = async () => { await logout(); navigate('/'); };
  return <div className="portal-page"><Header light/><main className="portal-shell"><header className="portal-welcome"><div><p className="eyebrow eyebrow--blue">Reviewer portal</p><h1>Assigned manuscripts</h1><p>{user.name} · {user.email}</p></div><button className="portal-logout" onClick={doLogout}><LogOut/> Sign out</button></header>
    {error && <p className="auth-error">{error}</p>}<section className="reviewer-list">{items.map(item => <article key={item._id}><div className="reviewer-paper-head"><div><span>{item.type === 'journal' ? 'Journal' : 'Research paper'} · Version {item.version}</span><h2>{item.title}</h2><p>Submitted by {item.user?.name} ({item.user?.email})</p></div><strong className={`status-pill status-${item.status}`}>{labels[item.status]}</strong></div><p className="reviewer-abstract">{item.abstract}</p><a className="admin-document-link" href={`${API_URL}/publications/${item._id}/manuscript`} target="_blank" rel="noreferrer"><Download/> Download manuscript</a><label>Reason or suggested improvements<textarea rows="4" maxLength="1000" value={notes[item._id] || ''} onChange={event => setNotes({...notes, [item._id]: event.target.value})} placeholder="Required when rejecting or requesting a revision"/></label><div className="reviewer-decisions"><button disabled={saving === item._id} onClick={() => decide(item, 'approved')}>Approve</button><button disabled={saving === item._id} onClick={() => decide(item, 'revision-requested')}>Request improvements</button><button disabled={saving === item._id} onClick={() => decide(item, 'rejected')}>Reject</button></div></article>)}{!items.length && <div className="portal-empty"><FileCheck2/><h3>No manuscripts assigned</h3><p>An administrator must assign a journal or research paper to you.</p></div>}</section>
  </main></div>;
}
