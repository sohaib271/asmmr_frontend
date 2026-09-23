import { CheckCircle2, FileCheck2, LogOut, ShieldCheck, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { API_URL, api } from '../services/api';

const statusOptions = { membership: ['reviewing', 'approved', 'rejected'], publication: ['under-review', 'published', 'rejected'] };

export default function AdminPortalPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({ memberships: [], publications: [] });
  const [tab, setTab] = useState('memberships');
  const [error, setError] = useState('');
  const [reviewTarget, setReviewTarget] = useState(null);
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  const load = () => api('/admin/overview').then(result => setData(result.data)).catch(issue => setError(issue.message));

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (!reviewTarget) return;
    const close = event => event.key === 'Escape' && setReviewTarget(null);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [reviewTarget]);

  const openReview = (kind, item, status) => {
    setReason(''); setError('');
    setReviewTarget({ kind, id: item._id, title: kind === 'membership' ? item.fullName : item.title, status });
  };
  const review = async event => {
    event.preventDefault();
    if (reviewTarget.status === 'rejected' && !reason.trim()) return;
    setSaving(true);
    try {
      await api(`/admin/${reviewTarget.kind === 'membership' ? 'memberships' : 'publications'}/${reviewTarget.id}`, { method: 'PATCH', body: JSON.stringify({ status: reviewTarget.status, reason: reason.trim() }) });
      setReviewTarget(null); setReason(''); await load();
    } catch (issue) { setError(issue.message); }
    finally { setSaving(false); }
  };
  const doLogout = async () => { await logout(); navigate('/'); };
  const items = tab === 'memberships' ? data.memberships : data.publications;
  const fileUrl = path => path ? new URL(path.replace(/^\/+/, ''), `${new URL(API_URL).origin}/`).href : '';

  return <div className="portal-page admin-page"><Header light/><main className="portal-shell"><header className="portal-welcome"><div><p className="eyebrow eyebrow--blue">Administration</p><h1>Review dashboard</h1><p>Signed in as {user.email}</p></div><button className="portal-logout" onClick={doLogout}><LogOut/> Sign out</button></header>
    <section className="portal-summary"><article><ShieldCheck/><div><span>Pending memberships</span><strong>{data.memberships.filter(x => ['pending','reviewing'].includes(x.status)).length}</strong></div></article><article><FileCheck2/><div><span>Pending publications</span><strong>{data.publications.filter(x => ['pending','under-review'].includes(x.status)).length}</strong></div></article><article><Users/><div><span>Approved members</span><strong>{data.memberships.filter(x => x.status === 'approved').length}</strong></div></article></section>
    <div className="admin-tabs"><button className={tab === 'memberships' ? 'is-active' : ''} onClick={() => setTab('memberships')}>Membership applications</button><button className={tab === 'publications' ? 'is-active' : ''} onClick={() => setTab('publications')}>Journals &amp; papers</button></div>{error && <p className="auth-error">{error}</p>}
    <section className="admin-list">{items.map(item => <article key={item._id}><div className="admin-item-copy"><span>{tab === 'memberships' ? item.user?.email || item.email : `${item.type} · ${item.user?.email || 'Unknown user'}`}</span><h2>{tab === 'memberships' ? item.fullName : item.title}</h2><p>{tab === 'memberships' ? `${item.designation} · ${item.institution} · ${item.country}` : item.abstract}</p>{tab === 'memberships' && <p className="admin-detail">Interests: {(item.interests || []).join(', ')}<br/>Contribution: {item.contribution}<br/><a href={fileUrl(item.cv)} target="_blank" rel="noreferrer">Open submitted CV</a></p>}{tab === 'publications' && item.manuscriptUrl && <p className="admin-detail"><a href={item.manuscriptUrl} target="_blank" rel="noreferrer">Open manuscript</a></p>}{item.reviewReason && <p className="submission-reason">Current note: {item.reviewReason}</p>}</div><div className="admin-actions"><strong className={`status-pill status-${item.status}`}>{item.status}</strong>{statusOptions[tab === 'memberships' ? 'membership' : 'publication'].map(status => <button key={status} disabled={item.status === status} onClick={() => openReview(tab === 'memberships' ? 'membership' : 'publication', item, status)}>{status.replace('-', ' ')}</button>)}</div></article>)}{!items.length && <div className="portal-empty"><h3>Nothing to review</h3></div>}</section>
  </main>{reviewTarget && <div className="review-modal-backdrop" onMouseDown={event => event.target === event.currentTarget && setReviewTarget(null)}><section className={`review-modal review-modal--${reviewTarget.status}`} role="dialog" aria-modal="true" aria-labelledby="review-dialog-title"><button className="review-modal-close" onClick={() => setReviewTarget(null)} aria-label="Close review dialog"><X/></button><div className="review-modal-icon">{reviewTarget.status === 'rejected' ? <X/> : <CheckCircle2/>}</div><p className="review-modal-eyebrow">Confirm review decision</p><h2 id="review-dialog-title">{reviewTarget.status.replace('-', ' ')}</h2><p className="review-modal-subject">{reviewTarget.title}</p><form onSubmit={review}><label htmlFor="review-reason">{reviewTarget.status === 'rejected' ? 'Reason for rejection' : 'Review note'} <span>{reviewTarget.status === 'rejected' ? 'Required' : 'Optional'}</span></label><textarea id="review-reason" rows="4" maxLength="1000" autoFocus value={reason} onChange={event => setReason(event.target.value)} placeholder={reviewTarget.status === 'rejected' ? 'Explain what needs to be corrected…' : 'Add a note for the applicant…'} required={reviewTarget.status === 'rejected'}/><div className="review-modal-actions"><button type="button" className="review-cancel" onClick={() => setReviewTarget(null)}>Cancel</button><button className="review-confirm" disabled={saving || (reviewTarget.status === 'rejected' && !reason.trim())}>{saving ? 'Saving…' : `Confirm ${reviewTarget.status.replace('-', ' ')}`}</button></div></form></section></div>}</div>;
}
