import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Logout from '../components/utils/Logout';
import App from '../App';
import Dashboard from '../pages/views/Dashboard';
import Usuarios from '../pages/views/Usuarios';
import PedidosProveedores from '../pages/views/PedidosProveedores';
import Notfound from '../components/utils/Notfound';
import RouteProtector from '../components/utils/RouteProtector';
import PerfilProveedor from '../pages/views/PerfilProveedor';
import CategoriasServicios from '../pages/views/CategoriasServicios';
import Stock from '../pages/views/Stock';
import StockTable from '../containers/StockTable';
import Ventas from '../pages/views/Ventas';
import Facturas from '../pages/views/Facturas';
import ListarFacturas from '../components/facturas/ListarFacturas';
import PerfilSede from '../pages/views/PerfilSede';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<RouteProtector />}>
          <Route path="/" element={<App />} exact>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route
              path="pedidos-proveedores"
              element={<PedidosProveedores />}
            />
            <Route path="detalle-proveedor" element={<PerfilProveedor />} />
            <Route path="detalle-sede/:id" element={<PerfilSede />} />
            <Route
              path="categorias-servicios"
              element={<CategoriasServicios />}
            />
            <Route path="stock" element={<Stock />} />
            <Route path="stock-sede" element={<StockTable />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="facturas" element={<Facturas />} />
            <Route path="facturas/lista/:id" element={<ListarFacturas />} />
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
