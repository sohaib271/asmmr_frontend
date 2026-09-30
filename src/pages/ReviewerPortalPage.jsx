import { ArrowLeft, Download, FileCheck2, LoaderCircle, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { API_URL, api } from '../services/api';

const labels = {
  pending: 'Pending',
  'under-review': 'Under review',
  approved: 'Approved',
  rejected: 'Rejected',
  'revision-requested': 'Revision requested',
};

const actionLabels = {
  approved: 'Approving…',
  'revision-requested': 'Sending…',
  rejected: 'Rejecting…',
};

export default function ReviewerPortalPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState({});
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(null);
  const [reasonPrompt, setReasonPrompt] = useState(null);

  const load = () => api('/reviewer/assignments')
    .then(result => setItems(result.data))
    .catch(issue => setError(issue.message));

  useEffect(() => { load(); }, []);

  const decide = async (item, status) => {
    const reason = (notes[item._id] || '').trim();
    if (status !== 'approved' && item.status === 'approved' && (reasonPrompt?.id !== item._id || reasonPrompt.status !== status)) {
      setReasonPrompt({ id: item._id, status });
      setError('');
      return;
    }
    if (status !== 'approved' && !reason) {
      setError(status === 'rejected' ? 'Add a reason before rejecting the paper.' : 'Add suggested improvements before returning the paper.');
      return;
    }

    setSaving({ id: item._id, status });
    setError('');
    try {
      await api(`/reviewer/publications/${item._id}/decision`, {
        method: 'PATCH',
        body: JSON.stringify({ status, reason }),
      });
      await load();
      setReasonPrompt(null);
    } catch (issue) {
      setError(issue.message);
    } finally {
      setSaving(null);
    }
  };

  const doLogout = async () => {
    await logout();
    navigate('/');
  };

  const buttonContent = (itemId, status, label) => {
    if (saving?.id !== itemId || saving.status !== status) return label;
    return <><LoaderCircle className="action-spinner" aria-hidden="true" />{actionLabels[status]}</>;
  };

  return <div className="portal-page">
    <Header light />
    <main className="portal-shell">
      <header className="portal-welcome">
        <div><p className="eyebrow eyebrow--blue">Reviewer portal</p><h1>Assigned manuscripts</h1><p>{user.name} · {user.email}</p></div>
        <div className="portal-header-actions">
          <Link className="portal-back" to="/portal"><ArrowLeft /> Member portal</Link>
          <button className="portal-logout" onClick={doLogout}><LogOut /> Sign out</button>
        </div>
      </header>
      {error && <p className="auth-error">{error}</p>}
      <section className="reviewer-list">
        {items.map(item => {
          const isSaving = saving?.id === item._id;
          const showReason = item.status !== 'approved' || reasonPrompt?.id === item._id;
          const reasonLabel = reasonPrompt?.id === item._id && reasonPrompt.status === 'rejected'
            ? 'Reason for rejection'
            : 'Suggested improvements';
          return <article key={item._id}>
            <div className="reviewer-paper-head">
              <div><span>{item.type === 'journal' ? 'Journal' : 'Research paper'} · Version {item.version}</span><h2>{item.title}</h2><p>Submitted by {item.user?.name} ({item.user?.email})</p></div>
              <strong className={`status-pill status-${item.status}`}>{labels[item.status]}</strong>
            </div>
            <p className="reviewer-abstract">{item.abstract}</p>
            <a className="admin-document-link" href={`${API_URL}/publications/${item._id}/manuscript`} target="_blank" rel="noreferrer"><Download /> Download manuscript</a>
            {showReason && <label>{reasonLabel}<textarea rows="4" maxLength="1000" autoFocus={reasonPrompt?.id === item._id} value={notes[item._id] || ''} onChange={event => { setNotes({ ...notes, [item._id]: event.target.value }); if (error) setError(''); }} placeholder={reasonPrompt?.status === 'rejected' ? 'Explain why this paper is being rejected' : 'Describe the changes the author should make'} /></label>}
            <div className="reviewer-decisions" aria-live="polite" aria-busy={isSaving}>
              <button disabled={isSaving || item.status === 'approved'} onClick={() => decide(item, 'approved')}>{buttonContent(item._id, 'approved', 'Approve')}</button>
              <button disabled={isSaving || item.status === 'revision-requested'} onClick={() => decide(item, 'revision-requested')}>{buttonContent(item._id, 'revision-requested', reasonPrompt?.id === item._id && reasonPrompt.status === 'revision-requested' ? 'Submit improvements' : 'Request improvements')}</button>
              <button disabled={isSaving || item.status === 'rejected'} onClick={() => decide(item, 'rejected')}>{buttonContent(item._id, 'rejected', reasonPrompt?.id === item._id && reasonPrompt.status === 'rejected' ? 'Confirm rejection' : 'Reject')}</button>
            </div>
          </article>;
        })}
        {!items.length && <div className="portal-empty"><FileCheck2 /><h3>No manuscripts assigned</h3><p>An administrator must assign a journal or research paper to you.</p></div>}
      </section>
    </main>
  </div>;
}
