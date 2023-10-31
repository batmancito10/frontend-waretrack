import { useEffect, useState } from 'react';
import styles from '../../assets/css/modules/ventas.module.css';
import requestApi from '../../components/utils/requestApi';

function Ventas() {
  const [inputValues, setinputValues] = useState({});

  const [cliente, setCliente] = useState([]);
  const [funcionario, setFuncionario] = useState([]);
  const [sede, setSede] = useState([]);
  const [producto, setProducto] = useState([]);
  const [servicio, setServicio] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  function handleInputChange(e) {
    setinputValues({ ...inputValues, [e.target?.name]: e.target?.value });
  }

  function getClient() {
    const res = requestApi('cliente', 'GET');
    return res;
  }

  function getFuncionario() {
    const res = requestApi('funcionario', 'GET');
    return res;
  }

  function getSede() {
    const res = requestApi('sede', 'GET');
    return res;
  }

  function getProducto() {
    const res = requestApi('producto', 'GET');
    return res;
  }

  function getServicio() {
    const res = requestApi('servicio', 'GET');
    return res;
  }

  function calculateTotalValue() {
    const selectedProduct = producto.find(
      (product) => product.id === Number(inputValues.producto)
    );
    const selectedService = servicio.find(
      (servicio) => servicio.id === Number(inputValues.servicio)
    );

    let total = 0;

    if (selectedProduct && selectedService) {
      total = selectedProduct?.precio + selectedService?.precio;
    } else if (selectedProduct) {
      total = selectedProduct?.precio;
    } else if (selectedService) {
      total = selectedService?.precio;
    } else {
      total = 0;
    }

    setTotalPrice(total);
  }

  useEffect(() => {
    const cliente = getClient();
    cliente.then((res) => setCliente(res));

    const funcionario = getFuncionario();
    funcionario.then((res) => setFuncionario(res));

    const sede = getSede();
    sede.then((res) => setSede(res));

    const producto = getProducto();
    producto.then((res) => setProducto(res));

    const servicio = getServicio();
    servicio.then((res) => setServicio(res));
  }, []);

  useEffect(() => {
    calculateTotalValue();
    return () => {};
  }, [inputValues]);

  return (
    <div className={styles.container_form}>
      <form className={styles.form}>
        <label htmlFor="funcionario" className={`${styles.label}`}>
          <p className={`${styles.label_p}`}>Funcionario</p>

          <select
            className={`${styles.select} form-control`}
            placeholder="funcionario"
            id="funcionario"
            name="funcionario"
            onChange={(e) => handleInputChange(e)}
          >
            <option> seleccionar </option>
            {funcionario?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.first_name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="sede" className={`${styles.label}`}>
          <p className={`${styles.label_p}`}>Sede</p>

          <select
            className="form-control"
            placeholder="sede"
            id="sede"
            name="sede"
            onChange={(e) => handleInputChange(e)}
          >
            <option> seleccionar </option>
            {sede?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="producto" className={`${styles.label}`}>
          <p className={`${styles.label_p}`}>Producto</p>
          <select
            className="form-control"
            placeholder="producto"
            id="producto"
            name="producto"
            onChange={(e) => handleInputChange(e)}
          >
            <option> seleccionar </option>
            {producto?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="servicio" className={`${styles.label}`}>
          <p className={`${styles.label_p}`}>Servicio</p>
          <select
            className="form-control"
            placeholder="servicio"
            id="servicio"
            name="servicio"
            onChange={(e) => handleInputChange(e)}
          >
            <option> seleccionar </option>
            {servicio?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className={styles.container_total}>
        <span>${totalPrice} </span>
      </div>
    </div>
  );
}

export default Ventas;
