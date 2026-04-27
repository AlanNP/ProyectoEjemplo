import { useState } from 'react';
import { ShoppingCart, Plus, Eye, Pencil, CheckCircle } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_ORDENES_COMPRA } from '../../data/mockData';
import type { OrdenCompra } from '../../types';

const statusBadge: Record<string, string> = {
  borrador: 'badge-gray',
  enviada: 'badge-yellow',
  aprobada: 'badge-blue',
  recibida: 'badge-green',
  cancelada: 'badge-red',
};

const statusLabel: Record<string, string> = {
  borrador: 'Borrador',
  enviada: 'Enviada',
  aprobada: 'Aprobada',
  recibida: 'Recibida',
  cancelada: 'Cancelada',
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);

export default function OrdenesCompra() {
  const [data] = useState<OrdenCompra[]>(MOCK_ORDENES_COMPRA);

  const columns = [
    { key: 'numero', label: 'Número', render: (row: OrdenCompra) => (
      <span className="font-mono font-medium text-slate-700">{row.numero}</span>
    )},
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'obraNombre', label: 'Obra', className: 'hidden lg:table-cell', render: (row: OrdenCompra) => (
      <p className="text-sm text-slate-600 truncate max-w-xs">{row.obraNombre || '—'}</p>
    )},
    { key: 'concepto', label: 'Concepto', className: 'hidden xl:table-cell', render: (row: OrdenCompra) => (
      <p className="text-sm text-slate-600 truncate max-w-xs">{row.concepto}</p>
    )},
    { key: 'total', label: 'Total', render: (row: OrdenCompra) => (
      <span className="font-bold text-slate-800">{formatCurrency(row.total)}</span>
    )},
    { key: 'fechaEmision', label: 'Emisión', className: 'hidden md:table-cell' },
    { key: 'fechaEntrega', label: 'Entrega', className: 'hidden md:table-cell' },
    { key: 'solicitante', label: 'Solicitante', className: 'hidden xl:table-cell' },
    { key: 'status', label: 'Estado', render: (row: OrdenCompra) => (
      <span className={statusBadge[row.status]}>{statusLabel[row.status]}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Órdenes de Compra"
        subtitle="Gestión de órdenes de compra a proveedores"
        icon={<ShoppingCart size={20} />}
        actions={
          <button className="btn-primary">
            <Plus size={16} />
            Nueva OC
          </button>
        }
      />

      <div className="grid grid-cols-4 gap-4">
        {['borrador', 'enviada', 'aprobada', 'recibida'].map(status => (
          <div key={status} className="card text-center">
            <p className="text-2xl font-bold text-slate-800">{data.filter(o => o.status === status).length}</p>
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
              {(row.status === 'enviada') && (
                <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Aprobar">
                  <CheckCircle size={16} />
                </button>
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
