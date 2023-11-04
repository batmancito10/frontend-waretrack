import { NavLink } from 'react-router-dom';
import svgs from '../assets/svg/imports.js';
import styles from '../assets/css/modules/sidebar.module.css';

function Sidebar() {
  return (
    <aside
      className={`${styles.container_sidebar} sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 text-center`}
      id="sidenav-main"
    >
      <div className='sidenav-header navbar-brand'>
        <i
          className="bi bi-x fs-3 p-3 cursor-pointer text-secondary  position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <span className="ms-1 font-weight-bold fs-4">Waretrack</span>
      </div>
      <hr className="horizontal dark mt-0" />
      <div
        className={ `${styles.sidebar} collapse navbar-collapse w-auto`}
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="dashboard" className="nav-link">
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <img src={svgs.svg6} />
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="usuarios" className="nav-link">
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <img src={svgs.svg5} />
              </div>
              <span className="nav-link-text ms-1">Usuarios</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="pedidos-proveedores" className={'nav-link'}>
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <img src={svgs.svg4} />
              </div>
              <span className="nav-link-text ms-1">Pedidos y Proveedores</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="categorias-servicios" className={'nav-link'}>
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <img src={svgs.svg1} />
              </div>
              <span className="nav-link-text ms-1">Categorias y Servicios</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="stock" className={'nav-link'}>
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <img src={svgs.svg2} />
              </div>
              <span className="nav-link-text ms-1">Stock</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="stock-sede" className={'nav-link'}>
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <img src={svgs.svg3} />
              </div>
              <span className="nav-link-text ms-1">stock sede</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="ventas" className={'nav-link'}>
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <img src={svgs.svg3} />
              </div>
              <span className="nav-link-text ms-1">Venta</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
