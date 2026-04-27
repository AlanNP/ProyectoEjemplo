import type { User, Obra, Estimacion, Contrato, Factura, NotaCredito, OrdenCompra, Cotizacion, Requisicion, Alert } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Administrador Sistema',
    username: 'admin',
    email: 'admin@constructora.mx',
    role: 'admin',
    department: 'Sistemas',
    permissions: ['obras', 'estimaciones', 'contratos', 'facturas_proveedores', 'facturas_clientes', 'notas_credito_proveedores', 'notas_credito_clientes', 'ordenes_compra', 'cotizaciones', 'requisiciones', 'admin'],
  },
  {
    id: '2',
    name: 'Gerente de Obras',
    username: 'obras',
    email: 'obras@constructora.mx',
    role: 'manager',
    department: 'Control de Obras',
    permissions: ['obras', 'estimaciones', 'contratos'],
  },
  {
    id: '3',
    name: 'Gerente Administrativo',
    username: 'administracion',
    email: 'admin.fin@constructora.mx',
    role: 'manager',
    department: 'Administración',
    permissions: ['facturas_proveedores', 'facturas_clientes', 'notas_credito_proveedores', 'notas_credito_clientes'],
  },
  {
    id: '4',
    name: 'Jefe de Compras',
    username: 'compras',
    email: 'compras@constructora.mx',
    role: 'manager',
    department: 'Compras',
    permissions: ['ordenes_compra', 'cotizaciones', 'requisiciones'],
  },
];

export const MOCK_PASSWORDS: Record<string, string> = {
  admin: 'admin123',
  obras: 'obras123',
  administracion: 'admin123',
  compras: 'compras123',
};

export const MOCK_OBRAS: Obra[] = [
  { id: '1', nombre: 'Torre Residencial Puerta Norte', cliente: 'Inmobiliaria del Norte SA', ubicacion: 'Monterrey, NL', fechaInicio: '2024-01-15', fechaFin: '2025-06-30', presupuesto: 45000000, avance: 72, status: 'activa', responsable: 'Ing. Carlos Mendoza' },
  { id: '2', nombre: 'Centro Comercial Plaza Sur', cliente: 'Grupo Comercial Sureste', ubicacion: 'Guadalajara, JAL', fechaInicio: '2024-03-01', fechaFin: '2025-09-15', presupuesto: 78000000, avance: 45, status: 'activa', responsable: 'Ing. María López' },
  { id: '3', nombre: 'Complejo Industrial Parque 3', cliente: 'Manufactura Integral MX', ubicacion: 'Querétaro, QRO', fechaInicio: '2023-08-10', fechaFin: '2024-12-31', presupuesto: 32000000, avance: 95, status: 'activa', responsable: 'Ing. Roberto Sánchez' },
  { id: '4', nombre: 'Puente Vehicular Km 45', cliente: 'Secretaría de Infraestructura', ubicacion: 'Puebla, PUE', fechaInicio: '2024-02-20', fechaFin: '2024-11-30', presupuesto: 18500000, avance: 88, status: 'activa', responsable: 'Ing. Ana Torres' },
  { id: '5', nombre: 'Edificio Corporativo Las Palmas', cliente: 'Corporativo Las Palmas SA', ubicacion: 'CDMX', fechaInicio: '2023-11-01', fechaFin: '2025-03-31', presupuesto: 62000000, avance: 60, status: 'pausada', responsable: 'Ing. Juan Herrera' },
  { id: '6', nombre: 'Hospital General Regional', cliente: 'Secretaría de Salud', ubicacion: 'León, GTO', fechaInicio: '2023-06-15', fechaFin: '2024-06-14', presupuesto: 95000000, avance: 100, status: 'terminada', responsable: 'Ing. Patricia Ruiz' },
];

export const MOCK_ESTIMACIONES: Estimacion[] = [
  { id: '1', numero: 'EST-2024-001', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte', periodo: 'Enero 2024', monto: 3200000, status: 'pagada', fechaCreacion: '2024-01-31', fechaAprobacion: '2024-02-10' },
  { id: '2', numero: 'EST-2024-002', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte', periodo: 'Febrero 2024', monto: 2800000, status: 'pagada', fechaCreacion: '2024-02-28', fechaAprobacion: '2024-03-08' },
  { id: '3', numero: 'EST-2024-003', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur', periodo: 'Marzo 2024', monto: 5100000, status: 'aprobada', fechaCreacion: '2024-03-31', fechaAprobacion: '2024-04-05' },
  { id: '4', numero: 'EST-2024-004', obraId: '3', obraNombre: 'Complejo Industrial Parque 3', periodo: 'Abril 2024', monto: 1900000, status: 'enviada', fechaCreacion: '2024-04-30' },
  { id: '5', numero: 'EST-2024-005', obraId: '4', obraNombre: 'Puente Vehicular Km 45', periodo: 'Abril 2024', monto: 2200000, status: 'borrador', fechaCreacion: '2024-04-25' },
  { id: '6', numero: 'EST-2024-006', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur', periodo: 'Abril 2024', monto: 4800000, status: 'rechazada', fechaCreacion: '2024-04-30' },
];

export const MOCK_CONTRATOS: Contrato[] = [
  { id: '1', numero: 'CON-2024-001', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte', contratista: 'Inmobiliaria del Norte SA', tipo: 'cliente', monto: 45000000, fechaInicio: '2024-01-15', fechaFin: '2025-06-30', status: 'activo' },
  { id: '2', numero: 'CON-2024-002', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte', contratista: 'Herrería Industrial MX', tipo: 'subcontrato', monto: 3200000, fechaInicio: '2024-02-01', fechaFin: '2025-04-30', status: 'activo' },
  { id: '3', numero: 'CON-2024-003', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur', contratista: 'Grupo Comercial Sureste', tipo: 'cliente', monto: 78000000, fechaInicio: '2024-03-01', fechaFin: '2025-09-15', status: 'activo' },
  { id: '4', numero: 'CON-2024-004', obraId: '3', obraNombre: 'Complejo Industrial Parque 3', contratista: 'Materiales Construcción SA', tipo: 'proveedor', monto: 8500000, fechaInicio: '2023-08-10', fechaFin: '2024-08-09', status: 'vencido' },
  { id: '5', numero: 'CON-2023-005', obraId: '6', obraNombre: 'Hospital General Regional', contratista: 'Secretaría de Salud', tipo: 'cliente', monto: 95000000, fechaInicio: '2023-06-15', fechaFin: '2024-06-14', status: 'completado' },
];

export const MOCK_FACTURAS_PROVEEDORES: Factura[] = [
  { id: '1', folio: 'A-1245', uuid: 'abc123-...', empresa: 'Cementos del Norte SA', rfc: 'CNO800101AAA', concepto: 'Suministro de cemento Portland', subtotal: 125000, iva: 20000, total: 145000, fechaEmision: '2024-04-01', fechaVencimiento: '2024-05-01', status: 'pendiente', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte' },
  { id: '2', folio: 'B-0089', uuid: 'def456-...', empresa: 'Herrería Industrial MX', rfc: 'HIM901215BBB', concepto: 'Fabricación e instalación de estructura metálica', subtotal: 280000, iva: 44800, total: 324800, fechaEmision: '2024-03-15', fechaVencimiento: '2024-04-15', status: 'pagada', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur' },
  { id: '3', folio: 'C-0567', uuid: 'ghi789-...', empresa: 'Materiales Construcción SA', rfc: 'MCS850620CCC', concepto: 'Varilla corrugada 3/8"', subtotal: 95000, iva: 15200, total: 110200, fechaEmision: '2024-02-28', fechaVencimiento: '2024-03-28', status: 'vencida', obraId: '3', obraNombre: 'Complejo Industrial Parque 3' },
  { id: '4', folio: 'D-2341', uuid: 'jkl012-...', empresa: 'Impermeabilizantes Profesionales', rfc: 'IPR920310DDD', concepto: 'Aplicación de impermeabilizante', subtotal: 48000, iva: 7680, total: 55680, fechaEmision: '2024-04-10', fechaVencimiento: '2024-05-10', status: 'pendiente', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte' },
  { id: '5', folio: 'E-0012', uuid: 'mno345-...', empresa: 'Electricidad Moderna SA', rfc: 'EMS780415EEE', concepto: 'Instalaciones eléctricas fase 2', subtotal: 195000, iva: 31200, total: 226200, fechaEmision: '2024-04-05', fechaVencimiento: '2024-05-05', status: 'pendiente', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur' },
];

export const MOCK_FACTURAS_CLIENTES: Factura[] = [
  { id: '1', folio: 'FC-2024-001', uuid: 'cli001-...', empresa: 'Inmobiliaria del Norte SA', rfc: 'INO750102FFF', concepto: 'Estimación 1 - Torre Residencial Puerta Norte', subtotal: 3200000, iva: 512000, total: 3712000, fechaEmision: '2024-02-10', fechaVencimiento: '2024-03-10', status: 'pagada', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte' },
  { id: '2', folio: 'FC-2024-002', uuid: 'cli002-...', empresa: 'Inmobiliaria del Norte SA', rfc: 'INO750102FFF', concepto: 'Estimación 2 - Torre Residencial Puerta Norte', subtotal: 2800000, iva: 448000, total: 3248000, fechaEmision: '2024-03-08', fechaVencimiento: '2024-04-08', status: 'pagada', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte' },
  { id: '3', folio: 'FC-2024-003', uuid: 'cli003-...', empresa: 'Grupo Comercial Sureste', rfc: 'GCS820519GGG', concepto: 'Estimación 1 - Centro Comercial Plaza Sur', subtotal: 5100000, iva: 816000, total: 5916000, fechaEmision: '2024-04-05', fechaVencimiento: '2024-05-05', status: 'pendiente', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur' },
];

export const MOCK_NOTAS_CREDITO_PROVEEDORES: NotaCredito[] = [
  { id: '1', folio: 'NCP-001', uuid: 'ncp001-...', empresa: 'Cementos del Norte SA', rfc: 'CNO800101AAA', facturaRelacionada: 'A-1245', concepto: 'Devolución por material defectuoso', monto: 25000, fecha: '2024-04-15', status: 'vigente' },
  { id: '2', folio: 'NCP-002', uuid: 'ncp002-...', empresa: 'Materiales Construcción SA', rfc: 'MCS850620CCC', facturaRelacionada: 'C-0567', concepto: 'Descuento por volumen de compra', monto: 9500, fecha: '2024-03-20', status: 'aplicada' },
];

export const MOCK_NOTAS_CREDITO_CLIENTES: NotaCredito[] = [
  { id: '1', folio: 'NCC-001', uuid: 'ncc001-...', empresa: 'Inmobiliaria del Norte SA', rfc: 'INO750102FFF', facturaRelacionada: 'FC-2024-001', concepto: 'Ajuste por deductiva de trabajo no ejecutado', monto: 150000, fecha: '2024-02-20', status: 'aplicada' },
  { id: '2', folio: 'NCC-002', uuid: 'ncc002-...', empresa: 'Grupo Comercial Sureste', rfc: 'GCS820519GGG', facturaRelacionada: 'FC-2024-003', concepto: 'Penalización por retraso en obra', monto: 255000, fecha: '2024-04-10', status: 'vigente' },
];

export const MOCK_ORDENES_COMPRA: OrdenCompra[] = [
  { id: '1', numero: 'OC-2024-001', proveedor: 'Cementos del Norte SA', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte', concepto: 'Cemento Portland 50kg x 500 sacos', subtotal: 125000, iva: 20000, total: 145000, fechaEmision: '2024-03-25', fechaEntrega: '2024-04-01', status: 'recibida', solicitante: 'Ing. Carlos Mendoza' },
  { id: '2', numero: 'OC-2024-002', proveedor: 'Materiales Construcción SA', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur', concepto: 'Varilla corrugada #4 - 100 toneladas', subtotal: 380000, iva: 60800, total: 440800, fechaEmision: '2024-04-01', fechaEntrega: '2024-04-15', status: 'aprobada', solicitante: 'Ing. María López' },
  { id: '3', numero: 'OC-2024-003', proveedor: 'Electricidad Moderna SA', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur', concepto: 'Cable eléctrico THHN calibre 10 AWG', subtotal: 45000, iva: 7200, total: 52200, fechaEmision: '2024-04-05', fechaEntrega: '2024-04-20', status: 'enviada', solicitante: 'Ing. María López' },
  { id: '4', numero: 'OC-2024-004', proveedor: 'Impermeabilizantes Profesionales', obraId: '3', obraNombre: 'Complejo Industrial Parque 3', concepto: 'Sistema de impermeabilización completo', subtotal: 48000, iva: 7680, total: 55680, fechaEmision: '2024-04-08', fechaEntrega: '2024-04-25', status: 'borrador', solicitante: 'Ing. Roberto Sánchez' },
];

export const MOCK_COTIZACIONES: Cotizacion[] = [
  { id: '1', numero: 'COT-2024-001', proveedor: 'Pinturas Nacionales SA', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte', concepto: 'Pintura vinílica interior/exterior', monto: 185000, fecha: '2024-04-01', vigencia: '2024-05-01', status: 'pendiente', solicitante: 'Ing. Carlos Mendoza' },
  { id: '2', numero: 'COT-2024-002', proveedor: 'Cristalería Moderna MX', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur', concepto: 'Vidrio templado para fachada', monto: 620000, fecha: '2024-03-20', vigencia: '2024-04-20', status: 'aprobada', solicitante: 'Ing. María López' },
  { id: '3', numero: 'COT-2024-003', proveedor: 'Prefabricados del Bajío', obraId: '3', obraNombre: 'Complejo Industrial Parque 3', concepto: 'Paneles prefabricados para bodega', monto: 1250000, fecha: '2024-03-15', vigencia: '2024-04-15', status: 'vencida', solicitante: 'Ing. Roberto Sánchez' },
  { id: '4', numero: 'COT-2024-004', proveedor: 'Plomería y Gas Industrial', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte', concepto: 'Instalaciones hidrosanitarias piso 10-15', monto: 340000, fecha: '2024-04-10', vigencia: '2024-05-10', status: 'pendiente', solicitante: 'Ing. Carlos Mendoza' },
];

export const MOCK_REQUISICIONES: Requisicion[] = [
  { id: '1', numero: 'REQ-2024-001', departamento: 'Control de Obras', obraId: '1', obraNombre: 'Torre Residencial Puerta Norte', concepto: 'Andamios metálicos', cantidad: 50, unidad: 'módulos', descripcion: 'Andamios tubulares tipo multidireccional para acabados exteriores', urgencia: 'normal', status: 'cotizada', solicitante: 'Ing. Carlos Mendoza', fechaCreacion: '2024-04-08' },
  { id: '2', numero: 'REQ-2024-002', departamento: 'Control de Obras', obraId: '2', obraNombre: 'Centro Comercial Plaza Sur', concepto: 'Concreto premezclado f\'c=250', cantidad: 200, unidad: 'm³', descripcion: 'Concreto para losas de estacionamiento nivel -1 y -2', urgencia: 'urgente', status: 'aprobada', solicitante: 'Ing. María López', fechaCreacion: '2024-04-10' },
  { id: '3', numero: 'REQ-2024-003', departamento: 'Administración', concepto: 'Material de oficina', cantidad: 1, unidad: 'lote', descripcion: 'Papelería, tintas, folders y artículos de oficina para Q2', urgencia: 'normal', status: 'pendiente', solicitante: 'Asistente Admin', fechaCreacion: '2024-04-12' },
  { id: '4', numero: 'REQ-2024-004', departamento: 'Control de Obras', obraId: '4', obraNombre: 'Puente Vehicular Km 45', concepto: 'Grúa telescópica 50 toneladas', cantidad: 1, unidad: 'unidad', descripcion: 'Renta de grúa para colocación de vigas prefabricadas', urgencia: 'muy_urgente', status: 'pendiente', solicitante: 'Ing. Ana Torres', fechaCreacion: '2024-04-14' },
];

export const MOCK_ALERTS: Alert[] = [
  { id: '1', tipo: 'error', titulo: 'Factura vencida', mensaje: 'La factura C-0567 de Materiales Construcción SA por $110,200 ha vencido sin pago.', fecha: '2024-04-14', leida: false, modulo: 'Facturas Proveedores' },
  { id: '2', tipo: 'warning', titulo: 'Contrato próximo a vencer', mensaje: 'El contrato CON-2024-004 con Materiales Construcción SA vence en 15 días.', fecha: '2024-04-12', leida: false, modulo: 'Contratos' },
  { id: '3', tipo: 'warning', titulo: 'Estimación rechazada', mensaje: 'La estimación EST-2024-006 por $4,800,000 fue rechazada. Se requiere revisión.', fecha: '2024-04-11', leida: false, modulo: 'Estimaciones' },
  { id: '4', tipo: 'info', titulo: 'Cotización por aprobar', mensaje: 'La cotización COT-2024-001 de Pinturas Nacionales SA por $185,000 está pendiente de aprobación.', fecha: '2024-04-10', leida: true, modulo: 'Cotizaciones' },
  { id: '5', tipo: 'success', titulo: 'Pago recibido', mensaje: 'Se recibió pago por $3,248,000 de Inmobiliaria del Norte SA (FC-2024-002).', fecha: '2024-04-08', leida: true, modulo: 'Facturas Clientes' },
  { id: '6', tipo: 'warning', titulo: 'Obra con avance bajo', mensaje: 'La obra "Centro Comercial Plaza Sur" tiene 45% de avance pero ya consumió 60% del plazo.', fecha: '2024-04-07', leida: false, modulo: 'Obras' },
];

export const MONTHLY_DATA = [
  { mes: 'Oct', ingresos: 8200000, gastos: 5100000 },
  { mes: 'Nov', ingresos: 9500000, gastos: 6300000 },
  { mes: 'Dic', ingresos: 7800000, gastos: 4900000 },
  { mes: 'Ene', ingresos: 11200000, gastos: 7800000 },
  { mes: 'Feb', ingresos: 12500000, gastos: 8200000 },
  { mes: 'Mar', ingresos: 10800000, gastos: 7100000 },
  { mes: 'Abr', ingresos: 13200000, gastos: 8900000 },
];
