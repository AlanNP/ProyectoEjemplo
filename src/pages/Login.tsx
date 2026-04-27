import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HardHat, Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password) {
      setError('Ingresa usuario y contraseña.');
      return;
    }
    setLoading(true);
    const ok = await login(form.username, form.password);
    setLoading(false);
    if (ok) {
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  const demoUsers = [
    { username: 'admin', password: 'admin123', role: 'Administrador (todos los módulos)' },
    { username: 'obras', password: 'obras123', role: 'Gerente de Obras' },
    { username: 'administracion', password: 'admin123', role: 'Gerente Administrativo' },
    { username: 'compras', password: 'compras123', role: 'Jefe de Compras' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sidebar via-primary-900 to-primary-800 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="w-full max-w-md relative px-4 sm:px-0">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur rounded-2xl mb-4 border border-white/20">
            <HardHat size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">ConstruCRM</h1>
          <p className="text-primary-200 text-sm mt-1">Sistema de Gestión para Constructoras</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Iniciar Sesión</h2>
          <p className="text-slate-500 text-sm mb-6">Ingresa tus credenciales para continuar</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Usuario</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  className="input-field pl-9"
                  placeholder="Ingresa tu usuario"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="input-field pl-9 pr-10"
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Ingresando...
                </span>
              ) : 'Ingresar al Sistema'}
            </button>
          </form>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
          <p className="text-white text-xs font-semibold mb-2 opacity-80">USUARIOS DE DEMOSTRACIÓN</p>
          <div className="space-y-1.5">
            {demoUsers.map(u => (
              <button
                key={u.username}
                onClick={() => setForm({ username: u.username, password: u.password })}
                className="w-full flex items-center justify-between text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors text-left"
              >
                <span className="font-mono font-medium">{u.username}</span>
                <span className="opacity-70">{u.role}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
