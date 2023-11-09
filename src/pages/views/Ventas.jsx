import PropTypes, { func } from 'prop-types';
import Sedes from '../../components/ventas/Sedes';
import Select from 'react-select';
import styles from '../../assets/css/modules/ventas.module.css';
import requestApi from '../../components/utils/requestApi';
import VentaManager from '../../components/ventas/VentaManager';
import { useEffect, useState } from 'react';

function Ventas() {
  const [cajaCompleta, setCajaCompleta] = useState({});
  const [sede, setSede] = useState([]);
  const [producto, setProducto] = useState([]);
  const [servicio, setServicio] = useState([]);
  const [cedula, setCedula] = useState(null);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  const [selectedSede, setSelectedSede] = useState(null);
  const [selectedProducts, setSelecteProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const cedulaMaxlength = 15;

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

  // controlar el tamaño maximo del input
  function handleInputChange(event) {
    const inputValue = event.target.value;
    if (inputValue.length <= cedulaMaxlength) {
      return setCedula(inputValue);
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

  function filterServices() {
    const uniqueServices = new Set();
    servicio?.forEach((srv) => {
      srv.sedes.forEach((sede) => {
        if (sede === selectedSede?.id) {
          uniqueServices.add(srv);
        }
      });
    });

    setFilteredServices(Array.from(uniqueServices));
  }

  function calculateTotalValue() {
    let total = 0;
    selectedServices.forEach((srv) => {
      total += srv.price * srv.amount;
    });

    selectedProducts.forEach((prd) => {
      total += prd.price * prd.amount;
    });

    setTotalPrice(total);
  }

  function generatePayment() {
    selectedProducts.forEach((prd) => {
      if (prd.amount <= 0) {
        return alert('No hay stock disponible');
      }
    });
    selectedServices.forEach((srv) => {
      if (srv.amount <= 0) {
        return alert('No hay stock disponible');
      }
    });

    const { productsId, servicesId } = getIdproductsAndServices(
      selectedProducts,
      selectedServices
    );

    if (productsId.length === 0 && servicesId.length === 0) {
      return alert('No hay productos ni servicios seleccionados');
    }

    const body = {
      cc: cedula,
      sede: selectedSede.id,
      producto: productsId,
      servicio: servicesId,
      total: totalPrice,
    };

    requestApi('factura', 'POST', body)
      .then(() => {
        setSelectedSede(null);
        clearForm();
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        alert('Error al generar la factura');
      });
  }

  function clearForm() {
    setSelecteProducts([]);
    setSelectedServices([]);
  }

  function getIdproductsAndServices(prds, srvs) {
    let productsInCart = [];
    let servicesInCart = [];

    prds.forEach((prd) => {
      productsInCart.push({ producto: prd.value, unidades: prd.amount });
    });

    srvs.forEach((srv) => {
      servicesInCart.push({ servicio: srv.value, unidades: srv.amount });
    });

    return { productsId: productsInCart, servicesId: servicesInCart };
  }

  useEffect(() => {
    clearForm();
    filterProduct();
    filterServices();
    return () => {};
  }, [selectedSede]);

  useEffect(() => {
    const cajaCompleta = getCajaCompleta();
    cajaCompleta.then((res) => setCajaCompleta(res));
  }, []);

  useEffect(() => {
    cajaCompleta && setInformation();
  }, [cajaCompleta]);

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
            isMulti
            isDisabled={selectedSede === null || producto.length === 0}
            placeholder={producto?.length === 0 && 'Sin productos'}
            options={filteredProducts?.map((pro) => ({
              // si necesitas mas propiedades en ventasManager, solo agregalas aqui
              label: pro.nombre,
              value: pro.id,
              price: pro.precio,
              amount: 1,
              image: pro.imagen,
              stock: pro.sedes.find((sede) => sede.sede_id === selectedSede?.id)
                ?.stock,
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
            options={filteredServices?.map((srv) => ({
              // si necesitas mas propiedades en ventasManager, solo agregalas aqui
              label: srv.nombre,
              value: srv.id,
              price: srv.precio,
              amount: 1,
              image: srv.imagen,
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
        <input
          className={styles.cedula_input}
          type="number"
          placeholder="cedula cliente"
          value={cedula}
          onInput={handleInputChange}
          onChange={(e) => e.preventDefault()}
        />
        <span className={styles.price}>${totalPrice}</span>

        <button className={styles.btn_verde} onClick={generatePayment}>
          vender
        </button>
      </div>
    </div>
  );
}

export default Ventas;

Ventas.propTypes = {
  products: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  setSelecteProducts: PropTypes.func.isRequired,
  setSelectedServices: PropTypes.func.isRequired,
};
