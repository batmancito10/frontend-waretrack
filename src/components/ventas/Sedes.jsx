import { useState } from 'react';
import styles from '../../assets/css/modules/sedes.module.css';

function Sedes({ sedes, setSede, selected }) {
  const [cardActive, setCardActive] = useState('');
  return (
    <div className={styles.container_cards}>
      {sedes?.map((sd) => (
        <div
          key={sd.id}
          className={`${styles.card} ${
            sd.id === selected?.id ? styles.active : null
          }`}
          onClick={() => setSede(sd)}
        >
          <p className={styles.title}>{sd.nombre}</p>

          <div className={styles.card_location}>
            <p>{sd.ciudad}</p>
            <span>{sd.direccion}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sedes;
