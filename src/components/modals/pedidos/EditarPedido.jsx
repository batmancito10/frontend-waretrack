import { useContext, useState, useEffect } from "react";
import { PageTitle } from "../../../App"
import Select from "react-select";

function EditarPedido({ pedidoSeleccionadoEditar }) {
    const [pedido, setPedido] = useState([])
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)
    const [dataReceived, setDataRecived] = useState(false)

    const [sedeList, setSedeList] = useState([]);
    const [sedeSelected, setSedeSelected] = useState([]);

    const [funcionarioList, setFuncionarioList] = useState([])
    const [funcionarioSelected, setFuncionarioSelected] = useState([]);

    const [proveedorList, setProveedorList] = useState([])
    const [proveedorSelected, setProveedorSelected] = useState([]);

    const [productoList, setProductoList] = useState([])
    const [productoSelected, setProductoSelected] = useState([])

    const estadoList = [
        { value: 0, label: 'Recibido' },
        { value: 1, label: 'No recibido' }
    ];
    const [estadoSelected, setEstadoSelected] = useState([]);


    useEffect(() => {
        if (!pedidoSeleccionadoEditar) return;

        fetch(import.meta.env.VITE_SEDE, {
            mode: 'cors',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then((res) => res.json())
            .then((data) => {
                const dataTransformed = data.map((sede) => ({
                    value: sede.id,
                    label: sede.nombre,
                }))
                setSedeList(dataTransformed);
                setDataRecived(true);
            }).catch((error) => {
                console.error('Hubo un error al obtener las opciones:', error);
            });

    }, [pedidoSeleccionadoEditar]);

    useEffect(() => {
        if (!pedidoSeleccionadoEditar) return;
        fetch(import.meta.env.VITE_FUNCIONARIO, {
            mode: 'cors',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then((res) => res.json())
            .then((data) => {
                setFuncionarioList(data)
                const dataTransformedFuncionario = data.map((funcionario) => ({
                    value: funcionario.id,
                    label: funcionario.first_name + " " + funcionario.last_name,
                }))

                setFuncionarioList(dataTransformedFuncionario)
                setDataRecived(true)
            }).catch((error) => {
                console.error('Hubo un error al obtener las opciones:', error);
            });
    }, [pedidoSeleccionadoEditar])

    useEffect(() => {
        if (!pedidoSeleccionadoEditar) return;
        fetch(import.meta.env.VITE_PROVEEDOR, {
            mode: 'cors',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then((res) => res.json())
            .then((data) => {
                const dataTransformedProveedor = data.map((proveedor) => ({
                    value: proveedor.id,
                    label: proveedor.nombre,
                }))

                setProveedorList(dataTransformedProveedor)
                setDataRecived(true)
            }).catch((error) => {
                console.error('Hubo un error al obtener las opciones:', error);
            });
    }, [pedidoSeleccionadoEditar])

    useEffect(() => {
        fetch(import.meta.env.VITE_PRODUCTO, {
            mode: 'cors',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then((res) => res.json())
            .then((data) => {
                const dataTransformedProducto = data.map((producto) => ({
                    value: producto.id,
                    label: producto.nombre,
                }))

                setProductoList(dataTransformedProducto)
                setDataRecived(true)
            }).catch((error) => {
                console.error('Hubo un error al obtener las opciones:', error);
            });
    }, [])

    const pedidoEspecificoRequest = async () => {
        if (!pedidoSeleccionadoEditar) return;

        const response = await fetch(`${import.meta.env.VITE_PEDIDO}${pedidoSeleccionadoEditar}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const pedidoo = await response.json();
        if (!pedidoo) {
            console.error('Pedido no encontrado o es nulo/undefined.');
            return;
        }

        const sedeResponse = await fetch(`${import.meta.env.VITE_SEDE}${pedidoo.sede}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const funcionarioResponse = await fetch(`${import.meta.env.VITE_FUNCIONARIO}${pedidoo.funcionario}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const proveedorResponse = await fetch(`${import.meta.env.VITE_PROVEEDOR}${pedidoo.proveedor}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        let productoData = []

        pedidoo.producto.forEach((producto) => {
            productoData.push(producto.producto);
        });

        const sedeData = await sedeResponse.json();
        const funcionarioData = await funcionarioResponse.json();
        const proveedorData = await proveedorResponse.json();

        console.log("producto data: ", productoData)
        return {
            ...pedidoo,
            sede: sedeData,
            proveedor: proveedorData,
            funcionario: funcionarioData,
            producto: productoData
        };
    }

    useEffect(() => {
        if (pedidoSeleccionadoEditar) {
            setTitle('Editar pedido')
            pedidoEspecificoRequest()
                .then((data) => {
                    console.log(data)
                    const dataProveedor = {
                        value: data.proveedor.id,
                        label: data.proveedor.nombre
                    }

                    const dataSede = {
                        value: data.sede.id,
                        label: data.sede.nombre
                    }

                    const dataFuncionario = {
                        value: data.funcionario.id,
                        label: data.funcionario.first_name + " " + data.funcionario.last_name
                    }

                    const dataEstado = {
                        label: data.estado == true ? 'Recibido' : 'No recibido'
                    }

                    let dataProducto = []
                    let conter = 0
                    data.producto.map((producto) => (
                        dataProducto[conter] =
                        {
                            value: producto.id,
                            label: producto.nombre
                        }
                        
                    ));
                    conter++
                    setProveedorSelected(dataProveedor)
                    setSedeSelected(dataSede)
                    setFuncionarioSelected(dataFuncionario)
                    setEstadoSelected(dataEstado)
                    setProductoSelected(dataProducto)
                    setPedido(data)

                })
                .catch((error) => {
                    console.error('Hubo un error al obtener los datos del proveedor:', error);
                });
        }
    }, [pedidoSeleccionadoEditar])

    const [productos, setProductos] = useState([]);

    const handleInputChange = (event, productId, field) => {
        const { value } = event.target;

        // Encuentra el producto correspondiente en el estado local
        const productosActualizados = pedido.producto.map(producto => {
            if (producto.id === productId) {
                return { ...producto, [field]: value };
            }
            return producto;
        });

        setProductos(productosActualizados);
    };

    const [pedidoEditado, setPedidoEditado] = useState([])

    const editarPedidoRequest = async (e) => {
        e.preventDefault()

        console.log(`${import.meta.env.VITE_PEDIDO}${pedidoSeleccionadoEditar}/`)
        console.log(pedidoEditado)

        try {
            const response = await fetch(`${import.meta.env.VITE_PEDIDO}${pedidoSeleccionadoEditar}/`, {
                mode: 'cors',
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoEditado)
            })

            if (response.ok) {
                console.log('Actualización exitosa');
            } else {
                console.log('Error al actualizar');
            }
        } catch (error) {
            console.error('Hubo un error al hacer la solicitud', error);
        }
    }

    const [rows, setRows] = useState([]);

    const handleProductChange = (index, selectedOption) => {
        const newRows = [...rows];
        newRows[index].producto = selectedOption;
        setRows(newRows);
    };


    return (
        <div className="modal fade" id="editarPedido" tabIndex="-1" role="dialog" aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar pedido</h5>
                        <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form id='editarPedidoSeleccionado' onSubmit={editarPedidoRequest}>
                        <div className="modal-body">
                            <div className="form-group d-flex">
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="recipient-name" className="col-form-label">Proveedor:</label>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {dataReceived ? (
                                        <Select
                                            name="funcionario"
                                            options={proveedorList}
                                            className="w-65"
                                            onChange={(selectedOption) => {
                                                setProveedorSelected(selectedOption);
                                                setPedidoEditado({
                                                    ...pedidoEditado,
                                                    proveedor: selectedOption.value
                                                });
                                            }}
                                            value={proveedorSelected}
                                        />
                                    ) : (
                                        <select className="form-select w-65">
                                            <option value="">Loading...</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="recipient-name" className="col-form-label">Funcionario:</label>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {dataReceived ? (
                                        <Select
                                            name="funcionario"
                                            options={funcionarioList}
                                            className="w-65"
                                            onChange={(selectedOption) => {
                                                setFuncionarioSelected(selectedOption);
                                                setPedidoEditado({
                                                    ...pedidoEditado,
                                                    funcionario: selectedOption.value
                                                });
                                            }}
                                            value={funcionarioSelected}
                                        />
                                    ) : (
                                        <select className="form-select w-65">
                                            <option value="">Loading...</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="recipient-name" className="col-form-label">Sedes:</label>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {dataReceived ? (
                                        <Select
                                            name="sede"
                                            options={sedeList}
                                            className="w-65"
                                            onChange={(selectedOption) => {
                                                setSedeSelected(selectedOption);
                                                setPedidoEditado({
                                                    ...pedidoEditado,
                                                    sede: selectedOption.value
                                                });
                                            }}
                                            value={sedeSelected}
                                        />
                                    ) : (
                                        <select className="form-select w-65">
                                            <option value="">Loading...</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="recipient-name" className="col-form-label">Estado:</label>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {dataReceived ? (
                                        <Select
                                            name="sede"
                                            options={estadoList}
                                            className="w-65"
                                            onChange={(selectedOption) => {
                                                setEstadoSelected(selectedOption);
                                                setPedidoEditado({
                                                    ...pedidoEditado,
                                                    estado: selectedOption.value
                                                });
                                            }}
                                            value={estadoSelected}
                                        />
                                    ) : (
                                        <select className="form-select w-65">
                                            <option value="">Loading...</option>
                                        </select>
                                    )}
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-4">
                                        <div className="card-header pb-0">
                                            <h6>Productos</h6>
                                        </div>
                                        <div className="card-body px-0 pt-0 pb-2">
                                            <table className="table align-items-center justify-content-center mb-0">
                                                <thead>
                                                    <tr>
                                                        {/* Estilo en línea para la primera columna */}
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{ width: '50%' }}>Nombre</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Cantidad</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Precio unitario</th>
                                                    </tr>
                                                </thead>

                                                {pedido?.producto?.map(producto => {
                                                    return <tbody key={producto.id}>
                                                        <tr>
                                                            <td>
                                                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    {dataReceived ? (
                                                                        <Select
                                                                            name="producto"
                                                                            options={productoList}
                                                                            className="w-65"
                                                                            onChange={(selectedOption, index) => {
                                                                                handleProductChange(index, selectedOption.value)
                                                                            }}
                                                                            value={productoSelected}
                                                                        />

                                                                    ) : (
                                                                        <select className="form-select w-65">
                                                                            <option value="">Loading...</option>
                                                                        </select>
                                                                    )}
                                                                </div>
                                                                {console.log(productoSelected)}
                                                            </td>
                                                            <td>
                                                                <input type="text" name="cantidadProd" className="form-control w-65" value={producto.cantidad} onChange={(e) => handleInputChange(e, producto.id, 'cantidadProd')} />
                                                            </td>
                                                            <td>
                                                                <input type="text" name="precioUnitarioProd" className="form-control w-65" value={producto.precio_unitario} onChange={(e) => handleInputChange(e, producto.id, 'precioUnitarioProd')} />
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
                        <div className="modal-footer">
                            <button type="submit" className="btn bg-gradient-primary" data-bs-dismiss="modal" form="editarPedidoSeleccionado">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditarPedido;