import { useState, useContext, useEffect } from "react";
import { PageTitle } from '../App'
import EliminarPedido from "../components/modals/pedidos/EliminarPedido.jsx";
import AgregarPedido from "../components/modals/pedidos/AgregarPedido.jsx";
import DetallePedido from "../components/modals/pedidos/DetallePedido";
import EditarPedido from "../components/modals/pedidos/EditarPedido";

function Pedidos() {
    const [pedidos, setPedidos] = useState([])
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)

    const pedidosRequest = async () => {
        const response = await fetch(import.meta.env.VITE_PEDIDO, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        const jsonResponse = await response.json()

        const PedidosInfo = await Promise.all(jsonResponse.map(async (pedido) => {
            const sedeResponse = await fetch(`${import.meta.env.VITE_SEDE}${pedido.sede}/`, {
                mode: 'cors',
                method: 'get',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const funcionarioResponse = await fetch(`${import.meta.env.VITE_FUNCIONARIO}${pedido.funcionario}/`, {
                mode: 'cors',
                method: 'get',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            })
            const proveedorResponse = await fetch(`${import.meta.env.VITE_PROVEEDOR}${pedido.proveedor}/`, {
                mode: 'cors',
                method: 'get',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            const sedeData = await sedeResponse.json()
            const funcionarioData = await funcionarioResponse.json()
            const proveedorData = await proveedorResponse.json()

            console.log("me estoy ejecutando")

            return {
                ...pedido,
                sede: sedeData,
                proveedor: proveedorData,
                funcionario: funcionarioData
            }
        }))

        return PedidosInfo
    }

    const [pedidoSeleccionadoDetalle, setPedidoSeleccionadoDetalle] = useState(null)
    const [pedidoSeleccionadoEditar, setPedidoSeleccionadoEditar] = useState(null)
    useEffect(() => {
        setTitle('Pedidos');
        pedidosRequest()
            .then((data) => {
                setPedidos(data);
            })
        console.log("me estoy ejecutando ")
    }, [])

    function fechaHora(fechaAPI) {
        const fecha = fechaAPI.split('T')[0]
        return fecha;
    }


    return <>
        <div className="row">
            <div className="col-md-7 mt-4">
                <div className="card">
                    <div className="card-header pb-0 px-3 d-flex align-items-center justify-content-between">
                        <h6 className="mb-0">Pedidos realizados</h6>
                        <button type="button" className="btn bg-gradient-info mb-0" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">+</button>
                    </div>

                    <div className="card-body pt-4 p-3">
                        <ul className="list-group">
                            {pedidos ? pedidos.map(pedido => {
                                return <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
                                    key={pedido.id}
                                    style={{ display: 'flex' }}>
                                    <div className="d-flex flex-column" style={{ flex: 0.7 }} 
                                    data-bs-toggle="modal" data-bs-target="#detallePedido"  onClick={() => setPedidoSeleccionadoDetalle(pedido.id)}>
                                        <h6 className="mb-3 text-sm">{pedido.proveedor.nombre}</h6>
                                        <span className="mb-2 text-xs">Sede destino:
                                            <span className="text-dark font-weight-bold ms-sm-2">{pedido.sede.nombre}</span>
                                        </span>
                                        <span className="mb-2 text-xs">Fecha realizado:
                                            <span className="text-dark ms-sm-2 font-weight-bold">{fechaHora(pedido.fecha_realizado)}</span>
                                        </span>
                                        <span className="text-xs">Estado:
                                            <span className="text-dark ms-sm-2 font-weight-bold">{pedido.estado === false ? "False" : "True"}</span>
                                        </span>
                                    </div>

                                    <div className="ms-auto text-end" style={{ flex: 0.3 }}>
                                        <a className="btn btn-link text-danger text-gradient px-3 mb-0"
                                            data-bs-toggle="modal" data-bs-target="#modal-notification">
                                            <i className="far fa-trash-alt me-2"></i>Eliminar
                                        </a>
                                        <a className="btn btn-link text-dark px-3 mb-0"
                                            data-bs-toggle="modal" data-bs-target="#editarPedido"
                                            onClick={() => setPedidoSeleccionadoEditar(pedido.id)}>
                                            <i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Editar
                                        </a>
                                        <EliminarPedido idPedido={pedido.id} />
                                    </div>

                                    <DetallePedido pedidoSeleccionadoDetalle={pedidoSeleccionadoDetalle}></DetallePedido>
                                    <EditarPedido pedidoSeleccionadoEditar={pedidoSeleccionadoEditar}></EditarPedido>
                                </li>
                            }) : <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                                <div className="d-flex flex-column">
                                    <h6 className="mb-3 text-sm">Loading data...</h6>
                                    <span className="mb-2 text-xs">Proveedor: <span className="text-dark font-weight-bold ms-sm-2">Loading data...</span></span>
                                    <span className="mb-2 text-xs">Funcionario: <span className="text-dark ms-sm-2 font-weight-bold">Loading data...</span></span>
                                    <span className="text-xs">Productos: <span className="text-dark ms-sm-2 font-weight-bold">Loading data...</span></span>
                                </div>
                                <div className="ms-auto text-end">
                                    <a className="btn btn-link text-danger text-gradient px-3 mb-0" data-bs-toggle="modal" data-bs-target="#modal-notification"><i className="far fa-trash-alt me-2"></i>Eliminar</a>
                                    <button type="button" className="btn btn-block bg-gradient-warning mb-3">Notification</button>
                                    <a className="btn btn-link text-dark px-3 mb-0" href="#"><i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Editar</a>
                                </div>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col md-5 mt-4">
                <div className="card">
                    <div className="card-header pb-0 px-3">
                        <h6 className="mb-0">Pedidos recibidos</h6>
                    </div>
                    <div className="card-body pt-4 p-3">
                        <ul className="list-group">
                            <li className="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">

                                <div className="d-flex flex-column">
                                    <h6 className="mb-3 text-sm"></h6>
                                    <span className="mb-2 text-xs">Sede destino: <span className="text-dark font-weight-bold ms-sm-2"></span></span>
                                    <span className="mb-2 text-xs">Fecha realizado: <span className="text-dark ms-sm-2 font-weight-bold"></span></span>
                                    <span className="text-xs">Estado: <span className="text-dark ms-sm-2 font-weight-bold"></span></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <AgregarPedido></AgregarPedido>
        </div>
    </>
}

export default Pedidos;