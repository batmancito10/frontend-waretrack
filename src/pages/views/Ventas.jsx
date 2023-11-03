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

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  const [selectedSede, setSelectedSede] = useState(null);
  const [selectedProducts, setSelecteProducts] = useState([]);
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

  function filterProduct() {
    const uniqueProducts = new Set();

    producto?.forEach((pdt) => {
      pdt.sedes.forEach((sede) => {
        if (sede.sede_id === selectedSede?.id) {
          uniqueProducts.add(pdt);
        }
      });
    });

    setFilteredProducts(Array.from(uniqueProducts));
  }

  useEffect(() => {
    filterProduct();
    return () => {};
  }, [selectedSede]);

  function calculateTotalValue() {
    let total = 0;
    selectedServices.forEach((srv) => {
      // let productTotal = srv.price * srv.amount
      total += srv.price;
    });

    selectedProducts.forEach((prd) => {
      // let productTotal = prd.price * prd.amount
      total += prd.price;
    });

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
  }, [selectedProducts, selectedServices]);

  return (
    <div className={styles.container_form}>
      <Sedes sedes={sede} setSede={setSelectedSede} selected={selectedSede} />

      <form className={styles.form}>
        <label htmlFor="producto" className={`${styles.label}`}>
          <p className={`${styles.label_p}`}>Producto</p>
          <Select
            isDisabled={selectedSede === null || producto.length === 0}
            placeholder={producto?.length === 0 && 'Sin productos'}
            isMulti
            options={filteredProducts?.map((pro) => ({
              label: pro.nombre,
              value: pro.id,
              price: pro.precio,
              amount: 1,
            }))}
            value={selectedProducts}
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
            options={servicio?.map((srv) => ({
              label: srv.nombre,
              value: srv.id,
              price: srv.precio,
              amount: 1,
            }))}
            value={selectedServices}
            onChange={(selectedServices) =>
              setSelectedServices(selectedServices)
            }
          />
        </label>
      </form>

      <div className="container-venta_manager">
        <VentaManager
          products={selectedProducts}
          services={selectedServices}
          setSelecteProducts={setSelecteProducts}
          setSelectedServices={setSelectedServices}
        />
      </div>

      <div className={styles.container_confirm}>
        <button className={styles.btn_verde}>vender</button>

        <span className={styles.price}>${totalPrice}</span>
      </div>
    </div>
  );
}

export default Ventas;
