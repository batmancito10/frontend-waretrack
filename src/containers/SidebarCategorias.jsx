import { useState, useContext, useEffect } from "react";
import { PageTitle } from '../App'
import Select from "react-select";


function SidebarCategorias({ mostrarPanel, categoriaSeleccionada }) {
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)
    const [categoria, setCategoria] = useState([])

    const categoriaRequest = async () => {
        const response = await fetch(`${import.meta.env.VITE_CATEGORIA}${categoriaSeleccionada}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })

        const jsonResponse = await response.json()
        return jsonResponse
    }

    useEffect(() => {
        if (!categoriaSeleccionada) return;

        setTitle('Detalle Categoria')
        categoriaRequest()
            .then(data => {
                setCategoria(data)
            })
            .catch(error => {
                console.log('Ha ocurrido un error ', error)
            })
    }, [categoriaSeleccionada])

    const colors = [
        { name: 'Rojo', hex: '#dc3545' },
        { name: 'Verde', hex: '#28a745' },
        { name: 'Azul', hex: '#007bff' },
        { name: 'Amarillo', hex: '#ffc107' },
        { name: 'Cyan', hex: '#17a2b8' },
        { name: 'Morado', hex: '#6610f2' },
    ];

    const [handleEditar, setHandleEditar] = useState(false)
    const onHandleEditar = () => {
        setHandleEditar(!handleEditar)
    }

    const handleColorClick = (color) => {
        setCategoria({
            ...categoria,
            color: color.hex,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoria({
            ...categoria,
            [name]: value,
        });
    };

    const editarRequest = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_CATEGORIA}${categoriaSeleccionada}/`, {
                mode: 'cors',
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoria)
            })
            if (response.ok) {
                console.log('Actualización exitosa');
                setHandleEditar(true)
            } else {
                console.log('Error al actualizar');
            }
        }
        catch (error) {
            console.log('Ha ocurrido un error: ', error)
        }
    }

    return (
        <div className={`fixed-plugin ${mostrarPanel ? 'ps show' : ''}`}>
            {handleEditar === true ?
                <div className="card shadow-lg">
                    <div className="card-header pb-0 pt-3 ">
                        <div className="float-start">
                            <h5 className="mt-3 mb-0">{`${categoria.nombre}`}</h5>
                            <p>{categoria.tipo}</p>
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
                            <h6 className="mb-0">Color de la categoria</h6>
                        </div>
                        <a href="#" className="switch-trigger background-color">
                            <div className="badge-colors my-2 text-start">
                                <div className="badge filter" style={{ backgroundColor: categoria.color, width: '25px', height: '25px' }}></div>
                            </div>
                        </a>
                        <div className="mt-3">
                            <h6 className="mb-0">Descripcion de la categoria</h6>
                            <p className="text-sm">{`${categoria.descripcion}`}</p>
                        </div>
                        <div className="d-flex">
                        </div>
                        <hr className="horizontal dark my-sm-4" />
                        <a className="btn bg-gradient-dark w-100" href="#" onClick={onHandleEditar}>Editar categoria</a>
                        <a className="btn btn-outline-dark w-100" href="#">Eliminar categoria</a>

                    </div>
                </div>
                :
                <form id='editarCategoria' onSubmit={editarRequest}>
                    <div className="card shadow-lg">
                        <div className="card-header pb-0 pt-3 ">
                            <div className="float-start">
                                <h5 className="mt-3 mb-0">Editar categoria</h5>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Nombre categoria:</label>
                                    <input type="text" className="form-control" value={categoria.nombre} onChange={handleInputChange} id="nombre" name="nombre" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Tipo:</label>
                                    <input type="text" className="form-control" value={categoria.tipo} onChange={handleInputChange} id="tipo" name="tipo" />
                                </div>
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
                                <h6 className="mb-0">Selecciona un color:</h6>
                            </div>
                            <a href="#" className="switch-trigger background-color">
                                <div className="badge-colors my-2 text-start">
                                    {colors.map(color => {
                                        return <div className={`badge filter ${categoria.color === color.hex ? 'active' : ''}`} style={{ backgroundColor: color.hex, width: '25px', height: '25px' }} onClick={() => handleColorClick(color)} key={color.hex}></div>
                                    })}
                                </div>
                            </a>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Descripción de la categoria:</label>
                                <input type="text" className="form-control" value={categoria.descripcion} onChange={handleInputChange} id="descripcion" name="descripcion" />
                            </div>
                            <div className="d-flex">
                            </div>
                            <hr className="horizontal dark my-sm-4" />
                        </div>
                    <button className="btn bg-gradient-dark w-100" type="submit" form='editarCategoria'>Guardar cambios</button>
                    </div>
                </form>
            }

        </div>
    );
}

export default SidebarCategorias