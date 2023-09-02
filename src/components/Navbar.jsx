import { Link } from 'react-router-dom'

function Navbar () {

    const destroyUserSession = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userInfo')
    }

    return <nav>
        <h1>Waretrack</h1>
        <ul>
            <li>
                <Link to="/login" onClick={destroyUserSession}>Cerrar sesión</Link>
            </li>
        </ul>
    </nav>
}

export default Navbar