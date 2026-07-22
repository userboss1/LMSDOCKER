import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            toast.error(error || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#F1F5F9]">

            {/* ── Left Brand Panel ── */}
            <div className="hidden lg:flex flex-col justify-between w-[52%] bg-[#0F172A] p-12 relative overflow-hidden">

                {/* Decorative grid overlay */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
                {/* Decorative orbs */}
                <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full bg-violet-600/20 blur-3xl" />

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v5" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">LMSgrave</span>
                </div>

                {/* Center content */}
                <div className="relative space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-white/70 text-xs font-semibold tracking-wide">Learning Management System</span>
                        </div>
                        <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
                            Elevate<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Every Class.</span>
                        </h1>
                        <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                            A unified platform for teachers, students and administrators — notes, exams, visual learning, and results all in one place.
                        </p>
                    </div>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2">
                        {['📝 Notes Manager', '🎯 Exam Zone', '🖼️ Visual Exams', '📊 Live Results'].map(f => (
                            <span key={f} className="text-xs font-semibold text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <p className="relative text-white/25 text-xs">
                    © {new Date().getFullYear()} LMSgrave · All rights reserved
                </p>
            </div>

            {/* ── Right Form Panel ── */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
                <div className="w-full max-w-md animate-fade-in-up">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-10">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v5" />
                            </svg>
                        </div>
                        <span className="font-bold text-slate-800 text-lg">LMSgrave</span>
                    </div>

                    {/* Heading */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
                        <p className="text-slate-500 mt-1 text-sm">Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="login-email" className="input-label">Email Address</label>
                            <input
                                id="login-email"
                                type="text"
                                autoComplete="email"
                                placeholder="you@school.com"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="login-password" className="input-label">Password</label>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPwd ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="input-field pr-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(v => !v)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                >
                                    {showPwd ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    {/* Role hint */}
                    <div className="mt-8 p-4 bg-slate-100 rounded-xl border border-slate-200">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Access Roles</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Admin', color: 'bg-violet-100 text-violet-700' },
                                { label: 'Teacher', color: 'bg-blue-100 text-blue-700' },
                                { label: 'Student', color: 'bg-emerald-100 text-emerald-700' },
                            ].map(r => (
                                <span key={r.label} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.color}`}>
                                    {r.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
