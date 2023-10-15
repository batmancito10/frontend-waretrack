import { useState, useEffect, useContext } from "react"
import { PageTitle } from '../App'
import SidebarCategorias from "./SidebarCategorias"

function CategoriasCard() {
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)
    const [categorias, setCategorias] = useState([])

    const categoriasRequest = async () => {
        const response = await fetch(import.meta.env.VITE_CATEGORIA, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })

        const jsonResponse = response.json()
        return jsonResponse
    }

    useEffect(() => {
        setTitle('Categorias')
        categoriasRequest()
            .then(data => {
                setCategorias(data)
            })
            .catch(error => {
                console.log('Ha ocurrido un error en la peticion: ', error)
            })
    }, [])

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)

    const [mostrarPanel, setMostrarPanel] = useState(false);

    const togglePanel = () => {
        setMostrarPanel(true);
    };

    const ocultar = () => {
        setMostrarPanel(false);
    };

    const [modoEdicion, setModoEdicion] = useState(false)

    const edicion = (id) => {
        togglePanel()
        setCategoriaSeleccionada(id)
        setModoEdicion(true)

    }

    const agregar = () => {
        togglePanel()
        setModoEdicion(false)
    }

    return <>
        <div className="col-lg-12 col-md-6">
            <div className="card h-auto">
                <div className="card-header pb-0 px-3 d-flex align-items-center justify-content-between">
                    <h6>Categorias</h6>
                    <button type="button" className="btn btn-sm bg-gradient-info mb-0" onClick={agregar}>+</button>
                </div>
                <div className="card-body p-3">
                    <div className="timeline timeline-one-side">
                        {categorias ? categorias.map(categoria => {
                            return <div className="timeline-block mb-3" key={categoria.id} onClick={() => edicion(categoria.id)} style={{ cursor: "pointer" }}>
                                <span className="timeline-step">
                                    <i className="ni ni-cart" style={{ color: categoria.color }}></i>
                                </span>
                                <div className="timeline-content">
                                    <h6 className="text-dark text-sm font-weight-bold mb-0">{categoria.nombre}</h6>
                                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{categoria.tipo}</p>
                                </div>
                            </div>
                        }) : null}
                    </div>
                </div>
            </div>
        </div>
        {modoEdicion === true ?
            <SidebarCategorias modoEdicion={modoEdicion} categoriaSeleccionada={categoriaSeleccionada} mostrarPanel={mostrarPanel} ocultar={ocultar}/>
            :
            <SidebarCategorias modoEdicion={modoEdicion} mostrarPanel={mostrarPanel} />
        }
    </>
}

export default CategoriasCard;