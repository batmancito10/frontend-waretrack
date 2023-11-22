import PropTypes from 'prop-types';
import styles from '../../assets/css/modules/modals/DetalleFacturaModal.module.css';

function DetalleFacturaModal({ showModal, closeModal, facturaInfo }) {
  const fecha = facturaInfo.created_at
    .split('T')[0]
    .split('-')
    .reverse()
    .join('-');
  const hora = facturaInfo.created_at.split('T')[1].split('.')[0];

  return (
    <div
      className={`${styles.overlay} ${showModal ? styles.modal_open : null}`}
    >
      <div className={`${styles.container_card}`}>
        <div className={`px-2 ${styles.factura_container}`}>
          <div className="text-center pb-3">
            <h4>{facturaInfo.codigo}</h4>
            <p>{fecha}</p>
          </div>
          <div className="pb-3">
            <div className="d-flex justify-content-between">
              <p>Cliente:</p> <span>{facturaInfo.cliente || 'sin datos'}</span>
            </div>
            <div className="d-flex justify-content-between">
              <p>Hora:</p> <span>{hora}</span>
            </div>
          </div>

          <div className="w-100 ">
            {facturaInfo.producto.length > 0 ? (
              <p className="text-center w-100 d-block font-weight-bold pb-3">
                PRODUCTOS
              </p>
            ) : (
              <p className="text-center w-100 d-block font-weight-bold pb-3">
                {' '}
                SIN PRODUCTOS
              </p>
            )}
            {facturaInfo.producto.map((p) => (
              <div key={p.id} className="pb-3">
                <p className="text-ellipsis">{p.nombre}</p>
                <div className="d-flex justify-content-between">
                  <p>unidades:{p.unidades}</p>
                  <p>total:{p.precio * p.unidades}</p>
                </div>
              </div>
            ))}
          </div>

          {facturaInfo.servicio.length > 0 ? (
            <p className="text-center w-100 d-block font-weight-bold pb-3">
              SERVICIOS
            </p>
          ) : (
            <p className="text-center w-100 d-block font-weight-bold pb-3">
              {' '}
              SIN SERVICIOS
            </p>
          )}
          {facturaInfo.servicio.map((s) => (
            <div key={s.id} className="pb-3">
              <p className="text-ellipsis">{s.nombre}</p>
              <div className="d-flex justify-content-between">
                <p>unidades:{s.unidades}</p>
                <p>total:{s.precio * s.unidades}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-primary" onClick={() => closeModal(false)}>
            aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleFacturaModal;

DetalleFacturaModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  facturaInfo: PropTypes.shape({
    created_at: PropTypes.string,
    codigo: PropTypes.string,
    cliente: PropTypes.string,
    servicio: PropTypes.array,
    producto: PropTypes.array,
  }).isRequired,
};
