import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Header onMenuToggle={() => setCollapsed(!collapsed)} sidebarCollapsed={collapsed} />
      <main
        className="pt-16 min-h-screen transition-all duration-300"
        style={{ marginLeft: collapsed ? '4rem' : '16rem' }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
