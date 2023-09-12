import { NavLink } from 'react-router-dom'

function Sidebar () {
    return <aside className='sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 text-center' id='sidenav-main'>
        <div className='sidenav-header navbar-brand'>
        <i className="bi bi-x fs-3 p-3 cursor-pointer text-secondary  position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <span className='ms-1 font-weight-bold fs-4'>Waretrack</span>
        </div>
        <hr className='horizontal dark mt-0'/>
        <div className='collapse navbar-collapse w-auto' id='sidenav-collapse-main'>
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <NavLink to="dashboard" className='nav-link'>
                        <span className='nav-link-text ms-1'>Dashboard</span>
                    </NavLink>
                    <NavLink to="usuarios" className='nav-link'>
                        <span className='nav-link-text ms-1'>Usuarios</span>
                    </NavLink>
                </li>
            </ul>
        </div>


        {/*<Link to="dashboard">Dashboard</Link><br />
        <Link to="profile">Profile</Link>*/}
    </aside>
}

export default Sidebar