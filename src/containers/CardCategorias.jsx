import { useState, useEffect } from 'react';
import requestApi from '../components/utils/requestApi';
import SidebarProductos from './SidebarProductos';
import SidebarServicios from './SidebarServicios';
import Paginacion from '../components/Paginacion';
import AgregarServicioModal from '../components/modals/AgregarServicioModal';

function CardCategorias() {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [mostrarPanelServicio, setMostrarPanelServicio] = useState(false);

  const [mostrarPanelProducto, setMostrarPanelProducto] = useState(false);

  const [servicios, setServicios] = useState([]);
  const [productos, setProductos] = useState([]);

  const [agregarServicioModal, setAgregarServicioModal] = useState(false);

  function obtenerServicios() {
    requestApi('/servicio', 'GET', {}).then((response) =>
      setServicios(response)
    );
  }

  function obtenerProductos() {
    requestApi('/producto', 'GET', {}).then((response) =>
      setProductos(response)
    );
  }

  function abrirPanelServicio() {
    setMostrarPanelProducto(false);
    setMostrarPanelServicio(true);
  }

  function cerrarPanelServicio() {
    setMostrarPanelServicio(false);
  }

  function abrirPanelProducto() {
    setMostrarPanelServicio(false);
    setMostrarPanelProducto(true);
  }

  function cerrarPanelProducto() {
    setMostrarPanelProducto(false);
  }

  useEffect(() => {
    obtenerServicios();
    obtenerProductos();
    return () => {};
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [productos]);

  const pageCount = Math.ceil(productos?.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleData = productos?.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <div className="col-lg-12">
        <div className="card h-auto">
          <div className="card-header pb-0 p-3">
            <div className="flex flex-row">
              <div className="col-6 d-flex align-items-center w-100 justify-content-between">
                <h6 className="mb-0">Servicios</h6>
                <button
                  type="button"
                  className="btn btn-sm bg-gradient-info mb-0"
                  onClick={() => setAgregarServicioModal(true)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="card-body p-3 pb-0">
            <ul className="list-group">
              {Array.isArray(servicios) ? (
                servicios.map((servicio) => (
                  <li
                    className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                    onClick={() => {
                      abrirPanelServicio();
                      setServicioSeleccionado(servicio);
                    }}
                    style={{ cursor: 'pointer' }}
                    key={servicio.id}
                  >
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark font-weight-bold text-sm">
                        {servicio.nombre}
                      </h6>
                      <span className="text-xs">
                        {servicio.categoria.nombre}
                      </span>
                    </div>
                    <div className="d-flex align-items-center text-sm">
                      ${servicio.precio}
                    </div>
                  </li>
                ))
              ) : (
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark font-weight-bold text-sm">
                    Aún no se cuentan con productos
                  </h6>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className="card h-auto mt-3">
          <div className="card-header pb-0 p-3">
            <div className="row">
              <div className="col-6 d-flex align-items-center">
                <h6 className="mb-0">Productos</h6>
              </div>
            </div>
          </div>
          <div className="card-body p-3 pb-0">
            <ul className="list-group">
              {Array.isArray(visibleData) ? (
                visibleData.map((producto) => (
                  <li
                    className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                    onClick={() => {
                      abrirPanelProducto();
                      setProductoSeleccionado(producto);
                    }}
                    style={{ cursor: 'pointer' }}
                    key={producto.id}
                  >
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark font-weight-bold text-sm">
                        {producto.nombre}
                      </h6>
                      <span className="text-xs">
                        {producto.categoria.nombre}
                      </span>
                    </div>
                    <div className="d-flex align-items-center text-sm">
                      ${producto.precio}
                    </div>
                  </li>
                ))
              ) : (
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark font-weight-bold text-sm">
                    Aún no se cuentan con productos
                  </h6>
                </div>
              )}
            </ul>
            <Paginacion
              currentPage={currentPage}
              pageCount={pageCount}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        <div className="card h-auto mt-3">
          <div className="card-header pb-0 p-3">
            <div className="row">
              <div className="col-6 d-flex align-items-center">
                <h6 className="mb-0">Activos</h6>
              </div>
            </div>
          </div>
          <div className="card-body p-3 pb-0">
            <ul className="list-group">
              <li
                className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex flex-column">
                  <h6 className="mb-1 text-dark font-weight-bold text-sm">
                    Servicio 1
                  </h6>
                  <span className="text-xs">Categoria a la que pertenece</span>
                </div>
                <div className="d-flex align-items-center text-sm">Precio</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {mostrarPanelProducto && (
        <SidebarProductos
          mostrarPanelProducto={mostrarPanelProducto}
          productoSeleccionado={productoSeleccionado}
          cerrarPanelProducto={cerrarPanelProducto}
        />
      )}

      {agregarServicioModal && (
        <AgregarServicioModal
          agregarServicioModal={agregarServicioModal}
          setAgregarServicioModal={setAgregarServicioModal}
        />
      )}

      {mostrarPanelServicio && (
        <SidebarServicios
          mostrarPanelServicio={mostrarPanelServicio}
          servicioSeleccionado={servicioSeleccionado}
          cerrarPanelServicio={cerrarPanelServicio}
        />
      )}
    </>
  );
}

export default CardCategorias;
