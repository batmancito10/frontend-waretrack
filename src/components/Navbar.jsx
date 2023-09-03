import { Link } from 'react-router-dom'

function Navbar () {

    return <nav>
        <h1>Waretrack</h1>
        <ul>
            <li>
                <Link to="/logout" >Cerrar sesión</Link>
            </li>
        </ul>
    </nav>
}

export default Navbar