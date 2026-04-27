import { useState } from 'react';
import { ClipboardList, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_CONTRATOS } from '../../data/mockData';
import type { Contrato } from '../../types';

const statusBadge: Record<string, string> = {
  activo: 'badge-green',
  vencido: 'badge-red',
  cancelado: 'badge-gray',
  completado: 'badge-blue',
};

const statusLabel: Record<string, string> = {
  activo: 'Activo',
  vencido: 'Vencido',
  cancelado: 'Cancelado',
  completado: 'Completado',
};

const tipoBadge: Record<string, string> = {
  cliente: 'badge-blue',
  subcontrato: 'badge-yellow',
  proveedor: 'badge-gray',
};

const tipoLabel: Record<string, string> = {
  cliente: 'Cliente',
  subcontrato: 'Subcontrato',
  proveedor: 'Proveedor',
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);

export default function Contratos() {
  const [data] = useState<Contrato[]>(MOCK_CONTRATOS);

  const columns = [
    { key: 'numero', label: 'Número', render: (row: Contrato) => (
      <span className="font-mono text-sm font-medium text-slate-700">{row.numero}</span>
    )},
    { key: 'obraNombre', label: 'Obra', render: (row: Contrato) => (
      <p className="text-sm text-slate-700 max-w-xs truncate">{row.obraNombre}</p>
    )},
    { key: 'contratista', label: 'Contratista/Empresa' },
    { key: 'tipo', label: 'Tipo', render: (row: Contrato) => (
      <span className={tipoBadge[row.tipo]}>{tipoLabel[row.tipo]}</span>
    )},
    { key: 'monto', label: 'Monto', render: (row: Contrato) => (
      <span className="font-semibold">{formatCurrency(row.monto)}</span>
    )},
    { key: 'fechaFin', label: 'Vigencia', className: 'hidden md:table-cell', render: (row: Contrato) => (
      <div>
        <p className="text-sm">{row.fechaInicio}</p>
        <p className="text-xs text-slate-400">hasta {row.fechaFin}</p>
      </div>
    )},
    { key: 'status', label: 'Estado', render: (row: Contrato) => (
      <span className={statusBadge[row.status]}>{statusLabel[row.status]}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contratos"
        subtitle="Gestión de contratos con clientes, subcontratistas y proveedores"
        icon={<ClipboardList size={20} />}
        actions={
          <button className="btn-primary">
            <Plus size={16} />
            Nuevo Contrato
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-blue-600">{data.filter(c => c.tipo === 'cliente').length}</p>
          <p className="text-sm text-slate-500 mt-1">Contratos Cliente</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-yellow-600">{data.filter(c => c.tipo === 'subcontrato').length}</p>
          <p className="text-sm text-slate-500 mt-1">Subcontratos</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-red-600">{data.filter(c => c.status === 'vencido').length}</p>
          <p className="text-sm text-slate-500 mt-1">Vencidos</p>
        </div>
      </div>

      <div className="card">
        <DataTable
          data={data}
          columns={columns}
          searchKeys={['numero', 'obraNombre', 'contratista']}
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
