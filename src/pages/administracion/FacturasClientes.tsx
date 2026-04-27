import { useState } from 'react';
import { CreditCard, Plus, Eye, Download } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_FACTURAS_CLIENTES } from '../../data/mockData';
import type { Factura } from '../../types';

const statusBadge: Record<string, string> = {
  pendiente: 'badge-yellow',
  pagada: 'badge-green',
  vencida: 'badge-red',
  cancelada: 'badge-gray',
};

const statusLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  pagada: 'Cobrada',
  vencida: 'Vencida',
  cancelada: 'Cancelada',
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);

export default function FacturasClientes() {
  const [data] = useState<Factura[]>(MOCK_FACTURAS_CLIENTES);

  const columns = [
    { key: 'folio', label: 'Folio', render: (row: Factura) => (
      <span className="font-mono font-medium text-slate-700">{row.folio}</span>
    )},
    { key: 'empresa', label: 'Cliente', render: (row: Factura) => (
      <div>
        <p className="font-medium text-slate-700 text-sm">{row.empresa}</p>
        <p className="text-xs text-slate-400 font-mono">{row.rfc}</p>
      </div>
    )},
    { key: 'obraNombre', label: 'Obra', className: 'hidden lg:table-cell', render: (row: Factura) => (
      <p className="text-sm text-slate-600 truncate max-w-xs">{row.obraNombre || '—'}</p>
    )},
    { key: 'concepto', label: 'Concepto', className: 'hidden xl:table-cell', render: (row: Factura) => (
      <p className="text-sm text-slate-600 truncate max-w-xs">{row.concepto}</p>
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
  const totalCobrado = data.filter(f => f.status === 'pagada').reduce((a, f) => a + f.total, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Facturas de Clientes"
        subtitle="Gestión de facturas de cuentas por cobrar"
        icon={<CreditCard size={20} />}
        actions={
          <div className="flex gap-2">
            <button className="btn-secondary">
              <Download size={16} />
              Exportar
            </button>
            <button className="btn-primary">
              <Plus size={16} />
              Emitir Factura
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center border-l-4 border-l-yellow-400">
          <p className="text-lg font-bold text-yellow-600">{formatCurrency(totalPendiente)}</p>
          <p className="text-sm text-slate-500 mt-1">Por Cobrar</p>
          <p className="text-xs text-slate-400">{data.filter(f => f.status === 'pendiente').length} facturas</p>
        </div>
        <div className="card text-center border-l-4 border-l-green-400">
          <p className="text-lg font-bold text-green-600">{formatCurrency(totalCobrado)}</p>
          <p className="text-sm text-slate-500 mt-1">Cobrado</p>
          <p className="text-xs text-slate-400">{data.filter(f => f.status === 'pagada').length} facturas</p>
        </div>
        <div className="card text-center border-l-4 border-l-blue-400">
          <p className="text-lg font-bold text-blue-600">{formatCurrency(totalPendiente + totalCobrado)}</p>
          <p className="text-sm text-slate-500 mt-1">Total Facturado</p>
          <p className="text-xs text-slate-400">{data.length} facturas</p>
        </div>
      </div>

      <div className="card">
        <DataTable
          data={data}
          columns={columns}
          searchKeys={['folio', 'empresa', 'rfc', 'concepto']}
          actions={(_row) => (
            <>
              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver CFDI">
                <Eye size={16} />
              </button>
              <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Descargar PDF">
                <Download size={16} />
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
}
