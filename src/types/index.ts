export type Permission =
  | 'obras'
  | 'estimaciones'
  | 'contratos'
  | 'facturas_proveedores'
  | 'facturas_clientes'
  | 'notas_credito_proveedores'
  | 'notas_credito_clientes'
  | 'ordenes_compra'
  | 'cotizaciones'
  | 'requisiciones'
  | 'admin';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  permissions: Permission[];
  avatar?: string;
  department?: string;
}

export interface Obra {
  id: string;
  nombre: string;
  cliente: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  presupuesto: number;
  avance: number;
  status: 'activa' | 'pausada' | 'terminada' | 'cancelada';
  responsable: string;
}

export interface Estimacion {
  id: string;
  numero: string;
  obraId: string;
  obraNombre: string;
  periodo: string;
  monto: number;
  status: 'borrador' | 'enviada' | 'aprobada' | 'rechazada' | 'pagada';
  fechaCreacion: string;
  fechaAprobacion?: string;
}

export interface Contrato {
  id: string;
  numero: string;
  obraId: string;
  obraNombre: string;
  contratista: string;
  tipo: 'subcontrato' | 'proveedor' | 'cliente';
  monto: number;
  fechaInicio: string;
  fechaFin: string;
  status: 'activo' | 'vencido' | 'cancelado' | 'completado';
}

export interface Factura {
  id: string;
  folio: string;
  uuid: string;
  empresa: string;
  rfc: string;
  concepto: string;
  subtotal: number;
  iva: number;
  total: number;
  fechaEmision: string;
  fechaVencimiento: string;
  status: 'pendiente' | 'pagada' | 'vencida' | 'cancelada';
  obraId?: string;
  obraNombre?: string;
}

export interface NotaCredito {
  id: string;
  folio: string;
  uuid: string;
  empresa: string;
  rfc: string;
  facturaRelacionada: string;
  concepto: string;
  monto: number;
  fecha: string;
  status: 'vigente' | 'aplicada' | 'cancelada';
}

export interface OrdenCompra {
  id: string;
  numero: string;
  proveedor: string;
  obraId?: string;
  obraNombre?: string;
  concepto: string;
  subtotal: number;
  iva: number;
  total: number;
  fechaEmision: string;
  fechaEntrega: string;
  status: 'borrador' | 'enviada' | 'aprobada' | 'recibida' | 'cancelada';
  solicitante: string;
}

export interface Cotizacion {
  id: string;
  numero: string;
  proveedor: string;
  obraId?: string;
  obraNombre?: string;
  concepto: string;
  monto: number;
  fecha: string;
  vigencia: string;
  status: 'pendiente' | 'aprobada' | 'rechazada' | 'vencida';
  solicitante: string;
}

export interface Requisicion {
  id: string;
  numero: string;
  departamento: string;
  obraId?: string;
  obraNombre?: string;
  concepto: string;
  cantidad: number;
  unidad: string;
  descripcion: string;
  urgencia: 'normal' | 'urgente' | 'muy_urgente';
  status: 'pendiente' | 'aprobada' | 'rechazada' | 'cotizada' | 'completada';
  solicitante: string;
  fechaCreacion: string;
}

export interface Alert {
  id: string;
  tipo: 'warning' | 'error' | 'info' | 'success';
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  modulo: string;
}

export interface DashboardStats {
  obrasActivas: number;
  presupuestoTotal: number;
  facturasPendientes: number;
  ordenesCompra: number;
  contratosActivos: number;
  estimacionesPendientes: number;
}
