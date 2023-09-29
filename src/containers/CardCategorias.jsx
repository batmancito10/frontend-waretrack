import { useState, useEffect, useContext } from "react"
import { PageTitle } from '../App'

function CardCategorias({togglePanel}) {
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)
    const [servicios, setServicios] = useState([])
    const [productos, setProductos] = useState([])

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
        {/* <SidebarCategorias mostrarPanel={mostrarPanel}></SidebarCategorias> */}
    </>
}

export default CardCategorias;