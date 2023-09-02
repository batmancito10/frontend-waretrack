import { BrowserRouter, Routes, Route, Link, createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from '../pages/Login';
import App from '../App';
import Dashboard from '../pages/views/Dashboard'
import Profile from '../pages/views/Profile'
import Notfound from '../components/utils/Notfound'
import RouteProtector from '../components/utils/RouteProtector'

function Router () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<RouteProtector />}>
                    <Route path="/" element={<App />} exact>
                        <Route path="dashboard" element={<Dashboard />}/>
                        <Route index element={<Dashboard />}/>
                        <Route path="profile" element={<Profile />}/>
                    </Route>
                    <Route path="*" element={<Notfound />}/>
                </Route>
                <Route path="*" element={<Notfound />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router