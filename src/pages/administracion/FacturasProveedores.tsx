import { useState } from 'react';
import { Receipt, Plus, Eye, Pencil, Download } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_FACTURAS_PROVEEDORES } from '../../data/mockData';
import type { Factura } from '../../types';

const statusBadge: Record<string, string> = {
  pendiente: 'badge-yellow',
  pagada: 'badge-green',
  vencida: 'badge-red',
  cancelada: 'badge-gray',
};

const statusLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  pagada: 'Pagada',
  vencida: 'Vencida',
  cancelada: 'Cancelada',
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);

export default function FacturasProveedores() {
  const [data] = useState<Factura[]>(MOCK_FACTURAS_PROVEEDORES);

  const columns = [
    { key: 'folio', label: 'Folio', render: (row: Factura) => (
      <div>
        <p className="font-mono font-medium text-slate-700 text-sm">{row.folio}</p>
        <p className="text-xs text-slate-400 truncate max-w-32">{row.uuid}</p>
      </div>
    )},
    { key: 'empresa', label: 'Proveedor', render: (row: Factura) => (
      <div>
        <p className="font-medium text-slate-700 text-sm">{row.empresa}</p>
        <p className="text-xs text-slate-400 font-mono">{row.rfc}</p>
      </div>
    )},
    { key: 'concepto', label: 'Concepto', className: 'hidden lg:table-cell', render: (row: Factura) => (
      <p className="text-sm text-slate-600 max-w-xs truncate">{row.concepto}</p>
    )},
    { key: 'total', label: 'Total', render: (row: Factura) => (
      <span className="font-bold text-slate-800">{formatCurrency(row.total)}</span>
    )},
    { key: 'fechaEmision', label: 'Emisión', className: 'hidden md:table-cell' },
    { key: 'fechaVencimiento', label: 'Vencimiento', className: 'hidden md:table-cell' },
    { key: 'status', label: 'Estado', render: (row: Factura) => (
      <span className={statusBadge[row.status]}>{statusLabel[row.status]}</span>
    )},
  ];

  const totalPendiente = data.filter(f => f.status === 'pendiente').reduce((a, f) => a + f.total, 0);
  const totalVencido = data.filter(f => f.status === 'vencida').reduce((a, f) => a + f.total, 0);
  const totalPagado = data.filter(f => f.status === 'pagada').reduce((a, f) => a + f.total, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Facturas de Proveedores"
        subtitle="Gestión de facturas de cuentas por pagar"
        icon={<Receipt size={20} />}
        actions={
          <div className="flex gap-2">
            <button className="btn-secondary">
              <Download size={16} />
              Exportar
            </button>
            <button className="btn-primary">
              <Plus size={16} />
              Registrar Factura
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center border-l-4 border-l-yellow-400">
          <p className="text-lg font-bold text-yellow-600">{formatCurrency(totalPendiente)}</p>
          <p className="text-sm text-slate-500 mt-1">Por Pagar</p>
          <p className="text-xs text-slate-400">{data.filter(f => f.status === 'pendiente').length} facturas</p>
        </div>
        <div className="card text-center border-l-4 border-l-red-400">
          <p className="text-lg font-bold text-red-600">{formatCurrency(totalVencido)}</p>
          <p className="text-sm text-slate-500 mt-1">Vencidas</p>
          <p className="text-xs text-slate-400">{data.filter(f => f.status === 'vencida').length} facturas</p>
        </div>
        <div className="card text-center border-l-4 border-l-green-400">
          <p className="text-lg font-bold text-green-600">{formatCurrency(totalPagado)}</p>
          <p className="text-sm text-slate-500 mt-1">Pagadas</p>
          <p className="text-xs text-slate-400">{data.filter(f => f.status === 'pagada').length} facturas</p>
        </div>
      </div>

      <div className="card">
        <DataTable
          data={data}
          columns={columns}
          searchKeys={['folio', 'empresa', 'rfc', 'concepto']}
          actions={(row) => (
            <>
              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver CFDI">
                <Eye size={16} />
              </button>
              {row.status === 'pendiente' && (
                <button className="px-2 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors font-medium">
                  Pagar
                </button>
              )}
              <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Editar">
                <Pencil size={16} />
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
}
