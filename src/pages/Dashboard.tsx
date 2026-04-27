import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Building2, FileText, Receipt, ShoppingCart, TrendingUp, AlertTriangle, CheckCircle, Clock, HardHat } from 'lucide-react';
import { MOCK_OBRAS, MOCK_ESTIMACIONES, MOCK_FACTURAS_PROVEEDORES, MOCK_ORDENES_COMPRA, MOCK_ALERTS, MONTHLY_DATA } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed'];

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', notation: 'compact', maximumFractionDigits: 1 }).format(v);

const formatCurrencyFull = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);

export default function Dashboard() {
  const { user } = useAuth();

  const obrasActivas = MOCK_OBRAS.filter(o => o.status === 'activa').length;
  const presupuestoTotal = MOCK_OBRAS.filter(o => o.status === 'activa').reduce((a, o) => a + o.presupuesto, 0);
  const facturasPendientes = MOCK_FACTURAS_PROVEEDORES.filter(f => f.status === 'pendiente').length;
  const ordenesActivas = MOCK_ORDENES_COMPRA.filter(o => o.status !== 'cancelada').length;
  const estimacionesPendientes = MOCK_ESTIMACIONES.filter(e => e.status === 'enviada' || e.status === 'borrador').length;

  const statsCards = [
    { label: 'Obras Activas', value: obrasActivas, icon: <Building2 size={22} />, color: 'text-blue-600 bg-blue-100', change: '+2 este mes' },
    { label: 'Presupuesto Total', value: formatCurrency(presupuestoTotal), icon: <TrendingUp size={22} />, color: 'text-green-600 bg-green-100', change: 'En ejecución' },
    { label: 'Facturas Pendientes', value: facturasPendientes, icon: <Receipt size={22} />, color: 'text-yellow-600 bg-yellow-100', change: 'Por pagar' },
    { label: 'Órdenes de Compra', value: ordenesActivas, icon: <ShoppingCart size={22} />, color: 'text-purple-600 bg-purple-100', change: 'En proceso' },
    { label: 'Estimaciones Pend.', value: estimacionesPendientes, icon: <FileText size={22} />, color: 'text-orange-600 bg-orange-100', change: 'Por cobrar' },
    { label: 'Contratos Activos', value: 3, icon: <HardHat size={22} />, color: 'text-indigo-600 bg-indigo-100', change: 'Vigentes' },
  ];

  const obraStatusData = [
    { name: 'Activas', value: MOCK_OBRAS.filter(o => o.status === 'activa').length },
    { name: 'Pausadas', value: MOCK_OBRAS.filter(o => o.status === 'pausada').length },
    { name: 'Terminadas', value: MOCK_OBRAS.filter(o => o.status === 'terminada').length },
    { name: 'Canceladas', value: MOCK_OBRAS.filter(o => o.status === 'cancelada').length },
  ].filter(d => d.value > 0);

  const unreadAlerts = MOCK_ALERTS.filter(a => !a.leida);
  const readAlerts = MOCK_ALERTS.filter(a => a.leida);

  const alertIcon: Record<string, React.ReactNode> = {
    error: <AlertTriangle size={16} className="text-red-500" />,
    warning: <Clock size={16} className="text-yellow-500" />,
    info: <FileText size={16} className="text-blue-500" />,
    success: <CheckCircle size={16} className="text-green-500" />,
  };

  const alertBorder: Record<string, string> = {
    error: 'border-l-red-500',
    warning: 'border-l-yellow-500',
    info: 'border-l-blue-500',
    success: 'border-l-green-500',
  };

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Bienvenido, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">Resumen ejecutivo del sistema · {new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {statsCards.map((card, idx) => (
          <div key={idx} className="card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            <p className="text-xs font-medium text-slate-600 mt-0.5">{card.label}</p>
            <p className="text-xs text-slate-400 mt-1">{card.change}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue chart */}
        <div className="card lg:col-span-2">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Ingresos vs Gastos (últimos 7 meses)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={MONTHLY_DATA} barSize={24} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 11, fill: '#94a3b8' }} width={70} />
              <Tooltip formatter={(v) => formatCurrencyFull(v as number)} labelStyle={{ fontWeight: 600 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="ingresos" name="Ingresos" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="gastos" name="Gastos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Obras status chart */}
        <div className="card">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Estado de Obras</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={obraStatusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {obraStatusData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v} obras`, '']} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Obras progress */}
        <div className="card">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Avance de Obras Activas</h2>
          <div className="space-y-4">
            {MOCK_OBRAS.filter(o => o.status === 'activa').map(obra => (
              <div key={obra.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <p className="text-sm font-medium text-slate-700 truncate max-w-xs">{obra.nombre}</p>
                    <p className="text-xs text-slate-400">{obra.cliente}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-700 ml-2">{obra.avance}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      obra.avance >= 80 ? 'bg-green-500' :
                      obra.avance >= 50 ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${obra.avance}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {formatCurrencyFull(obra.presupuesto)} · {obra.responsable}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts panel */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-800">Alertas Recientes</h2>
            <span className="badge-red">{unreadAlerts.length} sin leer</span>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {[...unreadAlerts, ...readAlerts].map(alert => (
              <div
                key={alert.id}
                className={`flex gap-3 p-3 rounded-lg border-l-4 ${alertBorder[alert.tipo]} ${
                  !alert.leida ? 'bg-slate-50' : 'bg-white'
                } border border-slate-100`}
              >
                <div className="flex-shrink-0 mt-0.5">{alertIcon[alert.tipo]}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-700">{alert.titulo}</p>
                    {!alert.leida && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{alert.mensaje}</p>
                  <p className="text-xs text-slate-400 mt-1">{alert.modulo} · {alert.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
