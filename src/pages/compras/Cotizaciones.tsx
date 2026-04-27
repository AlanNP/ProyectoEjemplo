import { useState } from 'react';
import { Quote, Plus, Eye, Pencil, CheckCircle, XCircle } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_COTIZACIONES } from '../../data/mockData';
import type { Cotizacion } from '../../types';

const statusBadge: Record<string, string> = {
  pendiente: 'badge-yellow',
  aprobada: 'badge-green',
  rechazada: 'badge-red',
  vencida: 'badge-gray',
};

const statusLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
  vencida: 'Vencida',
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);

export default function Cotizaciones() {
  const [data] = useState<Cotizacion[]>(MOCK_COTIZACIONES);

  const columns = [
    { key: 'numero', label: 'Número', render: (row: Cotizacion) => (
      <span className="font-mono font-medium text-slate-700">{row.numero}</span>
    )},
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'obraNombre', label: 'Obra', className: 'hidden lg:table-cell', render: (row: Cotizacion) => (
      <p className="text-sm text-slate-600 truncate max-w-xs">{row.obraNombre || '—'}</p>
    )},
    { key: 'concepto', label: 'Concepto', className: 'hidden xl:table-cell', render: (row: Cotizacion) => (
      <p className="text-sm text-slate-600 truncate max-w-xs">{row.concepto}</p>
    )},
    { key: 'monto', label: 'Monto', render: (row: Cotizacion) => (
      <span className="font-bold text-slate-800">{formatCurrency(row.monto)}</span>
    )},
    { key: 'fecha', label: 'Fecha', className: 'hidden md:table-cell' },
    { key: 'vigencia', label: 'Vigencia', className: 'hidden md:table-cell' },
    { key: 'solicitante', label: 'Solicitante', className: 'hidden xl:table-cell' },
    { key: 'status', label: 'Estado', render: (row: Cotizacion) => (
      <span className={statusBadge[row.status]}>{statusLabel[row.status]}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cotizaciones"
        subtitle="Gestión de cotizaciones solicitadas a proveedores"
        icon={<Quote size={20} />}
        actions={
          <button className="btn-primary">
            <Plus size={16} />
            Nueva Cotización
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['pendiente', 'aprobada', 'rechazada', 'vencida'].map(status => (
          <div key={status} className="card text-center">
            <p className="text-2xl font-bold text-slate-800">{data.filter(c => c.status === status).length}</p>
            <p className="text-sm text-slate-500 mt-1">{statusLabel[status]}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <DataTable
          data={data}
          columns={columns}
          searchKeys={['numero', 'proveedor', 'concepto', 'obraNombre']}
          actions={(row) => (
            <>
              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Eye size={16} />
              </button>
              {row.status === 'pendiente' && (
                <>
                  <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Aprobar">
                    <CheckCircle size={16} />
                  </button>
                  <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Rechazar">
                    <XCircle size={16} />
                  </button>
                </>
              )}
              <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                <Pencil size={16} />
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
}
