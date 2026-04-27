import { useState } from 'react';
import { Bell, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MOCK_ALERTS } from '../../data/mockData';

interface HeaderProps {
  onMenuToggle: () => void;
  sidebarCollapsed: boolean;
}

export default function Header({ onMenuToggle, sidebarCollapsed }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAlerts, setShowAlerts] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadAlerts = MOCK_ALERTS.filter(a => !a.leida).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-white border-b border-slate-200 z-20 flex items-center justify-between px-4 shadow-sm"
      style={{ left: sidebarCollapsed ? '4rem' : '16rem', transition: 'left 0.3s' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-slate-800 font-semibold text-sm hidden sm:block">
            Sistema CRM Constructoras
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowAlerts(!showAlerts); setShowUserMenu(false); }}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors relative"
          >
            <Bell size={20} />
            {unreadAlerts > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadAlerts}
              </span>
            )}
          </button>

          {showAlerts && (
            <div className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800 text-sm">Alertas y Notificaciones</h3>
                <button onClick={() => setShowAlerts(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {MOCK_ALERTS.map(alert => (
                  <div
                    key={alert.id}
                    className={`px-4 py-3 border-b border-slate-100 ${!alert.leida ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        alert.tipo === 'error' ? 'bg-red-100 text-red-700' :
                        alert.tipo === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        alert.tipo === 'success' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {alert.tipo.toUpperCase()}
                      </span>
                      {!alert.leida && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0" />}
                    </div>
                    <p className="text-sm font-medium text-slate-800 mt-1">{alert.titulo}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{alert.mensaje}</p>
                    <p className="text-xs text-slate-400 mt-1">{alert.modulo} · {alert.fecha}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowAlerts(false); }}
            className="flex items-center gap-2 p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 bg-primary-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-slate-700">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.role}</p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <User size={16} />
                Mi Perfil
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
