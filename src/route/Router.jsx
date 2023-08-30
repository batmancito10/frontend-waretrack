import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from '../pages/Login';
import App from '../App';
import Dashboard from '../pages/views/Dashboard'
import Profile from '../pages/views/Profile'

function Router () {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
            errorElement: <Login />
        },
        {
            path: '/app',
            element: <App />,
            errorElement: <App />,
            children: 
            [
                {
                    path: 'dashboard',
                    element: <Dashboard />,
                },
                {
                    path: 'profile',
                    element: <Profile />
                }
            ]
        }
    ])

    return <RouterProvider router={router}/>
}

export default Router