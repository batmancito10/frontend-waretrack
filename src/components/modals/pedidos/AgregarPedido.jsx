import { useContext, useState, useEffect } from "react";
import { PageTitle } from "../../../App"
import Select from "react-select";

function AgregarPedido() {
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
    const [producto, setProducto] = useState([]);

    const estadoList = [
        { value: true, label: 'Recibido' },
        { value: false, label: 'No recibido' }
    ];
    const [estadoSelected, setEstadoSelected] = useState([]);

    useEffect(() => {

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

    }, []);

    useEffect(() => {
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
    }, [])

    useEffect(() => {
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
    }, [])

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


    const [pedidoEditado, setPedidoEditado] = useState([])
    const [totalPedido, setTotalPedido] = useState(0)
    const [rows, setRows] = useState([]);

    const calcularPrecioTotal = () => {
        let precioTotal = 0;

        pedidoEditado.producto.map(producto => {
            if (producto.cantidad && producto.precio_unitario) {
                const cantidad = parseFloat(producto.cantidad) || 0;
                const precioUnitario = parseFloat(producto.precio_unitario) || 0;

                precioTotal += cantidad * precioUnitario;
            }
        })
        setTotalPedido(precioTotal)
        return totalPedido;
    };

    const limpiarCampos = () => {
        setProveedorSelected([])
        setFuncionarioSelected([])
        setSedeSelected([])
        setEstadoSelected([])
        setRows([]);
        setPedidoEditado({
            producto: [],
        });
        setTotalPedido(0)
    }

    const agregarPedidoRequest = async (e) => {
        e.preventDefault()
        const fecha_realizado = new Date()
        const formatoFEchaRealizado = fecha_realizado.toISOString()

        console.log(formatoFEchaRealizado)

        const data = {
            ...pedidoEditado,
            fecha_realizado: formatoFEchaRealizado,
            total: calcularPrecioTotal()
        }

        try {
            const response = await fetch(import.meta.env.VITE_PEDIDO, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            limpiarCampos()

            if (response.ok) {
                console.log('Se agregó el pedido exitosamente');
            } else {
                console.log('Error al agregar');
                console.log(data)
                console.log(rows)
            }
        } catch (error) {
            console.error('Hubo un error al hacer la solicitud', error);
        }
    }

    const addRow = () => {
        const newRow = { cantidad: 0, precio_unitario: 0 };
        setRows([...rows, newRow]);
        setPedidoEditado((prevPedidoEditado) => ({
            ...prevPedidoEditado,
            producto: [
                ...(prevPedidoEditado.producto || []),
                newRow
            ]
        }));
        calcularPrecioTotal()
    };

    const handleInputChange = (index, e, field) => {
        const newRows = [...rows];
        const newValue = parseInt(e.target.value);
        if (!isNaN(newValue)) {
            newRows[index][field] = newValue;
            setRows(newRows);
          } else {
            console.log(`El valor ingresado en ${field} no es un número válido.`);
          }
    };

    const addRows = () => {
        const newRow = { producto: null };
        setRows([...rows, newRow]);
    };

    const handleProductChange = (index, selectedOption) => {
        const newRows = [...rows];
        newRows[index].producto = selectedOption;
        setRows(newRows);
    };


    return (
        <div className="modal fade" id="exampleModalMessage" tabIndex="-1" role="dialog" aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Agregar pedido</h5>
                        <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <form id='agregarPedido' onSubmit={agregarPedidoRequest}>
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
                                            <div onClick={addRow} className="btn btn-secondary d-flex gap-2 align-items-center">
                                                <i className="ni ni-bag-17 fs-5 py-0"></i>
                                                Agregar producto
                                            </div>
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
                                                {rows.length !== 0 ?
                                                    <tbody>
                                                        {rows.map((row, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        {dataReceived ? (
                                                                            <Select
                                                                                name="producto"
                                                                                options={productoList}
                                                                                className="w-65"
                                                                                onChange={(selectedOption) => {
                                                                                    handleProductChange(index, selectedOption.value)
                                                                                }}
                                                                                value={rows.producto}
                                                                            />

                                                                        ) : (
                                                                            <select className="form-select w-65">
                                                                                <option value="">Loading...</option>
                                                                            </select>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <input type="number" name="cantidad" className="form-control w-65" value={row.cantidad} onChange={(e) => {
                                                                        handleInputChange(index, e, "cantidad")
                                                                    }} />
                                                                </td>
                                                                <td>
                                                                    <input type="number" name="precio_unitario" className="form-control w-65" value={row.precio_unitario} onChange={(e) => {
                                                                        handleInputChange(index, e, "precio_unitario")
                                                                        calcularPrecioTotal()
                                                                    }} />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    : null}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="recipient-name" className="col-form-label">TOTAL PEDIDO:</label>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {totalPedido}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn bg-gradient-primary" data-bs-dismiss="modal" form="agregarPedido">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AgregarPedido;