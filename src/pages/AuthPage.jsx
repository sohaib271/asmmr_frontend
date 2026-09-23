import { ArrowRight, CheckCircle2, LockKeyhole, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function AuthPage() {
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/portal'} replace />;
  const change = event => setForm(value => ({ ...value, [event.target.name]: event.target.value }));
  const checkEmail = async () => {
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return;
    try {
      const result = await api(`/auth/account-status?email=${encodeURIComponent(form.email)}`);
      if (result.data.hasAccount) { setMode('signin'); setMessage('Your account is ready. Enter your password to continue.'); }
      else if (result.data.hasMembership) { setMode('register'); setForm(value => ({ ...value, name: result.data.fullName || value.name })); setMessage('We found your membership application. Create a password to claim your account.'); }
      else { setMode('register'); setMessage('No membership application was found. Create an account first, then complete the membership form.'); }
    } catch { /* Submit will show validation errors. */ }
  };
  const submit = async event => {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const result = await api(`/auth/${mode === 'signin' ? 'login' : 'register'}`, { method: 'POST', body: JSON.stringify(form) });
      const data = await refresh();
      navigate(location.state?.from || (result.data.user.role === 'admin' || data?.user?.role === 'admin' ? '/admin' : result.data.hasMembership ? '/portal' : '/join'), { replace: true });
    } catch (issue) { setError(issue.message); }
    finally { setLoading(false); }
  };
  return <div className="auth-page"><Header light/><main className="auth-shell">
    <section className="auth-aside"><p className="eyebrow">ASMMR account</p><h1>Your research community, in one place.</h1><p>Manage membership, submit research, and follow every review from your personal portal.</p><div><span><CheckCircle2/> Secure member access</span><span><CheckCircle2/> Live application status</span><span><CheckCircle2/> Publication review tracking</span></div></section>
    <section className="auth-card"><div className="auth-tabs"><button className={mode === 'signin' ? 'is-active' : ''} onClick={() => { setMode('signin'); setMessage(''); }}>Sign in</button><button className={mode === 'register' ? 'is-active' : ''} onClick={() => { setMode('register'); setMessage(''); }}>Register</button></div><h2>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2><p>{mode === 'signin' ? 'Sign in to open your member portal.' : 'Use the same email as any existing membership application.'}</p>
      <form onSubmit={submit}>{mode === 'register' && <label><span>Full name</span><div><User/><input name="name" value={form.name} onChange={change} required placeholder="Your full name"/></div></label>}<label><span>Email address</span><div><Mail/><input name="email" type="email" value={form.email} onChange={change} onBlur={checkEmail} required placeholder="name@example.com"/></div></label><label><span>Password</span><div><LockKeyhole/><input name="password" type="password" value={form.password} onChange={change} required minLength="8" placeholder="At least 8 characters"/></div></label>{message && <p className="auth-message">{message}</p>}{error && <p className="auth-error" role="alert">{error}</p>}<button className="button auth-submit" disabled={loading}>{loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'} <ArrowRight/></button></form><Link className="auth-home" to="/">Back to ASMMR home</Link>
    </section>
  </main></div>;
}
