import Select from 'react-select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import requestApi from '../components/utils/requestApi';

function AgregarProducto({
  mostrarPanelAgregarProducto,
  setMostrarPanelAgregarProducto,
}) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [valoresFormulario, setValoresFormulario] = useState([]);

  function obtenerCategorias() {
    requestApi('/categoria', 'GET', {}).then((response) => {
      setCategorias(response);
    });
  }

  function registrarProducto(e) {
    e.preventDefault();
    const data = {
      ...valoresFormulario,
      categoria_id: categoriaSeleccionada,
    };

    requestApi('producto', 'POST', data).then((response) => {
      setMostrarPanelAgregarProducto(false);
      console.log(response);
    });
  }

  useEffect(() => {
    obtenerCategorias();
    return () => {};
  }, []);

  return (
    <>
      <div
        className={
          mostrarPanelAgregarProducto ? ' overlay modal_open' : 'overlay'
        }
      >
        <div className="container_card">
          <div className="modal-header mb-1">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar producto
            </h5>
            <button
              type="button"
              className="btn-close text-dark"
              onClick={() => setMostrarPanelAgregarProducto(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form id="agregarPedido">
            <div
              className="modal-body"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                columnGap: '.5rem',
              }}
            >
              <div className="form-group d-flex">
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'start',
                    flexDirection: 'column',
                  }}
                >
                  <label htmlFor="recipient-name" className="col-form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    onChange={(e) =>
                      setValoresFormulario({
                        ...valoresFormulario,
                        nombre: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group d-flex">
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'start',
                    flexDirection: 'column',
                  }}
                >
                  <label htmlFor="recipient-name" className="col-form-label">
                    Marca:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="marca"
                    onChange={(e) =>
                      setValoresFormulario({
                        ...valoresFormulario,
                        marca: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group d-flex">
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'start',
                    flexDirection: 'column',
                  }}
                >
                  <label htmlFor="recipient-name" className="col-form-label">
                    Descripción:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion"
                    onChange={(e) =>
                      setValoresFormulario({
                        ...valoresFormulario,
                        descripcion: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group d-flex">
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'start',
                    flexDirection: 'column',
                  }}
                >
                  <label htmlFor="recipient-name" className="col-form-label">
                    Precio:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    onChange={(e) =>
                      setValoresFormulario({
                        ...valoresFormulario,
                        precio: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="form-group d-flex ">
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'start',
                  flexDirection: 'column',
                }}
              >
                <label htmlFor="recipient-name" className="col-form-label">
                  Categoría:
                </label>
                <Select
                  className="w-100"
                  options={categorias.map((categoria) => ({
                    value: categoria.id,
                    label: categoria.nombre,
                  }))}
                  onChange={(e) => setCategoriaSeleccionada(e.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card mb-2">
                  <div className="card-header p-0">
                    <div className="btn btn-secondary d-flex gap-2 align-items-center">
                      <i className="ni ni-bag-17 fs-5 py-0"></i>
                      Agregar a sede
                    </div>
                  </div>
                  <div className="card-body px-0 pt-0 pb-2">
                    <table className="table align-items-center justify-content-center mb-0">
                      <thead>
                        <tr>
                          <th
                            className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                            style={{ width: '50%' }}
                          >
                            Nombre
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Cantidad
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Precio unitario
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn bg-gradient-primary"
                form="agregarPedido"
                onClick={(e) => {
                  registrarProducto(e);
                }}
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AgregarProducto;

AgregarProducto.propTypes = {
  mostrarPanelAgregarProducto: PropTypes.bool.isRequired,
  setMostrarPanelAgregarProducto: PropTypes.func.isRequired,
};
