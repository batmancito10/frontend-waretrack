import { useContext } from 'react';
import { PageTitle } from '../App'
import { Link } from 'react-router-dom'

function Navbar () {
    const { title } = useContext(PageTitle)

    return <nav className='navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl d-flex justify-content-between' id='sidebar-main'>
        <h6 className='font-weight-bolder mb-0 fs-4'>{title}</h6>
        <ul className='navbar-nav d-flex justify-content-end'>
            <li>
                <Link to="/logout" >Cerrar sesión</Link>
            </li>
        </ul>
    </nav>
}

export default Navbar