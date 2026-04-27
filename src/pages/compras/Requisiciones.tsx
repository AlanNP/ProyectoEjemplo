import { useState } from 'react';
import { ClipboardCheck, Plus, Eye, Pencil, CheckCircle, XCircle } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_REQUISICIONES } from '../../data/mockData';
import type { Requisicion } from '../../types';

const statusBadge: Record<string, string> = {
  pendiente: 'badge-yellow',
  aprobada: 'badge-green',
  rechazada: 'badge-red',
  cotizada: 'badge-blue',
  completada: 'badge-gray',
};

const statusLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
  cotizada: 'Cotizada',
  completada: 'Completada',
};

const urgenciaBadge: Record<string, string> = {
  normal: 'badge-gray',
  urgente: 'badge-yellow',
  muy_urgente: 'badge-red',
};

const urgenciaLabel: Record<string, string> = {
  normal: 'Normal',
  urgente: 'Urgente',
  muy_urgente: 'Muy Urgente',
};

export default function Requisiciones() {
  const [data] = useState<Requisicion[]>(MOCK_REQUISICIONES);

  const columns = [
    { key: 'numero', label: 'Número', render: (row: Requisicion) => (
      <span className="font-mono font-medium text-slate-700">{row.numero}</span>
    )},
    { key: 'concepto', label: 'Concepto', render: (row: Requisicion) => (
      <div>
        <p className="font-medium text-slate-700 text-sm">{row.concepto}</p>
        <p className="text-xs text-slate-400">{row.cantidad} {row.unidad}</p>
      </div>
    )},
    { key: 'obraNombre', label: 'Obra', className: 'hidden lg:table-cell', render: (row: Requisicion) => (
      <p className="text-sm text-slate-600 truncate max-w-xs">{row.obraNombre || row.departamento}</p>
    )},
    { key: 'descripcion', label: 'Descripción', className: 'hidden xl:table-cell', render: (row: Requisicion) => (
      <p className="text-sm text-slate-600 truncate max-w-xs">{row.descripcion}</p>
    )},
    { key: 'urgencia', label: 'Urgencia', render: (row: Requisicion) => (
      <span className={urgenciaBadge[row.urgencia]}>{urgenciaLabel[row.urgencia]}</span>
    )},
    { key: 'solicitante', label: 'Solicitante', className: 'hidden md:table-cell' },
    { key: 'fechaCreacion', label: 'Fecha', className: 'hidden md:table-cell' },
    { key: 'status', label: 'Estado', render: (row: Requisicion) => (
      <span className={statusBadge[row.status]}>{statusLabel[row.status]}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Requisiciones"
        subtitle="Solicitudes internas de materiales y servicios"
        icon={<ClipboardCheck size={20} />}
        actions={
          <button className="btn-primary">
            <Plus size={16} />
            Nueva Requisición
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(statusLabel).map(([key, label]) => (
          <div key={key} className="card text-center">
            <p className="text-2xl font-bold text-slate-800">{data.filter(r => r.status === key).length}</p>
            <p className="text-sm text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <DataTable
          data={data}
          columns={columns}
          searchKeys={['numero', 'concepto', 'obraNombre', 'solicitante', 'departamento']}
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
