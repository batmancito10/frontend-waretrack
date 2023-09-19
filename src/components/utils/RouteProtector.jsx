import { useState, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom"

function RouteProtector ({ redirectPath = '/login' }) {
    const [check, setCheck] = useState('checking')
    const sessionToken = localStorage.getItem('accessToken')

    if(sessionToken === null) {
        return <Navigate to={redirectPath}/>
    }
    
    
    const checkToken = async (sessionToken) => {
        const response = await fetch(import.meta.env.VITE_TOKEN_VERIFY, {
            mode: 'cors',
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                token: sessionToken,
            })
        });
        if(response.status !== 200){
            throw new Error(' La sesión no pudo ser validada, intente nuevamente.');
        }
    }

    useEffect(() => {
        checkToken(sessionToken)
        .then(() => {
            setCheck(true);
        })
        .catch((e) => {
            alert(e);
            setCheck(false)
        })
    }, [])
    
    return (
        check === 'checking' ? <h1>Checking...</h1> : check ? <Outlet /> : <Navigate to={redirectPath}/>
    ) 
    
}

export default RouteProtector