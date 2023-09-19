import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function Logout () {
    const [check, setCheck] = useState(false)
    
    const destroyUserSession = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userInfo')
    }

    const logoutRequest = async () => {
        const response = await fetch(import.meta.env.VITE_TOKEN, {
            mode: 'cors',
            method: 'delete',
        })
        if(response.status !== 200){
            throw new Error(' Error al cerrar la sesión')
        }
    }

    useEffect(() => {
        destroyUserSession();
        logoutRequest()
        .then(() => {
            setCheck(true);
        })
        .catch((err) => {
            alert(err);
            setCheck(true);
        })
    }, [])

    return (
        !check ? <h1>Logging out</h1> : <Navigate to='/login'/>
    )
}

export default Logout