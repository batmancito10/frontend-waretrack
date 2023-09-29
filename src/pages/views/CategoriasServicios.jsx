import { useState } from "react";
import CardCategorias from "../../containers/CardCategorias";
import Categorias from "../../containers/Categorias";
import SidebarCategorias from "../../containers/SidebarCategorias";

function CategoriasServicios() {
    const [mostrarPanel, setMostrarPanel] = useState(false)

    const togglePanel = () => {
        setMostrarPanel(!mostrarPanel)
    }
    return <div className="row">
        <Categorias togglePanel={togglePanel}/>
        <CardCategorias togglePanel={togglePanel}/>
        <SidebarCategorias mostrarPanel={mostrarPanel}></SidebarCategorias>

    </div>
}

export default CategoriasServicios;