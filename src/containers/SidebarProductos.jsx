import PropTypes from 'prop-types';
import './lateral-modal.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import requestApi from '../components/utils/requestApi';

function SidebarProductos({
  mostrarPanelProducto,
  productoSeleccionado,
  cerrarPanelProducto,
}) {
  const [modoEdicionProducto, setModoEdicionProducto] = useState(false);
  const [dataReceived, setDataReceived] = useState(false);

  const [categoriaList, setCategoriaList] = useState([]);
  const [sedeList, setSedeList] = useState([]);

  const [categoriaSelected, setCategoriaSelected] = useState(
    productoSeleccionado.categoria
  );

  const [sedeSelected, setSedeSelected] = useState([]);

  const [valoresFormulario, setValoresFormulario] = useState({
    nombre: productoSeleccionado.nombre,
    precio: productoSeleccionado.precio,
    descripcion: productoSeleccionado.descripcion,
  });

  function enviarCambiosProducto(e) {
    e.preventDefault();
    const sedes = sedeSelected.map((sede) => sede.value);

    const modificaciones = {
      ...valoresFormulario,
      categoria: categoriaSelected.value,
      sede: sedes,
    };

    requestApi(`producto/${productoSeleccionado.id}`, 'PATCH', modificaciones);
  }

  function editarProducto() {
    setModoEdicionProducto(true);
  }

  function ocultarServicio() {
    // setModoEdicionProducto(false);
  }

  useEffect(() => {
    function obtenerCagetorias() {
      requestApi('categoria', 'GET', {}).then((response) =>
        setCategoriaList(response)
      );
    }

    function obtenerSedes() {
      requestApi('sede', 'GET', {}).then((response) => setSedeList(response));
    }

    obtenerCagetorias();
    obtenerSedes();
    setDataReceived(true);
  }, []);

  return (
    <div
      className={
        mostrarPanelProducto ? 'modal-container open-modal' : 'modal-container'
      }
    >
      {!modoEdicionProducto ? (
        <div className="card w-100" style={{ boxShadow: 'none' }}>
          <div className="card-header pb-0 pt-3 ">
            <div className="float-start w-90">
              <h5 className="mt-3 mb-0">{productoSeleccionado?.nombre}</h5>
              <p>Precio: ${productoSeleccionado?.precio}</p>
            </div>
            <div className="float-end mt-4">
              <button className="btn btn-link text-dark p-0 close-btn">
                <i
                  className="fa fa-close"
                  onClick={() => cerrarPanelProducto()}
                ></i>
              </button>
            </div>
          </div>
          <hr className="horizontal dark my-1" />
          <div className="card-body pt-sm-3 pt-0">
            <div>
              <h6 className="mb-0">Categoria del producto</h6>
              <p className="text-sm">
                {productoSeleccionado?.sedes?.nombre
                  ? productoSeleccionado?.sedes?.nombre
                  : 'Loading...'}
              </p>

              <h6 className="mb-0">Sede del producto</h6>
              <p className="text-sm">
                {productoSeleccionado?.categoria?.nombre
                  ? productoSeleccionado?.categoria?.nombre
                  : 'Loading...'}
              </p>
            </div>
            <div className="mt-3">
              <h6 className="mb-0">Descripcion del producto</h6>
              <p className="text-sm">{productoSeleccionado?.descripcion}</p>
            </div>
            <div className="d-flex"></div>
            <hr className="horizontal dark my-sm-4" />
            <a className="btn bg-gradient-dark w-100" onClick={editarProducto}>
              Editar producto
            </a>
            <a className="btn btn-outline-dark w-100">Eliminar producto</a>
          </div>
        </div>
      ) : (
        <form className="w-100" id="editarServicio">
          <div className="card" style={{ boxShadow: 'none' }}>
            <div className="card-header pb-0 pt-3 ">
              <div className="float-start">
                <h5 className="mt-3 mb-0">Editar producto</h5>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Nombre producto:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={productoSeleccionado?.nombre}
                    onChange={(e) =>
                      setValoresFormulario({
                        ...valoresFormulario,
                        nombre: e.target.value,
                      })
                    }
                    id="nombre"
                    name="nombre"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Precio:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={productoSeleccionado?.precio}
                    onChange={(e) =>
                      setValoresFormulario({
                        ...valoresFormulario,
                        precio: e.target.value,
                      })
                    }
                    id="precio"
                    name="precio"
                  />
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
                <label htmlFor="recipient-name" className="col-form-label">
                  Categoria del producto:
                </label>
                {dataReceived ? (
                  <Select
                    name="categoria"
                    options={categoriaList.map((option) => ({
                      label: option.nombre,
                      value: option.id,
                    }))}
                    className="w-65"
                    onChange={(selectedOption) => {
                      setCategoriaSelected(selectedOption);
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
                <label htmlFor="recipient-name" className="col-form-label">
                  Sede del producto:
                </label>
                {dataReceived ? (
                  <Select
                    isMulti
                    name="sedes"
                    options={sedeList.map((option) => ({
                      label: option.nombre,
                      value: option.id,
                    }))}
                    className="w-65"
                    onChange={(selectedOption) => {
                      setSedeSelected(selectedOption);
                    }}
                    value={sedeSelected}
                  />
                ) : (
                  <select className="form-select w-65">
                    <option value="">Loading...</option>
                  </select>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Descripción del producto:
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={productoSeleccionado?.descripcion}
                  onChange={(e) =>
                    setValoresFormulario({
                      ...valoresFormulario,
                      descripcion: e.target.value,
                    })
                  }
                  id="descripcion"
                  name="descripcion"
                />
              </div>
              <div className="d-flex"></div>
              <hr className="horizontal dark my-sm-4" />
            </div>
            <button
              className="btn bg-gradient-dark w-100"
              onClick={(e) => enviarCambiosProducto(e)}
              form="editarServicio"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SidebarProductos;

SidebarProductos.propTypes = {
  mostrarPanelProducto: PropTypes.bool.isRequired,
  productoSeleccionado: PropTypes.object.isRequired,
  cerrarPanelProducto: PropTypes.func.isRequired,
};
