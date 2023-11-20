import PropTypes from 'prop-types';
import styles from '../../assets/css/modules/sedes.module.css';

function Sedes({ sedes, setSede, selected }) {
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

Sedes.propTypes = {
  sedes: PropTypes.array.isRequired,
  setSede: PropTypes.func.isRequired,
  selected: PropTypes.object,
};
