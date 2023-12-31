import PropTypes from 'prop-types';
import './lateral-modal.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import requestApi from '../components/utils/requestApi';

function SidebarServices({
  mostrarPanelServicio,
  servicioSeleccionado,
  cerrarPanelServicio,
}) {
  const [modoEdicionProducto, setModoEdicionProducto] = useState(false);
  const [dataReceived, setDataReceived] = useState(false);

  const [sedeList, setSedeList] = useState([]);

  const [sedeSelected, setSedeSelected] = useState([]);

  const [valoresFormulario, setValoresFormulario] = useState({
    nombre: servicioSeleccionado.nombre,
    precio: servicioSeleccionado.precio,
    descripcion: servicioSeleccionado.descripcion,
  });

  function enviarCambiosProducto(e) {
    e.preventDefault();
    const sedes = sedeSelected.map((sede) => sede.value);

    const modificaciones = {
      ...valoresFormulario,
      sede: sedes,
    };

    requestApi(`servicio/${servicioSeleccionado.id}`, 'PATCH', modificaciones);
  }

  function editarProducto() {
    setModoEdicionProducto(true);
  }

  useEffect(() => {
    function obtenerSedes() {
      requestApi('sede', 'GET', {}).then((response) => setSedeList(response));
    }

    obtenerSedes();
    setDataReceived(true);
  }, []);

  return (
    <div
      className={
        mostrarPanelServicio ? 'modal-container open-modal' : 'modal-container'
      }
    >
      {!modoEdicionProducto ? (
        <div className="card w-100" style={{ boxShadow: 'none' }}>
          <div className="card-header pb-0 pt-3 ">
            <div className="float-start w-90">
              <h5 className="mt-3 mb-0">{servicioSeleccionado?.nombre}</h5>
              <p>Precio: ${servicioSeleccionado?.precio}</p>
            </div>
            <div className="float-end mt-4">
              <button className="btn btn-link text-dark p-0 close-btn">
                <i
                  className="fa fa-close"
                  onClick={() => cerrarPanelServicio()}
                ></i>
              </button>
            </div>
          </div>
          <hr className="horizontal dark my-1" />
          <div className="card-body pt-sm-3 pt-0">
            <div>
              <h6 className="mb-0">Sede del producto</h6>
              <p className="text-sm">
                {servicioSeleccionado?.categoria?.nombre
                  ? servicioSeleccionado?.categoria?.nombre
                  : 'Loading...'}
              </p>
            </div>
            <div className="mt-3">
              <h6 className="mb-0">Descripcion del producto</h6>
              <p className="text-sm">{servicioSeleccionado?.descripcion}</p>
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
                <h5 className="mt-3 mb-0">Editar servicio</h5>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Nombre servicio:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={servicioSeleccionado?.nombre}
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
                    defaultValue={servicioSeleccionado?.precio}
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
                  <i className="fa fa-close" onClick={cerrarPanelServicio}></i>
                </button>
              </div>
            </div>
            <hr className="horizontal dark my-1" />
            <div className="card-body pt-sm-3 pt-0">
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Sede del servicio:
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
                  Descripción del servicio:
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={servicioSeleccionado?.descripcion}
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

export default SidebarServices;

SidebarServices.propTypes = {
  mostrarPanelServicio: PropTypes.bool.isRequired,
  servicioSeleccionado: PropTypes.object.isRequired,
  cerrarPanelServicio: PropTypes.func.isRequired,
};
