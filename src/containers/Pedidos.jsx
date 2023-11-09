import { useState, useContext, useEffect } from "react";
import { PageTitle } from '../App'
import EliminarPedido from "../components/modals/pedidos/EliminarPedido";
import AgregarPedido from "../components/modals/pedidos/AgregarPedido.jsx";
import DetallePedido from "../components/modals/pedidos/DetallePedido";
import EditarPedido from "../components/modals/pedidos/EditarPedido";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Pedidos() {
    const divStyles = {
        cursor: 'pointer'
    };
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

            return {
                ...pedido,
                sede: sedeData,
                proveedor: proveedorData,
                funcionario: funcionarioData
            }
        }))

        return PedidosInfo
    }

    const [todosLosPedidos, setTodosLosPedidos] = useState([]);

    const [pedidoSeleccionadoDetalle, setPedidoSeleccionadoDetalle] = useState(null)
    const [pedidoSeleccionadoEditar, setPedidoSeleccionadoEditar] = useState(null)
    const [idPedidoEliminar, setIdPedidoEliminar] = useState(null)
    useEffect(() => {
        setTitle('Pedidos');
        pedidosRequest()
            .then((data) => {
                setPedidos(data);
                const nuevosRecibidos = [];
                const nuevosRealizados = [];

                data.forEach(pedido => {
                    if (pedido.estado) {
                        nuevosRecibidos.push(pedido);
                    } else {
                        nuevosRealizados.push(pedido);
                    }
                });

                setRecibido(nuevosRecibidos);
                setRealizado(nuevosRealizados);
                setTodosLosPedidos(data);
            })
    }, [])

    function fechaHora(fechaAPI) {
        const fecha = fechaAPI.split('T')[0]
        return fecha;
    }

    // DRAG AND DROP

    const [recibido, setRecibido] = useState([])
    const [realizado, setRealizado] = useState([])

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    const estadoRequest = async (id) => {
        const fecha_recibido = new Date()
        const formatoFechaRecibido = fecha_recibido.toISOString()

        const data = {
            estado: true,
            fecha_llegada: formatoFechaRecibido
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_PEDIDO}${id}/`, {
                mode: 'cors',
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                console.log('Se actualizó el pedido exitosamente');
            } else {
                console.log('Error al actualizar el estado');
            }
        } catch (error) {
            console.error('Hubo un error al hacer la solicitud', error);
        }

    }

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result

        if (source.droppableId == destination.droppableId) return;

        if (source.droppableId == "1") {
            setRecibido(removeItemById(draggableId, recibido));
        } else {
            setRealizado(removeItemById(draggableId, realizado));
        }

        const task = findItemById(draggableId, [...realizado, ...recibido]);

        //ADD ITEM
        if (destination.droppableId == "1") {
            setRecibido([{ ...task, estado: !task.estado }, ...recibido]);
            estadoRequest(draggableId)
        } else {
            setRealizado([{ ...task, estado: !task.estado }, ...realizado]);
        }

        setTodosLosPedidos(
            todosLosPedidos.map((pedido) =>
                pedido.id.toString() === draggableId
                    ? { ...pedido, estado: !pedido.estado }
                    : pedido
            )
        );
    }


    return (
        <DragDropContext onDragEnd={handleDragEnd} droppableId="2">
            <div className="row">
                <div className="col-md-7 mt-2">
                    <Droppable droppableId="2">
                        {(provided) => (
                            <div className="card-body p-3">
                                <div className="col">
                                    <div className="card" ref={provided.innerRef} {...provided.droppableProps}>
                                        <div className="card-header pb-0 px-3 d-flex align-items-center justify-content-between">
                                            <h6 className="mb-0">Pedidos realizados</h6>
                                            <button type="button" className="btn bg-gradient-info mb-0" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">+</button>
                                        </div>

                                        <div className="card-body pt-4 p-3">
                                            <ul className="list-group">
                                                {realizado ? realizado.map((pedido, index) => {
                                                    return (
                                                        <Draggable draggableId={pedido.id.toString()} key={pedido.id} index={index}>
                                                            {(provided) => (
                                                                <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
                                                                    key={pedido.id}
                                                                    style={{ display: 'flex' }}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={provided.innerRef}
                                                                >
                                                                    <div className="d-flex flex-column" style={{ flex: 0.7 }}
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#detallePedido"
                                                                        onClick={() => setPedidoSeleccionadoDetalle(pedido.id)}>
                                                                        <h6 className="mb-3 text-sm">{pedido.proveedor.nombre}</h6>
                                                                        <span className="mb-2 text-xs">Sede destino:
                                                                            <span className="text-dark font-weight-bold ms-sm-2">{pedido.sede.nombre}</span>
                                                                        </span>
                                                                        <span className="mb-2 text-xs">Fecha realizado:
                                                                            <span className="text-dark ms-sm-2 font-weight-bold">{pedido.fecha_realizado ? fechaHora(pedido.fecha_realizado) : null}</span>
                                                                        </span>
                                                                        <span className="text-xs">Estado:
                                                                            <span className="text-dark ms-sm-2 font-weight-bold">{pedido.estado === false ? "Pedido realizado" : "Pedido recibido"}</span>
                                                                        </span>
                                                                    </div>
                                                                    <div className="ms-auto text-end" style={{ flex: 0.3 }}>
                                                                        <a className="btn btn-link text-danger text-gradient px-3 mb-0"
                                                                            data-bs-toggle="modal" data-bs-target="#modal-notification"
                                                                            onClick={() => setIdPedidoEliminar(pedido.id)}>
                                                                            <i className="far fa-trash-alt me-2"></i>Eliminar
                                                                        </a>
                                                                        <a className="btn btn-link text-dark px-3 mb-0"
                                                                            data-bs-toggle="modal" data-bs-target="#editarPedido"
                                                                            onClick={() => setPedidoSeleccionadoEditar(pedido.id)}>
                                                                            <i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Editar
                                                                        </a>
                                                                        <EliminarPedido idPedidoEliminar={idPedidoEliminar}></EliminarPedido>
                                                                    </div>

                                                                    <DetallePedido pedidoSeleccionadoDetalle={pedidoSeleccionadoDetalle}></DetallePedido>
                                                                    <EditarPedido pedidoSeleccionadoEditar={pedidoSeleccionadoEditar}></EditarPedido>
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    );
                                                })
                                                    : <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
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
                                    {provided.placeholder}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>


                <div className="col md-5 mt-4">
                    <div className="card">
                        <div className="card-header pb-0 px-3">
                            <h6 className="mb-0">Pedidos recibidos</h6>
                        </div>
                        <Droppable droppableId="1">
                            {(provided) => (
                                <div className="card-body pt-4 p-3" ref={provided.innerRef} {...provided.droppableProps}>
                                    {recibido ? recibido.map(pedido => {
                                        return (
                                            <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
                                                key={pedido.id}
                                                style={{ display: 'flex' }}>
                                                <div className="d-flex flex-column" style={{ flex: 0.7, divStyles }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#detallePedido"
                                                onClick={() => setPedidoSeleccionadoDetalle(pedido.id)}>
                                                    <h6 className="mb-3 text-sm">{pedido.proveedor.nombre}</h6>
                                                    <span className="mb-2 text-xs">Sede destino:
                                                        <span className="text-dark font-weight-bold ms-sm-2">{pedido.sede.nombre}</span>
                                                    </span>
                                                    <span className="mb-2 text-xs">Fecha realizado:
                                                        <span className="text-dark ms-sm-2 font-weight-bold">{pedido.fecha_realizado ? fechaHora(pedido.fecha_realizado) : null}</span>
                                                    </span>
                                                    <span className="mb-2 text-xs">Fecha realizado:
                                                        <span className="text-dark ms-sm-2 font-weight-bold">{pedido.fecha_llegada ? fechaHora(pedido.fecha_llegada) : null}</span>
                                                    </span>
                                                    <span className="text-xs">Estado:
                                                        <span className="text-dark ms-sm-2 font-weight-bold">{pedido.estado === false ? "Pedido realizado" : "Pedido recibido"}</span>
                                                    </span>
                                                </div>
                                                <div className="ms-auto text-end" style={{ flex: 0.3 }}>
                                                    <a className="btn btn-link text-danger text-gradient px-3 mb-0"
                                                        data-bs-toggle="modal" data-bs-target="#modal-notification" onClick={() => setIdPedidoEliminar(pedido.id)}>
                                                        <i className="far fa-trash-alt me-2"></i>Eliminar
                                                    </a>
                                                    <a className="btn btn-link text-dark px-3 mb-0"
                                                        data-bs-toggle="modal" data-bs-target="#editarPedido"
                                                        onClick={() => { setPedidoSeleccionadoEditar(pedido.id); console.log("id:", pedido.id) }}>
                                                        <i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Editar
                                                    </a>
                                                    <EliminarPedido idPedidoEliminar={idPedidoEliminar} />
                                                </div>
                                                <DetallePedido pedidoSeleccionadoDetalle={pedidoSeleccionadoDetalle}></DetallePedido>
                                                <EditarPedido pedidoSeleccionadoEditar={pedidoSeleccionadoEditar}></EditarPedido>
                                            </li>
                                        );
                                    }) : null}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>

                <AgregarPedido></AgregarPedido>
            </div>
        </DragDropContext>
    );
}

export default Pedidos;