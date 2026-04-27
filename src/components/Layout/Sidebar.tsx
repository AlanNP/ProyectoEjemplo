import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, FileText, ClipboardList,
  Receipt, CreditCard, FileX, ShoppingCart, Quote,
  ClipboardCheck, Users, ChevronDown, ChevronRight,
  HardHat, X, LogOut
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  mobileOpen: boolean;
  desktopCollapsed: boolean;
  onMobileClose: () => void;
  onDesktopToggle: () => void;
}

export default function Sidebar({ mobileOpen, desktopCollapsed, onMobileClose, onDesktopToggle }: SidebarProps) {
  const { user, hasPermission, logout } = useAuth();
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<string[]>(['obras', 'admin', 'compras']);

  const showLabels = !desktopCollapsed || mobileOpen;

  const toggleGroup = (key: string) => {
    setOpenGroups(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuGroups = [
    {
      key: 'obras',
      label: 'Control de Obras',
      icon: <HardHat size={18} />,
      items: [
        { label: 'Obras', path: '/obras', icon: <Building2 size={16} />, permission: 'obras' },
        { label: 'Estimaciones', path: '/estimaciones', icon: <FileText size={16} />, permission: 'estimaciones' },
        { label: 'Contratos', path: '/contratos', icon: <ClipboardList size={16} />, permission: 'contratos' },
      ],
    },
    {
      key: 'admin',
      label: 'Administración',
      icon: <Receipt size={18} />,
      items: [
        { label: 'Facturas Proveedores', path: '/facturas-proveedores', icon: <Receipt size={16} />, permission: 'facturas_proveedores' },
        { label: 'Facturas Clientes', path: '/facturas-clientes', icon: <CreditCard size={16} />, permission: 'facturas_clientes' },
        { label: 'NC Proveedores', path: '/notas-credito-proveedores', icon: <FileX size={16} />, permission: 'notas_credito_proveedores' },
        { label: 'NC Clientes', path: '/notas-credito-clientes', icon: <FileX size={16} />, permission: 'notas_credito_clientes' },
      ],
    },
    {
      key: 'compras',
      label: 'Compras',
      icon: <ShoppingCart size={18} />,
      items: [
        { label: 'Órdenes de Compra', path: '/ordenes-compra', icon: <ShoppingCart size={16} />, permission: 'ordenes_compra' },
        { label: 'Cotizaciones', path: '/cotizaciones', icon: <Quote size={16} />, permission: 'cotizaciones' },
        { label: 'Requisiciones', path: '/requisiciones', icon: <ClipboardCheck size={16} />, permission: 'requisiciones' },
      ],
    },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
      isActive
        ? 'bg-primary-600 text-white font-medium'
        : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full bg-sidebar flex flex-col z-40 transition-all duration-300
        w-64
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${desktopCollapsed ? 'lg:w-16' : 'lg:w-64'}
      `}
    >
      {/* Logo + mobile close button */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 min-h-16">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <HardHat size={18} className="text-white" />
          </div>
          {showLabels && (
            <div className="overflow-hidden">
              <p className="text-white font-bold text-sm leading-tight">ConstruCRM</p>
              <p className="text-slate-400 text-xs">Gestión de Obras</p>
            </div>
          )}
        </div>
        {/* Mobile close */}
        <button onClick={onMobileClose} className="lg:hidden text-slate-400 hover:text-white transition-colors flex-shrink-0">
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        <NavLink to="/dashboard" className={navLinkClass} onClick={onMobileClose}>
          <LayoutDashboard size={18} className="flex-shrink-0" />
          {showLabels && <span>Dashboard</span>}
        </NavLink>

        {menuGroups.map(group => {
          const visibleItems = group.items.filter(item => hasPermission(item.permission as any));
          if (visibleItems.length === 0) return null;

          const isOpen = openGroups.includes(group.key);

          return (
            <div key={group.key}>
              {showLabels ? (
                <button
                  onClick={() => toggleGroup(group.key)}
                  className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors mt-3 mb-0.5"
                >
                  <div className="flex items-center gap-2">
                    {group.icon}
                    <span>{group.label}</span>
                  </div>
                  {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </button>
              ) : (
                <div className="mx-2 my-2 border-t border-white/10" />
              )}

              {(isOpen || !showLabels) && (
                <div className="space-y-0.5">
                  {visibleItems.map(item => (
                    <NavLink
                      key={item.path}
                      to={item.path!}
                      className={navLinkClass}
                      onClick={onMobileClose}
                      title={!showLabels ? item.label : undefined}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {showLabels && <span>{item.label}</span>}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {hasPermission('admin') && (
          <div>
            {showLabels && (
              <p className="px-3 py-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mt-3 mb-0.5">
                Sistema
              </p>
            )}
            {!showLabels && <div className="mx-2 my-2 border-t border-white/10" />}
            <NavLink to="/usuarios" className={navLinkClass} onClick={onMobileClose} title={!showLabels ? 'Usuarios y Permisos' : undefined}>
              <Users size={18} className="flex-shrink-0" />
              {showLabels && <span>Usuarios y Permisos</span>}
            </NavLink>
          </div>
        )}
      </nav>

      {/* User info + logout */}
      <div className={`border-t border-white/10 ${showLabels ? 'px-4 py-3' : 'px-2 py-3'}`}>
        {showLabels && user ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-medium truncate">{user.name}</p>
                <p className="text-slate-400 text-xs truncate">{user.department}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0" title="Cerrar sesión">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} className="w-full flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors py-1" title="Cerrar sesión">
            <LogOut size={18} />
          </button>
        )}
      </div>

      {/* Desktop collapse toggle */}
      <button
        onClick={onDesktopToggle}
        className="hidden lg:flex absolute -right-3 top-[4.5rem] w-6 h-6 bg-primary-700 text-white rounded-full items-center justify-center shadow-lg hover:bg-primary-600 transition-colors z-10"
      >
        {desktopCollapsed ? <ChevronRight size={12} /> : <ChevronRight size={12} className="rotate-180" />}
      </button>
    </aside>
  );
}
