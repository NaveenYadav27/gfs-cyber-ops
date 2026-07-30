// src/pages/Login.tsx
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Shield, Lock } from 'lucide-react';
import { useStore } from '@/store/useStore';

function NetworkParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 10,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--color-gfs-accent)]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.15 }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.1, 0.3, 0.15, 0.25, 0.1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05 }}>
        <line x1="20%" y1="30%" x2="40%" y2="50%" stroke="var(--color-gfs-accent)" strokeWidth="0.5" />
        <line x1="60%" y1="20%" x2="80%" y2="60%" stroke="var(--color-gfs-accent)" strokeWidth="0.5" />
        <line x1="30%" y1="70%" x2="70%" y2="40%" stroke="var(--color-gfs-blue)" strokeWidth="0.5" />
        <line x1="10%" y1="50%" x2="50%" y2="80%" stroke="var(--color-gfs-accent)" strokeWidth="0.5" />
        <line x1="75%" y1="15%" x2="90%" y2="45%" stroke="var(--color-gfs-blue)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export function Login() {
  const { login } = useStore();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    if (employeeId && password) {
      login(employeeId, password);
    } else {
      setError('Employee ID and password are required');
      setLoading(false);
    }
  }, [employeeId, password, login]);

  return (
    <div className="min-h-screen bg-[var(--color-gfs-base)] flex items-center justify-center relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 gfs-grid-bg opacity-40" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(0,229,199,0.04) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(59,139,245,0.04) 0%, transparent 50%)',
      }} />
      <NetworkParticles />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20, scale: mounted ? 1 : 0.98 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="gfs-glass rounded-2xl p-8 gfs-glow">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{ boxShadow: '0 8px 32px rgba(0,229,199,0.2)' }}
            >
              <Shield className="w-8 h-8 text-[var(--color-gfs-base)]" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--color-gfs-text)]">
              Global Financial Services
            </h1>
            <p className="text-xs tracking-[0.2em] text-[var(--color-gfs-text-muted)] mt-1 uppercase">
              Cyber Operations Platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-[var(--color-gfs-text-secondary)] mb-1.5 uppercase tracking-wider">
                Employee ID
              </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="e.g., GFS-SEC-4721"
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--color-gfs-base)] border border-[var(--color-gfs-border)] text-sm text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)] focus:ring-1 focus:ring-[var(--color-gfs-accent)]/30 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[var(--color-gfs-text-secondary)] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 pr-10 rounded-lg bg-[var(--color-gfs-base)] border border-[var(--color-gfs-border)] text-sm text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)] focus:ring-1 focus:ring-[var(--color-gfs-accent)]/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-[var(--color-gfs-red)] flex items-center gap-1"
              >
                <Lock className="w-3 h-3" /> {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] text-[var(--color-gfs-base)] hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[var(--color-gfs-base)] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 pt-4 border-t border-[var(--color-gfs-border-light)] flex items-center justify-between text-[10px]">
            <button className="text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] transition-colors">
              Forgot credentials?
            </button>
            <button className="text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] transition-colors">
              IT Helpdesk
            </button>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-6">
          <p className="text-[10px] text-[var(--color-gfs-text-muted)]">
            © 2024 Global Financial Services. Internal use only. Authorized personnel only.
          </p>
          <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1">
            All access is monitored and logged per GFS Security Policy SEC-2024-001.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
