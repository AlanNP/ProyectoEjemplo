import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Building2, FileText, ClipboardList,
  Receipt, CreditCard, FileX, ShoppingCart, Quote,
  ClipboardCheck, Users, ChevronDown, ChevronRight,
  HardHat
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, hasPermission } = useAuth();
  const [openGroups, setOpenGroups] = useState<string[]>(['obras', 'admin', 'compras']);

  const toggleGroup = (key: string) => {
    setOpenGroups(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
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
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
      isActive
        ? 'bg-primary-600 text-white font-medium'
        : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-sidebar flex flex-col transition-all duration-300 z-30 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <HardHat size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-tight">ConstruCRM</p>
            <p className="text-slate-400 text-xs">Gestión de Obras</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {/* Dashboard */}
        <NavLink to="/dashboard" className={navLinkClass}>
          <LayoutDashboard size={18} className="flex-shrink-0" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        {/* Menu Groups */}
        {menuGroups.map(group => {
          const visibleItems = group.items.filter(item => hasPermission(item.permission as any));
          if (visibleItems.length === 0) return null;

          const isOpen = openGroups.includes(group.key);

          return (
            <div key={group.key}>
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.key)}
                  className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors mt-4 mb-1"
                >
                  <div className="flex items-center gap-2">
                    {group.icon}
                    <span>{group.label}</span>
                  </div>
                  {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              )}
              {collapsed && (
                <div className="px-1 mt-3 mb-1">
                  <div className="border-t border-white/10" />
                </div>
              )}
              {(isOpen || collapsed) && (
                <div className="space-y-0.5">
                  {visibleItems.map(item => (
                    <NavLink key={item.path} to={item.path!} className={navLinkClass}>
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Admin */}
        {hasPermission('admin') && (
          <div>
            {!collapsed && (
              <p className="px-3 py-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mt-4 mb-1">
                Administración Sistema
              </p>
            )}
            <NavLink to="/usuarios" className={navLinkClass}>
              <Users size={18} className="flex-shrink-0" />
              {!collapsed && <span>Usuarios y Permisos</span>}
            </NavLink>
          </div>
        )}
      </nav>

      {/* User info */}
      {!collapsed && user && (
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-xs font-medium truncate">{user.name}</p>
              <p className="text-slate-400 text-xs truncate">{user.department}</p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} className="rotate-90" />}
      </button>
    </aside>
  );
}
