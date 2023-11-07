import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/css/modules/modals/ventaModal.module.css';

function ModalVenta({ contenido }) {
  const [showModal, setShowModal] = useState(true);

  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      {showModal && (
        <div ref={overlayRef} className={`${styles.overlay} ${styles.open}`}>
          <div ref={modalRef} className={styles.modal}>
            <p className={styles.content}>{contenido}</p>
            <button className={styles.button} onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalVenta;

ModalVenta.propTypes = {
  contenido: PropTypes.string.isRequired,
};
