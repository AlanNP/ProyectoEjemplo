import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  actions?: (row: T) => React.ReactNode;
  emptyText?: string;
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  searchable = true,
  searchKeys = [],
  actions,
  emptyText = 'No hay registros',
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = search
    ? data.filter(row =>
        searchKeys.some(key => {
          const val = row[key];
          return String(val).toLowerCase().includes(search.toLowerCase());
        })
      )
    : data;

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getValue = (row: T, key: string): unknown => {
    return (row as Record<string, unknown>)[key];
  };

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="input-field pl-9 text-sm"
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map(col => (
                <th key={String(col.key)} className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide ${col.className || ''}`}>
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-12 text-center text-slate-400">
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-slate-100 hover:bg-slate-50/70 transition-colors ${idx % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                  {columns.map(col => (
                    <td key={String(col.key)} className={`px-4 py-3 text-slate-700 ${col.className || ''}`}>
                      {col.render ? col.render(row) : String(getValue(row, String(col.key)) ?? '')}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{filtered.length} registros · Página {page} de {totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg hover:bg-slate-200 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg hover:bg-slate-200 disabled:opacity-40 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
