import Sedes from '../../components/ventas/Sedes';
import Select from 'react-select';
import styles from '../../assets/css/modules/ventas.module.css';
import requestApi from '../../components/utils/requestApi';
import VentaManager from '../../components/ventas/VentaManager';
import { useEffect, useState } from 'react';


function Ventas() {
  const [inputValues, setinputValues] = useState({});

  const [cliente, setCliente] = useState([]);
  const [cajaCompleta, setCajaCompleta] = useState({});
  const [sede, setSede] = useState([]);
  const [producto, setProducto] = useState([]);
  const [servicio, setServicio] = useState([]);

  const [selectedSede, setSelectedSede] = useState(null);
  const [selecteProducts, setSelecteProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);


  function getClient() {
    const res = requestApi('cliente', 'GET');
    return res;
  }

  function getCajaCompleta() {
    const res = requestApi('caja/completa', 'GET');
    return res;
  }

  function setInformation() {
    if (cajaCompleta) {
      setSede(cajaCompleta.sedes);
      setProducto(cajaCompleta.productos);
      setServicio(cajaCompleta.servicios);
    }
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
    cajaCompleta && setInformation();
  }, [cajaCompleta]);

  useEffect(() => {
    const cajaCompleta = getCajaCompleta();
    cajaCompleta.then((res) => setCajaCompleta(res));

    const cliente = getClient();
    cliente.then((res) => setCliente(res));
  }, []);

  useEffect(() => {
    calculateTotalValue();
    return () => {};
  }, [inputValues]);
  

  return (
    <div className={styles.container_form}>
      <Sedes sedes={sede} setSede={setSelectedSede} />

      <h1>
        {selectedSede?.nombre ? selectedSede.nombre : 'seleccione una sede'}
      </h1>
      <br />
      <br />

      <form className={styles.form}>
        <label htmlFor="producto" className={`${styles.label}`}>
          <p className={`${styles.label_p}`}>Producto</p>
          <Select
            isDisabled={selectedSede === null || producto.length === 0}
            placeholder={producto?.length === 0 && 'Sin productos'}
            isMulti
            options={producto?.map((pro) => ({
              label: pro.nombre,
              value: pro.id,
            }))}
            onChange={(selectedProducts) =>
              setSelecteProducts(selectedProducts)
            }
          />
        </label>

        <label htmlFor="servicio" className={`${styles.label}`}>
          <p className={`${styles.label_p}`}>Servicio</p>
          <Select
            isDisabled={selectedSede === null || servicio.length === 0}
            placeholder={servicio?.length === 0 && 'Sin servicios'}
            isMulti
            id="servicio"
            name="servicio"
            options={servicio?.map((item) => ({
              label: item.nombre,
              value: item.id,
            }))}
            onChange={(selectedServices) =>
              setSelectedServices(selectedServices)
            }
          />
        </label>
      </form>

      <div className="container-venta_manager">
        <VentaManager products={selecteProducts} services={selectedServices} />
      </div>

      <div className={styles.container_confirm}>
        <button className={styles.btn_verde}>vender</button>

        <span className={styles.price}>${totalPrice}</span>
      </div>
    </div>
  );
}

export default Ventas;
