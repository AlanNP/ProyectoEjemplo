import { useState } from 'react';
import { FileX, Plus, Eye } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_NOTAS_CREDITO_PROVEEDORES } from '../../data/mockData';
import type { NotaCredito } from '../../types';

const statusBadge: Record<string, string> = {
  vigente: 'badge-green',
  aplicada: 'badge-blue',
  cancelada: 'badge-gray',
};

const statusLabel: Record<string, string> = {
  vigente: 'Vigente',
  aplicada: 'Aplicada',
  cancelada: 'Cancelada',
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);

export default function NotasCreditoProveedores() {
  const [data] = useState<NotaCredito[]>(MOCK_NOTAS_CREDITO_PROVEEDORES);

  const columns = [
    { key: 'folio', label: 'Folio', render: (row: NotaCredito) => (
      <span className="font-mono font-medium text-slate-700">{row.folio}</span>
    )},
    { key: 'empresa', label: 'Proveedor', render: (row: NotaCredito) => (
      <div>
        <p className="font-medium text-slate-700 text-sm">{row.empresa}</p>
        <p className="text-xs text-slate-400 font-mono">{row.rfc}</p>
      </div>
    )},
    { key: 'facturaRelacionada', label: 'Factura Relacionada', render: (row: NotaCredito) => (
      <span className="font-mono text-sm text-blue-600">{row.facturaRelacionada}</span>
    )},
    { key: 'concepto', label: 'Concepto', className: 'hidden lg:table-cell', render: (row: NotaCredito) => (
      <p className="text-sm text-slate-600 truncate max-w-xs">{row.concepto}</p>
    )},
    { key: 'monto', label: 'Monto', render: (row: NotaCredito) => (
      <span className="font-bold text-slate-800">{formatCurrency(row.monto)}</span>
    )},
    { key: 'fecha', label: 'Fecha' },
    { key: 'status', label: 'Estado', render: (row: NotaCredito) => (
      <span className={statusBadge[row.status]}>{statusLabel[row.status]}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notas de Crédito de Proveedores"
        subtitle="Gestión de notas de crédito recibidas de proveedores"
        icon={<FileX size={20} />}
        actions={
          <button className="btn-primary">
            <Plus size={16} />
            Registrar Nota
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">{data.filter(n => n.status === 'vigente').length}</p>
          <p className="text-sm text-slate-500 mt-1">Vigentes</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-blue-600">{data.filter(n => n.status === 'aplicada').length}</p>
          <p className="text-sm text-slate-500 mt-1">Aplicadas</p>
        </div>
        <div className="card text-center">
          <p className="text-lg font-bold text-slate-800">
            {formatCurrency(data.reduce((a, n) => a + n.monto, 0))}
          </p>
          <p className="text-sm text-slate-500 mt-1">Monto Total</p>
        </div>
      </div>

      <div className="card">
        <DataTable
          data={data}
          columns={columns}
          searchKeys={['folio', 'empresa', 'rfc', 'facturaRelacionada']}
          actions={(_row) => (
            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Eye size={16} />
            </button>
          )}
        />
      </div>
    </div>
  );
}
