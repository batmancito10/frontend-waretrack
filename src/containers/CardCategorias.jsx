import { useState, useEffect, useContext } from "react"
import { PageTitle } from '../App'

function CardCategorias() {
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)
    const [servicios, setServicios] = useState([])
    const [productos, setProductos] = useState([])

    const [mostrarPanel, setMostrarPanel] = useState(false)

    const togglePanel = () => {
        setMostrarPanel(!mostrarPanel)
    }

    const serviciosRequest = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_SERVICIO, {
                mode: 'cors',
                method: 'get',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            })

            if (response.status === 200) {
                const jsonResponse = await response.json();

                const categoriaInfo = await Promise.all(jsonResponse.map(async (servicio) => {
                    const categoriaResponse = await fetch(`${import.meta.env.VITE_CATEGORIA}${servicio.categoria}/`, {
                        mode: 'cors',
                        method: 'get',
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });

                    const categoriaData = await categoriaResponse.json()


                    return {
                        ...servicio,
                        categoria: categoriaData
                    }
                }))
                return categoriaInfo
            }
            else {
                console.log('Ha ocurrido un error en la respuesta de la API:', response.status);
                return [];
            }
        }
        catch (error) {
            console.error('Ha ocurrido un error: ', error)
            return [];
        }
    }

    useEffect(() => {
        setTitle('Subcategorias')
        serviciosRequest()
            .then(data => {
                setServicios(data)
            })
            .catch(error => {
                console.log('Ha ocurrido un error: ', error)
            })
    }, [])

    const productosRequest = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_PRODUCTO, {
                mode: 'cors',
                method: 'get',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            })

            if (response.ok) {
                const jsonResponse = await response.json();

                const categoriaInfo = await Promise.all(jsonResponse.map(async (producto) => {
                    const categoriaResponse = await fetch(`${import.meta.env.VITE_CATEGORIA}${producto.categoria}/`, {
                        mode: 'cors',
                        method: 'get',
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });

                    const categoriaData = await categoriaResponse.json()


                    return {
                        ...producto,
                        categoria: categoriaData
                    }
                }))
                return categoriaInfo
            }
            else {
                console.log('Ha ocurrido un error en la respuesta de la API:', response.status);
                return [];
            }
        }
        catch (error) {
            console.error('Ha ocurrido un error: ', error)
            return [];
        }

    }

    useEffect(() => {
        setTitle('Productos')
        productosRequest()
            .then(data => {
                setProductos(data)
            })
            .catch(error => {
                console.log('Ha ocurrido un error: ', error)
            })
    }, [])

    return <>
        <div className="col-lg-9">
            <div className="card h-auto">
                <div className="card-header pb-0 p-3">
                    <div className="row">
                        <div className="col-6 d-flex align-items-center">
                            <h6 className="mb-0">Servicios</h6>
                        </div>
                    </div>
                </div>
                <div className="card-body p-3 pb-0">
                    <ul className="list-group">
                        {Array.isArray(servicios) ? (
                            servicios.map((servicio) => (
                                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg" onClick={togglePanel} style={{ cursor: "pointer" }} key={servicio.id}>
                                    <div className="d-flex flex-column">
                                        <h6 className="mb-1 text-dark font-weight-bold text-sm">
                                            {servicio.nombre}
                                        </h6>
                                        <span className="text-xs">{servicio.categoria.nombre}</span>
                                    </div>
                                    <div className="d-flex align-items-center text-sm">
                                        ${servicio.precio}
                                    </div>
                                </li>
                            ))
                        ) : (<div className="d-flex flex-column">
                            <h6 className="mb-1 text-dark font-weight-bold text-sm">
                                Aún no se cuentan con productos
                            </h6>
                        </div>
                        )}

                    </ul>
                </div>
            </div>

            <div className="card h-auto mt-3">
                <div className="card-header pb-0 p-3">
                    <div className="row">
                        <div className="col-6 d-flex align-items-center">
                            <h6 className="mb-0">Productos</h6>
                        </div>

                    </div>
                </div>
                <div className="card-body p-3 pb-0">
                    <ul className="list-group">
                        {Array.isArray(productos) ? (
                            productos.map((producto) => (
                                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg" onClick={togglePanel} style={{ cursor: "pointer" }} key={producto.id}>
                                    <div className="d-flex flex-column">
                                        <h6 className="mb-1 text-dark font-weight-bold text-sm">
                                            {producto.nombre}
                                        </h6>
                                        <span className="text-xs">{producto.categoria.nombre}</span>
                                    </div>
                                    <div className="d-flex align-items-center text-sm">
                                        ${producto.precio}
                                    </div>
                                </li>
                            ))
                        ) : (<div className="d-flex flex-column">
                            <h6 className="mb-1 text-dark font-weight-bold text-sm">
                                Aún no se cuentan con productos
                            </h6>
                        </div>
                        )}
                    </ul>
                </div>
            </div>

            <div className="card h-auto mt-3">
                <div className="card-header pb-0 p-3">
                    <div className="row">
                        <div className="col-6 d-flex align-items-center">
                            <h6 className="mb-0">Activos</h6>
                        </div>

                    </div>
                </div>
                <div className="card-body p-3 pb-0">
                    <ul className="list-group">
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg" onClick={togglePanel} style={{ cursor: "pointer" }}>
                            <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark font-weight-bold text-sm">
                                    Servicio 1
                                </h6>
                                <span className="text-xs">Categoria a la que pertenece</span>
                            </div>
                            <div className="d-flex align-items-center text-sm">
                                Precio
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        <div className={`fixed-plugin ${mostrarPanel ? 'ps show' : ''}`}>
            <a className="fixed-plugin-button text-dark position-fixed px-3 py-2">
                <i className="fa fa-cog py-2"> </i>
            </a>
            <div className="card shadow-lg ">
                <div className="card-header pb-0 pt-3 ">
                    <div className="float-start">
                        <h5 className="mt-3 mb-0">Soft UI Configurator</h5>
                        <p>See our dashboard options.</p>
                    </div>
                    <div className="float-end mt-4">
                        <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                </div>
                <hr className="horizontal dark my-1" />
                <div className="card-body pt-sm-3 pt-0">
                    <div>
                        <h6 className="mb-0">Sidebar Colors</h6>
                    </div>
                    <a href="#" className="switch-trigger background-color">
                        <div className="badge-colors my-2 text-start">
                            <span className="badge filter bg-gradient-primary active" data-color="primary"></span>
                            <span className="badge filter bg-gradient-dark" data-color="dark"></span>
                            <span className="badge filter bg-gradient-info" data-color="info"></span>
                            <span className="badge filter bg-gradient-success" data-color="success"></span>
                            <span className="badge filter bg-gradient-warning" data-color="warning"></span>
                            <span className="badge filter bg-gradient-danger" data-color="danger"></span>
                        </div>
                    </a>
                    <div className="mt-3">
                        <h6 className="mb-0">Sidenav Type</h6>
                        <p className="text-sm">Choose between 2 different sidenav types.</p>
                    </div>
                    <div className="d-flex">
                    </div>
                    <p className="text-sm d-xl-none d-block mt-2">You can change the sidenav type just on desktop view.</p>
                    <div className="mt-3">
                        <h6 className="mb-0">Navbar Fixed</h6>
                    </div>
                    <div className="form-check form-switch ps-0">
                        <input className="form-check-input mt-1 ms-auto" type="checkbox" id="navbarFixed" />
                    </div>
                    <hr className="horizontal dark my-sm-4" />
                    <a className="btn bg-gradient-dark w-100" href="https://www.creative-tim.com/product/soft-ui-dashboard">Free Download</a>
                    <a className="btn btn-outline-dark w-100" href="https://www.creative-tim.com/learning-lab/bootstrap/license/soft-ui-dashboard">View documentation</a>
                    <div className="w-100 text-center">
                        <a className="github-button" href="https://github.com/creativetimofficial/soft-ui-dashboard" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star creativetimofficial/soft-ui-dashboard on GitHub">Star</a>
                        <h6 className="mt-3">Thank you for sharing!</h6>
                        <a href="#" className="btn btn-dark mb-0 me-2" target="_blank">
                            <i className="fab fa-twitter me-1" aria-hidden="true"></i> Tweet
                        </a>
                        <a href="#" className="btn btn-dark mb-0 me-2" target="_blank">
                            <i className="fab fa-facebook-square me-1" aria-hidden="true"></i> Share
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CardCategorias;