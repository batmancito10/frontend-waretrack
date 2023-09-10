import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from '../pages/Login';
import Logout from '../components/utils/Logout';
import App from '../App';
import Dashboard from '../pages/views/Dashboard'
import Usuarios from '../pages/views/Usuarios'
import Notfound from '../components/utils/Notfound'
import RouteProtector from '../components/utils/RouteProtector'

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