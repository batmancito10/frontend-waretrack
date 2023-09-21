import { useState, useContext, useEffect } from "react";
import { PageTitle } from '../App'

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

            return {
                ...pedido,
                sede: sedeData,
                proveedor: proveedorData,
                funcionario: funcionarioData
            }
        }))

        return PedidosInfo
    }

    useEffect(() => {
        setTitle('Pedidos');
        pedidosRequest()
            .then((data) => {
                setPedidos(data);
            })
    }, [])

    function fechaHora(fechaAPI) {
        const fecha = fechaAPI.split('T')[0]
        return fecha;
    }

    const [draggedItem, setDraggedItem] = useState(null);
    const [dropZone, setDropZone] = useState([]);

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
    };

    const [lastDraggedItemId, setLastDraggedItemId] = useState(null);

    const handleDragOver = (e, item) => {
        e.preventDefault();
        if (draggedItem && draggedItem.id !== lastDraggedItemId) {
          // Realiza la solicitud PATCH cuando el elemento se arrastra sobre la zona de destino
          stateRequest(item.id);
          setLastDraggedItemId(draggedItem.id);
        }
      };

    const handleDrop = (e) => {
        e.preventDefault();
        if (draggedItem) {
            // Agrega el elemento arrastrado a la zona de destino
            setDropZone([...dropZone, draggedItem]);
            setDraggedItem(null);
        }
        stateRequest(draggedItem.id);
    };

    const llegoPedido = {
        estado : true
    }

    const stateRequest = async (id) => {
        fetch(`${import.meta.env.VITE_PEDIDO}${id}`, {
            mode: 'cors',
            method: 'patch',
            headers: { 'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify(llegoPedido)
        }).then((response) => {
            if(!response.ok){
                throw new Error('No fue posible completar la solicitud')
            }
            return response.json()
        }).then((responseData) => { 
            console.log('Respuesta existosa: ' + responseData)
        }).catch((error) => {
            console.log('Ocurrió un error en la solicitud: ' + error)
        })
    }

    return <>
        <div className="row">
            <div className="col-md-7 mt-4">
                <div className="card">
                    <div className="card-header pb-0 px-3">
                        <h6 className="mb-0">Pedidos realizados</h6>
                    </div>
                    <div className="card-body pt-4 p-3">
                        <ul className="list-group">
                            {pedidos ? pedidos.map(pedido => {
                                return <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg" key={pedido.id} draggable onDragStart={(e) => handleDragStart(e, pedido)}>
                                    <div className="d-flex flex-column">
                                        <h6 className="mb-3 text-sm">{pedido.proveedor.nombre}</h6>
                                        <span className="mb-2 text-xs">Sede destino: <span className="text-dark font-weight-bold ms-sm-2">{pedido.sede.nombre}</span></span>
                                        <span className="mb-2 text-xs">Fecha realizado: <span className="text-dark ms-sm-2 font-weight-bold">{fechaHora(pedido.fecha_realizado)}</span></span>
                                        <span className="text-xs">Estado: <span className="text-dark ms-sm-2 font-weight-bold">{pedido.estado === false ? "False" : "True"}</span></span>
                                    </div>
                                    <div className="ms-auto text-end">
                                        <a className="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                        <a className="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                    </div>
                                </li>
                            }) : <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                                <div className="d-flex flex-column">
                                    <h6 className="mb-3 text-sm">Loading data...</h6>
                                    <span className="mb-2 text-xs">Proveedor: <span className="text-dark font-weight-bold ms-sm-2">Loading data...</span></span>
                                    <span className="mb-2 text-xs">Funcionario: <span className="text-dark ms-sm-2 font-weight-bold">Loading data...</span></span>
                                    <span className="text-xs">Productos: <span className="text-dark ms-sm-2 font-weight-bold">Loading data...</span></span>
                                </div>
                                <div className="ms-auto text-end">
                                    <a className="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i className="far fa-trash-alt me-2"></i>Delete</a>
                                    <a className="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i className="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                </div>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col md-5 mt-4">
                <div className="card" onDragOver={handleDragOver}
                    onDrop={handleDrop}>
                    <div className="card-header pb-0 px-3">
                        <h6 className="mb-0">Pedidos recibidos</h6>
                    </div>
                    <div className="card-body pt-4 p-3">
                        <ul className="list-group">
                            
                            {dropZone ? dropZone.map((item, index) => (
                                <li className="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg" key={index}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, item)}>
                                       
                                    <div className="d-flex flex-column">
                                        <h6 className="mb-3 text-sm">{item.proveedor.nombre}</h6>
                                        <span className="mb-2 text-xs">Sede destino: <span className="text-dark font-weight-bold ms-sm-2">{item.sede.nombre}</span></span>
                                        <span className="mb-2 text-xs">Fecha realizado: <span className="text-dark ms-sm-2 font-weight-bold">{fechaHora(item.fecha_realizado)}</span></span>
                                        <span className="text-xs">Estado: <span className="text-dark ms-sm-2 font-weight-bold">{item.estado === false ? "False" : "True"}</span></span>
                                    </div>
                                </li>
                            )) : null}
                            {/* 
                            <li className="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
                                <div className="d-flex flex-column">
                                    <h6 className="mb-3 text-sm">Lucas Harper</h6>
                                    <span className="mb-2 text-xs">Company Name: <span className="text-dark font-weight-bold ms-sm-2">Stone Tech Zone</span></span>
                                    <span className="mb-2 text-xs">Email Address: <span className="text-dark ms-sm-2 font-weight-bold">lucas@stone-tech.com</span></span>
                                    <span className="text-xs">VAT Number: <span className="text-dark ms-sm-2 font-weight-bold">FRB1235476</span></span>
                                </div>
                            </li>
                            <li className="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
                                <div className="d-flex flex-column">
                                    <h6 className="mb-3 text-sm">Ethan James</h6>
                                    <span className="mb-2 text-xs">Company Name: <span className="text-dark font-weight-bold ms-sm-2">Fiber Notion</span></span>
                                    <span className="mb-2 text-xs">Email Address: <span className="text-dark ms-sm-2 font-weight-bold">ethan@fiber.com</span></span>
                                    <span className="text-xs">VAT Number: <span className="text-dark ms-sm-2 font-weight-bold">FRB1235476</span></span>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Pedidos;