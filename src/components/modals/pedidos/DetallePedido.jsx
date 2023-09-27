import { useContext, useState, useEffect } from 'react'
import { PageTitle } from "../../../App"

function DetallePedido({ pedidoSeleccionadoDetalle }) {
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)

    const [pedidoDetalle, setPedidoDetalle] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const pedidosRequest = async () => {
        setIsLoading(true);
        if (!pedidoSeleccionadoDetalle) return;

        const response = await fetch(`${import.meta.env.VITE_PEDIDO}${pedidoSeleccionadoDetalle}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const pedido = await response.json();
        if (!pedido) {
            console.error('Pedido no encontrado o es nulo/undefined.');
            return;
        }

        const sedeResponse = await fetch(`${import.meta.env.VITE_SEDE}${pedido.sede}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const funcionarioResponse = await fetch(`${import.meta.env.VITE_FUNCIONARIO}${pedido.funcionario}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const proveedorResponse = await fetch(`${import.meta.env.VITE_PROVEEDOR}${pedido.proveedor}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const sedeData = await sedeResponse.json();
        const funcionarioData = await funcionarioResponse.json();
        const proveedorData = await proveedorResponse.json();

        setIsLoading(false);
        return {
            ...pedido,
            sede: sedeData,
            proveedor: proveedorData,
            funcionario: funcionarioData
        };
    }

    useEffect(() => {
        if (pedidoSeleccionadoDetalle) {
            setTitle('Pedidos');
            pedidosRequest()
                .then((data) => {
                    if (data) {
                        setPedidoDetalle(data);
                    }
                })
        }
    }, [pedidoSeleccionadoDetalle])

    return (
        <>
            <div className="modal fade" id="detallePedido" tabIndex="-1" role="dialog" aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detalle del pedido</h5>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <div className="modal-body" key={pedidoDetalle.id}>
                            {isLoading ?
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="d-flex px-2">
                                                <div className="my-auto">
                                                    <h6 className="mb-0 text-sm">Loading...</h6>
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                </tbody>
                                : <>
                                    <div className="form-group d-flex">
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                            <label htmlFor="recipient-name" className="col-form-label">Proveedor:</label>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <h6 className="mb-0">{pedidoDetalle.proveedor?.nombre}</h6>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex">
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                            <label htmlFor="recipient-name" className="col-form-label">Funcionario:</label>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <h6 className="mb-0">{pedidoDetalle.funcionario?.first_name + " " + pedidoDetalle.funcionario?.last_name}</h6>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex">
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                            <label htmlFor="recipient-name" className="col-form-label">Sedes:</label>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <h6 className="mb-0">{pedidoDetalle.sede?.nombre}</h6>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex">
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                            <label htmlFor="recipient-name" className="col-form-label">Estado:</label>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <h6 className="mb-0">{pedidoDetalle.estado === false ? 'No recibido' : 'Recibido'}</h6>
                                        </div>
                                    </div>  
                                </>}

                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="card-header pb-0">
                                            <h6>Productos</h6>
                                        </div>
                                        <div className="card-body px-0 pt-0 pb-2">
                                            <div className="table-responsive p-0">
                                                <table className="table align-items-center justify-content-center mb-0">
                                                    <thead>
                                                        <tr>
                                                            {/* Estilo en línea para la primera columna */}
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{ width: '50%' }}>Nombre</th>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Cantidad</th>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Precio unitario</th>
                                                        </tr>
                                                    </thead>
                                                    {isLoading ?
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex px-2">
                                                                        <div className="my-auto">
                                                                            <h6 className="mb-0 text-sm">Loading...</h6>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                        </tbody>
                                                        : pedidoDetalle?.producto?.map(producto => {
                                                            return <tbody key={producto.id}>
                                                                <tr>
                                                                    <td>
                                                                        <div className="d-flex px-2">
                                                                            <div className="my-auto">
                                                                                <h6 className="mb-0 text-sm">{producto.producto.nombre}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-sm font-weight-bold mb-0">{producto.cantidad}</p>
                                                                    </td>
                                                                    <td>
                                                                        <span className="text-xs font-weight-bold">{producto.precio_unitario}</span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        })}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn bg-gradient-primary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetallePedido;