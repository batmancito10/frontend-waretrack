import CardCategorias from "../../containers/CardCategorias";
import Categorias from "../../containers/Categorias";

function CategoriasServicios() {
    return <div className="row">
        <div className="col-md-3">
            <Categorias />
        </div>

        <div className="col-md-9">
            <CardCategorias />
        </div>
    </div>
}

export default CategoriasServicios;