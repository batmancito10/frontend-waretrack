import { useState } from 'react';
import styles from '../../assets/css/modules/ventaManager.module.css';
import icons from '../../assets/svg/imports';

function VentaManager({
  products,
  services,
  setSelecteProducts,
  setSelectedServices,
}) {
  const [productsAmount, setProductsAmount] = useState([]);

  function handleDelete(category, id) {
    if (category === 'producto') {
      const newProducts = products.filter((product) => product.value !== id);
      setSelecteProducts(newProducts);
    } else if (category === 'servicio') {
      const newServices = services.filter((service) => service.value !== id);
      setSelectedServices(newServices);
    }
  }

  return (
    <div className={styles.manager_container}>
      <table className={styles.table}>
        <tr className={styles.item}>
          <th>Icono</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
        </tr>
        {products.map((prd) => (
          <tr key={prd.value} className={styles.item}>
            <td className={styles.item_icon}>
              {prd?.img ? (
                <img src={prd?.img} alt={`image of product ${prd?.label}`} />
              ) : (
                <img
                  src={icons.carrot}
                  alt={`image of product ${prd?.label}`}
                />
              )}
            </td>
            <td className="product-name">{prd?.label}</td>
            <td className="product-price">${prd?.value}</td>
            <td>
              <input
                className={styles.amount}
                defaultValue={prd.amount}
                type="number"
                min={1}
                max={prd.stock}
                name={prd.label}
              />
              <img
                src={icons.trash}
                onClick={() => handleDelete('producto', prd.value)}
              />
            </td>
          </tr>
        ))}
      </table>

      <div className={styles.divisor}></div>

      <table className={styles.table}>
        <tr className={styles.item}>
          <th>Icon</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cant</th>
        </tr>
        {services.map((srv) => (
          <tr key={srv.value} className={styles.item}>
            <td className={styles.item_icon}>
              {srv?.img ? (
                <img src={srv?.img} alt={`image of product ${srv?.label}`} />
              ) : (
                <img
                  src={icons.carrot}
                  alt={`image of product ${srv?.label}`}
                />
              )}
            </td>
            <td className="product-name">{srv?.label}</td>
            <td className="product-price">${srv?.value}</td>
            <td>
              <input
                className={styles.amount}
                type="number"
                defaultValue={1}
                min={1}
                max={srv.stock}
              />
              <img
                src={icons.trash}
                onClick={() => handleDelete('servicio', srv.value)}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default VentaManager;
