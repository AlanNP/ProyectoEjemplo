import { useState } from 'react';
import { Building2, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_OBRAS } from '../../data/mockData';
import type { Obra } from '../../types';

const statusBadge: Record<string, string> = {
  activa: 'badge-green',
  pausada: 'badge-yellow',
  terminada: 'badge-blue',
  cancelada: 'badge-red',
};

const statusLabel: Record<string, string> = {
  activa: 'Activa',
  pausada: 'Pausada',
  terminada: 'Terminada',
  cancelada: 'Cancelada',
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);

export default function Obras() {
  const [data] = useState<Obra[]>(MOCK_OBRAS);

  const columns = [
    { key: 'nombre', label: 'Nombre de la Obra', render: (row: Obra) => (
      <div>
        <p className="font-medium text-slate-800">{row.nombre}</p>
        <p className="text-xs text-slate-400">{row.ubicacion}</p>
      </div>
    )},
    { key: 'cliente', label: 'Cliente' },
    { key: 'responsable', label: 'Responsable', className: 'hidden lg:table-cell' },
    { key: 'presupuesto', label: 'Presupuesto', render: (row: Obra) => (
      <span className="font-medium">{formatCurrency(row.presupuesto)}</span>
    )},
    { key: 'avance', label: 'Avance', render: (row: Obra) => (
      <div className="flex items-center gap-2 min-w-24">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${row.avance >= 80 ? 'bg-green-500' : row.avance >= 50 ? 'bg-blue-500' : 'bg-yellow-500'}`}
            style={{ width: `${row.avance}%` }}
          />
        </div>
        <span className="text-xs font-medium text-slate-600">{row.avance}%</span>
      </div>
    )},
    { key: 'fechaFin', label: 'Fecha Fin', className: 'hidden md:table-cell' },
    { key: 'status', label: 'Estado', render: (row: Obra) => (
      <span className={statusBadge[row.status]}>{statusLabel[row.status]}</span>
    )},
  ];

  const stats = {
    activas: data.filter(o => o.status === 'activa').length,
    presupuesto: data.filter(o => o.status === 'activa').reduce((a, o) => a + o.presupuesto, 0),
    avancePromedio: Math.round(data.filter(o => o.status === 'activa').reduce((a, o) => a + o.avance, 0) / data.filter(o => o.status === 'activa').length),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Obras"
        subtitle="Gestión y seguimiento de proyectos de construcción"
        icon={<Building2 size={20} />}
        actions={
          <button className="btn-primary">
            <Plus size={16} />
            Nueva Obra
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-blue-600">{stats.activas}</p>
          <p className="text-sm text-slate-500 mt-1">Obras Activas</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-bold text-green-600">
            {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', notation: 'compact' }).format(stats.presupuesto)}
          </p>
          <p className="text-sm text-slate-500 mt-1">Presupuesto Total</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-orange-500">{stats.avancePromedio}%</p>
          <p className="text-sm text-slate-500 mt-1">Avance Promedio</p>
        </div>
      </div>

      <div className="card">
        <DataTable
          data={data}
          columns={columns}
          searchKeys={['nombre', 'cliente', 'ubicacion']}
          actions={(_row) => (
            <>
              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver detalles">
                <Eye size={16} />
              </button>
              <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Editar">
                <Pencil size={16} />
              </button>
              <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                <Trash2 size={16} />
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
}
