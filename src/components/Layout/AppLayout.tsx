import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        mobileOpen={mobileOpen}
        desktopCollapsed={desktopCollapsed}
        onMobileClose={() => setMobileOpen(false)}
        onDesktopToggle={() => setDesktopCollapsed(!desktopCollapsed)}
      />

      {/* Main content — shifts right on desktop based on sidebar width */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${
        desktopCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <Header onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
