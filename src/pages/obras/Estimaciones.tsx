import { useState } from 'react';
import { FileText, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_ESTIMACIONES } from '../../data/mockData';
import type { Estimacion } from '../../types';

const statusBadge: Record<string, string> = {
  borrador: 'badge-gray',
  enviada: 'badge-blue',
  aprobada: 'badge-green',
  rechazada: 'badge-red',
  pagada: 'badge-green',
};

const statusLabel: Record<string, string> = {
  borrador: 'Borrador',
  enviada: 'Enviada',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
  pagada: 'Pagada',
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);

export default function Estimaciones() {
  const [data] = useState<Estimacion[]>(MOCK_ESTIMACIONES);

  const columns = [
    { key: 'numero', label: 'Número', render: (row: Estimacion) => (
      <span className="font-mono text-sm font-medium text-slate-700">{row.numero}</span>
    )},
    { key: 'obraNombre', label: 'Obra', render: (row: Estimacion) => (
      <p className="text-sm text-slate-700 max-w-xs truncate">{row.obraNombre}</p>
    )},
    { key: 'periodo', label: 'Período', className: 'hidden md:table-cell' },
    { key: 'monto', label: 'Monto', render: (row: Estimacion) => (
      <span className="font-semibold text-slate-800">{formatCurrency(row.monto)}</span>
    )},
    { key: 'fechaCreacion', label: 'Fecha Creación', className: 'hidden lg:table-cell' },
    { key: 'fechaAprobacion', label: 'Fecha Aprobación', className: 'hidden lg:table-cell', render: (row: Estimacion) => (
      <span>{row.fechaAprobacion || '—'}</span>
    )},
    { key: 'status', label: 'Estado', render: (row: Estimacion) => (
      <span className={statusBadge[row.status]}>{statusLabel[row.status]}</span>
    )},
  ];

  const total = data.reduce((a, e) => a + e.monto, 0);
  const pagadas = data.filter(e => e.status === 'pagada').reduce((a, e) => a + e.monto, 0);
  const pendientes = data.filter(e => e.status === 'enviada' || e.status === 'aprobada').reduce((a, e) => a + e.monto, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Estimaciones"
        subtitle="Control de estimaciones por obra y período"
        icon={<FileText size={20} />}
        actions={
          <button className="btn-primary">
            <Plus size={16} />
            Nueva Estimación
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-lg font-bold text-slate-800">{formatCurrency(total)}</p>
          <p className="text-sm text-slate-500 mt-1">Total Estimado</p>
        </div>
        <div className="card text-center">
          <p className="text-lg font-bold text-green-600">{formatCurrency(pagadas)}</p>
          <p className="text-sm text-slate-500 mt-1">Cobrado</p>
        </div>
        <div className="card text-center">
          <p className="text-lg font-bold text-yellow-600">{formatCurrency(pendientes)}</p>
          <p className="text-sm text-slate-500 mt-1">Por Cobrar</p>
        </div>
      </div>

      <div className="card">
        <DataTable
          data={data}
          columns={columns}
          searchKeys={['numero', 'obraNombre', 'periodo']}
          actions={(_row) => (
            <>
              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Eye size={16} />
              </button>
              <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                <Pencil size={16} />
              </button>
              <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
}
