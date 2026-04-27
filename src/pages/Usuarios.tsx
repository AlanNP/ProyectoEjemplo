import { useState } from 'react';
import { Users, Plus, Pencil, Shield } from 'lucide-react';
import DataTable from '../components/common/DataTable';
import PageHeader from '../components/common/PageHeader';
import { MOCK_USERS } from '../data/mockData';
import type { User, Permission } from '../types';

const roleBadge: Record<string, string> = {
  admin: 'badge-red',
  manager: 'badge-blue',
  user: 'badge-gray',
};

const roleLabel: Record<string, string> = {
  admin: 'Administrador',
  manager: 'Gerente',
  user: 'Usuario',
};

const PERM_LABELS: Record<Permission, string> = {
  obras: 'Obras',
  estimaciones: 'Estimaciones',
  contratos: 'Contratos',
  facturas_proveedores: 'Fact. Proveedores',
  facturas_clientes: 'Fact. Clientes',
  notas_credito_proveedores: 'NC Proveedores',
  notas_credito_clientes: 'NC Clientes',
  ordenes_compra: 'Órdenes Compra',
  cotizaciones: 'Cotizaciones',
  requisiciones: 'Requisiciones',
  admin: 'Administración',
};

export default function Usuarios() {
  const [data] = useState<User[]>(MOCK_USERS);
  const [selected, setSelected] = useState<User | null>(null);

  const columns = [
    { key: 'name', label: 'Nombre', render: (row: User) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-primary-700 text-xs font-bold">
            {row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </span>
        </div>
        <div>
          <p className="font-medium text-slate-800 text-sm">{row.name}</p>
          <p className="text-xs text-slate-400">{row.email}</p>
        </div>
      </div>
    )},
    { key: 'username', label: 'Usuario', render: (row: User) => (
      <span className="font-mono text-sm text-slate-600">{row.username}</span>
    )},
    { key: 'department', label: 'Departamento', className: 'hidden md:table-cell' },
    { key: 'role', label: 'Rol', render: (row: User) => (
      <span className={roleBadge[row.role]}>{roleLabel[row.role]}</span>
    )},
    { key: 'permissions', label: 'Permisos', render: (row: User) => (
      <span className="text-sm text-slate-600">{row.permissions.length} módulos</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuarios y Permisos"
        subtitle="Gestión de accesos y permisos del sistema"
        icon={<Users size={20} />}
        actions={
          <button className="btn-primary">
            <Plus size={16} />
            Nuevo Usuario
          </button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Users table */}
        <div className="lg:col-span-2 card">
          <DataTable
            data={data}
            columns={columns}
            searchKeys={['name', 'username', 'email', 'department']}
            actions={(row) => (
              <>
                <button
                  onClick={() => setSelected(row)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Ver permisos"
                >
                  <Shield size={16} />
                </button>
                <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                  <Pencil size={16} />
                </button>
              </>
            )}
          />
        </div>

        {/* Permission detail */}
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-primary-600" />
            {selected ? `Permisos: ${selected.name.split(' ')[0]}` : 'Selecciona un usuario'}
          </h3>
          {selected ? (
            <div className="space-y-2">
              <div className="mb-3 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-slate-700">{selected.name}</p>
                <p className="text-xs text-slate-500">{selected.email}</p>
                <span className={`${roleBadge[selected.role]} mt-1`}>{roleLabel[selected.role]}</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Módulos con acceso</p>
              <div className="space-y-1.5">
                {(Object.keys(PERM_LABELS) as Permission[]).map(perm => {
                  const hasPerm = selected.permissions.includes(perm);
                  return (
                    <div key={perm} className={`flex items-center justify-between p-2 rounded-lg text-sm ${hasPerm ? 'bg-green-50' : 'bg-slate-50'}`}>
                      <span className={hasPerm ? 'text-green-700 font-medium' : 'text-slate-400'}>
                        {PERM_LABELS[perm]}
                      </span>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${hasPerm ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                        {hasPerm ? '✓' : '×'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-8">
              Haz clic en el ícono de escudo de un usuario para ver sus permisos
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
