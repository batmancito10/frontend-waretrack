import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from '../pages/Login';
import Logout from '../components/utils/Logout';
import App from '../App';
import Dashboard from '../pages/views/Dashboard'
import Usuarios from '../pages/views/Usuarios'
import PedidosProveedores from '../pages/views/PedidosProveedores'
import Notfound from '../components/utils/Notfound'
import RouteProtector from '../components/utils/RouteProtector'
import PerfilProveedor from "../pages/views/perfilProveedor";
import CategoriasServicios from "../pages/views/CategoriasServicios";
import Stock from "../pages/views/Stock";
import StockTable from "../containers/StockTable"

function Router () {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route element={<RouteProtector />}>
                    <Route path="/" element={<App />} exact>
                        <Route path="dashboard" element={<Dashboard />}/>
                        <Route path="usuarios" element={<Usuarios />}/>
                        <Route path="pedidos-proveedores"  element={<PedidosProveedores />}/>
                        <Route path="detalle-proveedor"  element={<PerfilProveedor />}/>
                        <Route path="categorias-servicios" element={<CategoriasServicios/>}/>
                        <Route path="stock" element={<Stock/>}/>
                        <Route path="stock-sede" element={<StockTable/>}/>
                        <Route index element={<Dashboard />}/>
                    </Route>
                    <Route path="*" element={<Notfound />}/>
                </Route>
                <Route path="*" element={<Notfound />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router