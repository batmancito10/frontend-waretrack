import { useContext, useEffect, useState } from 'react';
import { PageTitle } from '../../App';
import requestApi from '../../components/utils/requestApi';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/modules/facturas.module.css';

function Facturas() {
  const { setTitle } = useContext(PageTitle);
  const [selectedSede, setSelectedSede] = useState({});
  const [allSedes, setAllSedes] = useState([]);
  const navigate = useNavigate();

  function goToFacturas(sedeId) {
    const timerId = setTimeout(() => {
      navigate(`/facturas/lista/${sedeId}`);
    }, 300);

    return () => clearTimeout(timerId);
  }

  useEffect(() => {
    setTitle('Facturas');

    requestApi('sede', 'GET', {}).then((res) => {
      setAllSedes(res);
    });

    return () => {};
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSelectedSede({});
    }, 200);

    return () => clearTimeout(timerId);
  }, [selectedSede]);

  return (
    <div className={styles.container_body}>
      <div className={styles.container_cards}>
        {allSedes.map((sede) => (
          <div
            key={sede.id}
            className={`${styles.card} ${
              selectedSede.id === sede.id ? styles.selected : null
            }`}
            onClick={() => {
              setSelectedSede(sede);
              goToFacturas(sede.id);
            }}
          >
            <h4>{sede.ciudad}</h4>
            <h2>{sede.nombre}</h2>
            <strong>{sede.direccion}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Facturas;
