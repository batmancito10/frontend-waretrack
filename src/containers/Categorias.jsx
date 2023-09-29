import { useState, useEffect, useContext } from "react"
import { PageTitle } from '../App'
import SidebarCategorias from "./SidebarCategorias"

function CategoriasCard({togglePanel}) {
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

    return <>
        <div className="col-lg-3 col-md-6">
            <div className="card h-auto">
                <div className="card-header pb-0">
                    <h6>Categorias</h6>
                    <p className="text-sm">
                        <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                    </p>
                </div>
                <div className="card-body p-3">
                    <div className="timeline timeline-one-side">
                        {categorias ? categorias.map(categoria => {
                            return <div className="timeline-block mb-3" key={categoria.id}  onClick={() => {togglePanel(); setCategoriaSeleccionada(categoria.id)}  } style={{ cursor: "pointer" }}>
                                <SidebarCategorias categoriaSeleccionada={categoriaSeleccionada}/>
                                
                                <span className="timeline-step">
                                    <i className="ni ni-cart text-info text-gradient"></i>
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
    </>
}

export default CategoriasCard;