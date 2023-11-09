import styles from '../../assets/css/modules/ventaManager.module.css';
import icons from '../../assets/svg/imports';
import PropTypes from 'prop-types';

function VentaManager({
  products,
  services,
  setSelecteProducts,
  setSelectedServices,
}) {
  function handleDelete(category, id) {
    if (category === 'producto') {
      const newProducts = products.filter((product) => product.value !== id);
      setSelecteProducts(newProducts);
    } else if (category === 'servicio') {
      const newServices = services.filter((service) => service.value !== id);
      setSelectedServices(newServices);
    }
  }

  function handleInputChange(event, prd) {
    const inputValue = parseInt(event.target.value, 10);

    if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= prd.stock) {
      const updatedProducts = products.map((product) => {
        if (product.value === prd.value) {
          return { ...product, amount: inputValue };
        }
        return product;
      });

      setSelecteProducts(updatedProducts);
    }
  }
  return (
    <div className={styles.manager_container}>
      <table className={styles.table}>
        <tr className={styles.header}>
          <th>Icono</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>stock</th>
        </tr>
        {products.map((prd) => {
          const { label, value, price, amount, image, stock } = prd;
          return (
            <tr key={value} className={styles.item}>
              <td className={styles.item_icon}>
                {image ? (
                  <img
                    className={styles.item_icon}
                    src={image}
                    alt={`image of product ${label}`}
                  />
                ) : (
                  <img
                    className={styles.item_icon}
                    src={icons.carrot}
                    alt={`image of product ${label}`}
                  />
                )}
              </td>
              <td className={styles.product_name}>{label}</td>
              <td className="product-price">${price}</td>

              <td className={styles.container_icons}>
                <input
                  className={styles.amount}
                  type="number"
                  value={amount}
                  onInput={(e) => handleInputChange(e, prd)}
                  onChange={(e) => e.preventDefault()}
                  name={label}
                />
                <img
                  src={icons.trash}
                  onClick={() => handleDelete('producto', value)}
                />
              </td>
              <td>{stock - amount}</td>
            </tr>
          );
        })}
      </table>

      <div className={styles.divisor}></div>

      <table className={styles.table}>
        <tr className={styles.header}>
          <th>Icono</th>
          <th>Servicio</th>
          <th>Precio</th>
          <th>Cantidad</th>
        </tr>

        {services.map((srv) => {
          const { label, value, price, amount, image } = srv;
          return (
            <tr key={value} className={styles.item}>
              <td className={styles.item_icon}>
                {image ? (
                  <img src={image} alt={`image of service ${label}`} />
                ) : (
                  <img src={icons.carrot} alt={`image of service ${label}`} />
                )}
              </td>
              <td className="product-name">{label}</td>
              <td className="product-price">${price}</td>

              <td className={styles.container_icons}>
                <input
                  className={styles.amount}
                  defaultValue={amount}
                  type="number"
                  min={1}
                  name={label}
                  onChange={(e) => {
                    const newServices = services.map((service) => {
                      if (service.value === value) {
                        service.amount = Number(e.target.value);
                      }
                      return service;
                    });
                    setSelectedServices(newServices);
                  }}
                />
                <img
                  src={icons.trash}
                  onClick={() => handleDelete('servicio', value)}
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default VentaManager;

VentaManager.propTypes = {
  products: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  setSelecteProducts: PropTypes.func.isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};
