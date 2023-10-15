import { useState, useContext, useEffect } from "react"
import { PageTitle } from '../App'
import Select from "react-select";

function SidebarCategorias({ servicioSeleccionado, mostrarPanelServicio, ocultarServicio }) {
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)
    const [sedeList, setSedeList] = useState([]);
    const [dataReceived, setDataRecived] = useState(false)
    const [sedeSelected, setSedeSelected] = useState([]);
    const [categoriaList, setCategoriaList] = useState([]);

    const [categoriaSelected, setCategoriaSelected] = useState([]);

    const [servicio, setServicio] = useState([])

    useEffect(() => {
        fetch(import.meta.env.VITE_SEDE, {
            mode: 'cors',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then((res) => res.json())
            .then((data) => {
                setSedeList(data)
                const dataTransformed = data.map((sede) => ({
                    value: sede.id,
                    label: sede.nombre,
                }))

                setSedeList(dataTransformed)
                setDataRecived(true)
            }).catch((error) => {
                console.error('Hubo un error al obtener las opciones:', error);
            });
    }, [setTitle])

    useEffect(() => {
        fetch(import.meta.env.VITE_CATEGORIA, {
            mode: 'cors',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then((res) => res.json())
            .then((data) => {
                setCategoriaList(data)
                const dataTransformed = data.map((categoria) => ({
                    value: categoria.id,
                    label: categoria.nombre,
                }))

                setCategoriaList(dataTransformed)
                setDataRecived(true)
            }).catch((error) => {
                console.error('Hubo un error al obtener las opciones:', error);
            });
    }, [setTitle])

    const servicioRequest = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVICIO}${servicioSeleccionado}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })

        const jsonResponse = await response.json()

        const sedeResponse = await fetch(`${import.meta.env.VITE_SEDE}${jsonResponse.sedes}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const categoriaResponse = await fetch(`${import.meta.env.VITE_CATEGORIA}${jsonResponse.categoria}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })

        const sedeData = await sedeResponse.json()
        const categoriaData = await categoriaResponse.json()

        const servicioInfo = {
            ...jsonResponse,
            sedes: sedeData,
            categoria: categoriaData
        }
        return servicioInfo
    }

    useEffect(() => {
        if (!servicioSeleccionado) return;

        setTitle('Detalle Servicio')
        servicioRequest()
            .then(data => {
                setServicio(data)
                const dataTransformed = {
                    value: data.sedes.id,
                    label: data.sedes.nombre,
                };

                const dataTransformedCategorias = {
                    value: data.categoria.id,
                    label: data.categoria.nombre,
                };

                setSedeSelected(dataTransformed)
                setCategoriaSelected(dataTransformedCategorias)
                setDataRecived(true)
            })
            .catch(error => {
                console.log('Ha ocurrido un error ', error)
            })
    }, [servicioSeleccionado])

    const [data, setData] = useState([])

    const handleChange = (selectedOption) => {
        setSedeSelected(selectedOption);
        dataSend();
    }

    const handleChangeCategoria = (selectedOption) => {
        setCategoriaSelected(selectedOption);
        // dataSendCategoria()
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]: value
    }));
        setServicio({
            ...servicio,
            [name]: value
        });
    };

    const dataSendCategoria = () => {
        setData((prevData) => ({
            ...prevData,
            categoria: categoriaSelected ? categoriaSelected.value : '',
        }));
    }

    const dataSend = () => {
        setData((prevData) => ({
            ...prevData,
            sedes: sedeSelected ? [sedeSelected.value] : [],
        }));
    }

    const [handleEditar, setHandleEditar] = useState(false)
    const onHandleEditar = () => {
        setHandleEditar(!handleEditar)
    }

    const editarRequest = async (e) => {
        e.preventDefault()
        try {
            dataSend()
            dataSendCategoria()
            const response = await fetch(`${import.meta.env.VITE_SERVICIO}${servicioSeleccionado}/`, {
                mode: 'cors',
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log('Actualización exitosa');
                setHandleEditar(false)
                console.log(servicio)
                setData([])
            } else {
                console.log('Error al actualizar');
                console.log(servicio)
            }
        }
        catch (error) {
            console.log('Ha ocurrido un error: ', error)
        }
    }

    const eliminarRequest = async() => {
        const response = fetch(`${import.meta.env.VITE_SERVICIO}${servicioSeleccionado}/`, {
            mode: 'cors',
            method: 'delete',
            headers: {'Authorization': `Bearer ${accessToken}`}
        }).then(response => {
            if(!response.ok){
                throw new Error('Algo falló')
            }
            else{
                console.log('El servicio se ha eliminado correctamente')
            }
        })
        .then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log('Ha ocurrido un error, intente más tarde: ', error)
        })
        return response
    }

    return (
        <div className={`fixed-plugin ${mostrarPanelServicio ? 'ps show' : ''}`}>
            {handleEditar === false ?
                <div className="card shadow-lg">
                    <div className="card-header pb-0 pt-3 ">
                        <div className="float-start">
                            <h5 className="mt-3 mb-0">{servicio.nombre}</h5>
                            <p>Precio: ${servicio.precio}</p>
                        </div>
                        <div className="float-end mt-4">
                            <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                                <i className="fa fa-close" onClick={ocultarServicio}></i>
                            </button>
                        </div>
                    </div>
                    <hr className="horizontal dark my-1" />
                    <div className="card-body pt-sm-3 pt-0">
                        <div>
                            <h6 className="mb-0">Categoria del servicio</h6>
                            <p className="text-sm">{servicio.sedes ? servicio?.sedes?.nombre : 'Loading...'}</p>
                            <h6 className="mb-0">Sede del servicio</h6>
                            <p className="text-sm">{servicio.categoria ? servicio?.categoria?.nombre : 'Loading...'}</p>
                        </div>
                        <div className="mt-3">
                            <h6 className="mb-0">Descripcion del servicio</h6>
                            <p className="text-sm">{servicio.descripcion}</p>
                        </div>
                        <div className="d-flex">
                        </div>
                        <hr className="horizontal dark my-sm-4" />
                        <a className="btn bg-gradient-dark w-100" onClick={onHandleEditar}>Editar servicio</a>
                        <a className="btn btn-outline-dark w-100" onClick={eliminarRequest}>Eliminar servicio</a>

                    </div>
                </div>
                :
                <form id='editarServicio' onSubmit={editarRequest}>
                    <div className="card shadow-lg">
                        <div className="card-header pb-0 pt-3 ">
                            <div className="float-start">
                                <h5 className="mt-3 mb-0">Editar servicio</h5>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Nombre servicio:</label>
                                    <input type="text" className="form-control" value={servicio.nombre} onChange={handleInputChange} id="nombre" name="nombre" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Precio:</label>
                                    <input type="number" className="form-control" value={servicio.precio} onChange={handleInputChange} id="precio" name="precio" />
                                </div>
                            </div>
                            <div className="float-end mt-4">
                                <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                                    <i className="fa fa-close" onClick={ocultarServicio}></i>
                                </button>
                            </div>
                        </div>
                        <hr className="horizontal dark my-1" />
                        <div className="card-body pt-sm-3 pt-0">
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Categoria del servicio:</label>
                                {dataReceived ? (
                                    <Select
                                        name="categoria"
                                        options={categoriaList.map((option) => ({
                                            ...option,
                                        }))}
                                        className="w-65"
                                        onChange={(selectedOption) => {
                                            handleChangeCategoria(selectedOption);
                                            setData((prevData) => ({
                                                ...prevData,
                                                categoria: categoriaSelected.value,
                                            }));
                                        }}
                                        value={categoriaSelected}
                                    />
                                ) : (
                                    <select className="form-select w-65">
                                        <option value="">Loading...</option>
                                    </select>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Sede del servicio:</label>
                                {dataReceived ? (
                                    <Select
                                        name="sedes"
                                        options={sedeList.map((option) => ({
                                            ...option,
                                        }))}
                                        className="w-65"
                                        onChange={handleChange}
                                        value={sedeSelected}
                                    />
                                ) : (
                                    <select className="form-select w-65">
                                        <option value="">Loading...</option>
                                    </select>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Descripción del servicio:</label>
                                <input type="text" className="form-control" value={servicio.descripcion} onChange={handleInputChange} id="descripcion" name="descripcion" />
                            </div>
                            <div className="d-flex">
                            </div>
                            <hr className="horizontal dark my-sm-4" />
                        </div>
                        <button className="btn bg-gradient-dark w-100" type="submit" form='editarServicio'>Guardar cambios</button>
                    </div>
                </form>
            }
        </div>
    );
}

export default SidebarCategorias;