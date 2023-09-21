import { useContext, useEffect, useState } from 'react'
import { PageTitle } from "../App"

function SedePedidos({ idProveedor }) {
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)

    const [proveedor, setProveedor] = useState()

    // request para obtener las sedes que tiene asignadas el proveedor 
    const proveedorRequest = async () => {
        const response = await fetch(`${import.meta.env.VITE_PROVEEDOR}${idProveedor}/`, {
            mode: 'cors',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        const jsonResponse = await response.json()
        return jsonResponse;
    }

    useEffect(() => {
        setTitle('Sede Pedidos')
        proveedorRequest()
            .then((data) => {
                setProveedor(data)
            })
            .catch((error) => {
                console.log('Ha ocurrido un error obteniendo la información de proveedor: ', error)
            })
    }, [setTitle])


    // Para obtener los pedidos
    const [pedidos, setPedidos] = useState([])

    const pedidosRequest = async () => {
        const response = await fetch(import.meta.env.VITE_PEDIDO, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        const jsonResponse = await response.json()
        return jsonResponse
    }

    useEffect(() => {
        setTitle('Pedidos')
        pedidosRequest()
            .then(data => {
                setPedidos(data)
            })
            .catch((error) => {
                console.log('Ha ocurrido un error con la petición de pedidos: ', error)
            })
    }, [])

    // Hacer el filtro de los pedidos dependiendo la sede
    const pedidosFiltrados = (idSede) => {
        return pedidos.filter(pedido =>
            pedido.sede === idSede && pedido.proveedor === idProveedor
        )
    }

    // Poner la fecha más bonita xd
    function fechaHora(fechaAPI) {
        const fecha = fechaAPI.split('T')[0]
        return fecha;
    }

    return (
        <div className="container-fluid py-4">
            <div className="row">
                {proveedor ? proveedor.sede.map((item, index) => {
                    return <div className="col-12 col-xl-4" key={index}>
                        <div className="card h-100">
                            <div className="card-header pb-0 p-3">
                                <h6 className="mb-0">{item.nombre}</h6>
                            </div>
                            <div className="card-body p-3">
                                <ul className="list-group">
                                    <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                        {pedidosFiltrados(item.id) && pedidosFiltrados(item.id).length ? pedidosFiltrados(item.id).map(pedido => {

                                            return <>
                                                <div className="d-flex align-items-start flex-column justify-content-center" key={pedido.id}>
                                                    <h6 className="mb-0 text-sm">Estado: {pedido.estado == true ? 'Recibido' : 'No recibido'}</h6>
                                                    <p className="mb-0 text-xs">Fecha realizado: {fechaHora(pedido.fecha_realizado)}</p>
                                                    <p className="mb-0 text-xs">Fecha llegada: {fechaHora(pedido.fecha_llegada)}</p>
                                                </div>
                                                <a className="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="#">Detalle</a>
                                            </>
                                        }) : <div className="d-flex align-items-start flex-column justify-content-center">
                                        <h6 className="mb-0 text-sm">La sede no tiene pedidos con este proveedor</h6>
                                    </div>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }) : null}

                {/* }) : <h5>Este proveedor no cuenta con sedes asignadas</h5>} */}
            </div>
        </div>
    );
}

export default SedePedidos;