import { useState } from "react";
import CardCategorias from "../../containers/CardCategorias";
import Categorias from "../../containers/Categorias";

function CategoriasServicios() {
    const [mostrarPanel, setMostrarPanel] = useState(false);

    const togglePanel = () => {
        setMostrarPanel(!mostrarPanel);
    };

    return <div className="row">
        <div className="col-md-3">
            <Categorias togglePanel={togglePanel} />
        </div>

        <div className="col-md-9">
            <CardCategorias />
        </div>
        {/* <SidebarCategorias mostrarPanel={mostrarPanel}></SidebarCategorias> */}
    </div>
}

export default CategoriasServicios;