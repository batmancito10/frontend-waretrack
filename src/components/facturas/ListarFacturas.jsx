import { useEffect, useState } from 'react';
import requestApi from '../utils/requestApi';
import { useParams } from 'react-router-dom';
import styles from '../../assets/css/modules/listarFacturas.module.css';
import DetalleFacturaModal from './DetalleFacturaModal';

function ListarFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [showFacturaModal, setShowFacturaModal] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState({});

  const { id } = useParams();

  useEffect(() => {
    requestApi(`factura/${id}/sedes`, 'GET').then((res) => setFacturas(res));
    return () => {};
  }, []);

  return (
    <div className={styles.container_cards}>
      {facturas.map((factura) => {
        const fecha = factura.created_at
          .split('T')[0]
          .split('-')
          .reverse()
          .join('-');
        return (
          <div
            key={factura.id}
            className={styles.card}
            onClick={() => {
              setShowFacturaModal(true);
              setFacturaSeleccionada(factura);
            }}
          >
            <h3>{factura.codigo}</h3>
            <h5>{fecha}</h5>
            <h5>{factura.total}</h5>
          </div>
        );
      })}

      {showFacturaModal && (
        <DetalleFacturaModal
          showModal={showFacturaModal}
          closeModal={setShowFacturaModal}
          facturaInfo={facturaSeleccionada}
        />
      )}
    </div>
  );
}

export default ListarFacturas;
