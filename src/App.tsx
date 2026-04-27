import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/Layout/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Obras from './pages/obras/Obras';
import Estimaciones from './pages/obras/Estimaciones';
import Contratos from './pages/obras/Contratos';
import FacturasProveedores from './pages/administracion/FacturasProveedores';
import FacturasClientes from './pages/administracion/FacturasClientes';
import NotasCreditoProveedores from './pages/administracion/NotasCreditoProveedores';
import NotasCreditoClientes from './pages/administracion/NotasCreditoClientes';
import OrdenesCompra from './pages/compras/OrdenesCompra';
import Cotizaciones from './pages/compras/Cotizaciones';
import Requisiciones from './pages/compras/Requisiciones';
import Usuarios from './pages/Usuarios';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="obras" element={
              <ProtectedRoute permission="obras"><Obras /></ProtectedRoute>
            } />
            <Route path="estimaciones" element={
              <ProtectedRoute permission="estimaciones"><Estimaciones /></ProtectedRoute>
            } />
            <Route path="contratos" element={
              <ProtectedRoute permission="contratos"><Contratos /></ProtectedRoute>
            } />

            <Route path="facturas-proveedores" element={
              <ProtectedRoute permission="facturas_proveedores"><FacturasProveedores /></ProtectedRoute>
            } />
            <Route path="facturas-clientes" element={
              <ProtectedRoute permission="facturas_clientes"><FacturasClientes /></ProtectedRoute>
            } />
            <Route path="notas-credito-proveedores" element={
              <ProtectedRoute permission="notas_credito_proveedores"><NotasCreditoProveedores /></ProtectedRoute>
            } />
            <Route path="notas-credito-clientes" element={
              <ProtectedRoute permission="notas_credito_clientes"><NotasCreditoClientes /></ProtectedRoute>
            } />

            <Route path="ordenes-compra" element={
              <ProtectedRoute permission="ordenes_compra"><OrdenesCompra /></ProtectedRoute>
            } />
            <Route path="cotizaciones" element={
              <ProtectedRoute permission="cotizaciones"><Cotizaciones /></ProtectedRoute>
            } />
            <Route path="requisiciones" element={
              <ProtectedRoute permission="requisiciones"><Requisiciones /></ProtectedRoute>
            } />

            <Route path="usuarios" element={
              <ProtectedRoute permission="admin"><Usuarios /></ProtectedRoute>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
