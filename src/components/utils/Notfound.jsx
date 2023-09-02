import { Navigate } from 'react-router-dom'

function Notfound () {
    return <>
        <Navigate to="/" />
    </>
}

export default Notfound