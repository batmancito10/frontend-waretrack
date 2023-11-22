import { useContext, useEffect, useState } from 'react';
import { PageTitle } from '../../App';
import VentasSemana from '../../components/metricas/VentasSemana';
import VentasSede from '../../components/metricas/VentasSede';
import TotalProductos from '../../components/metricas/TotalProductos';
import styles from '../../assets/css/modules/dashboard.module.css';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import AgregarSede from '../../components/modals/sedes/AgregarSede';

function Dashboard() {
  const { setTitle } = useContext(PageTitle);
  const [sedes, setSedes] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const SedesRequest = async () => {
    const response = await fetch(import.meta.env.VITE_SEDE, {
      mode: 'cors',
      method: 'get',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  function chunkArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  const chunkedSedes = chunkArray(sedes, 3);

  useEffect(() => {
    setTitle('Dashboard');
    SedesRequest().then((data) => {
      setSedes(data);
    });
  }, []);

  const pStyles = {
    width: '230px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  };

  const clickeable = {
    cursor: 'pointer',
  };

  function verDetalles(id) {
    navigate(`/detalle-sede/${id}`);
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container_sedes}>
        <div className="container-title-sedes">
          <h6>Sedes</h6>
          <AgregarSede />
          <div className="carrousel-sedes">
            <Carousel
              showArrows={true}
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              interval={3000}
            >
              {chunkedSedes.map((sedesGroup, index) => (
                <div key={index} className="row">
                  {sedesGroup.map((sede) => (
                    <div
                      className="div-clickeable col-xl-4 col-sm-6 mb-xl-0 mb-4 "
                      style={clickeable}
                      key={sede.id}
                    >
                      <div
                        className="card"
                        onClick={() => verDetalles(sede.id)}
                      >
                        <div className="card-body p-3">
                          <div className="row">
                            <div className="col-8">
                              <div className="numbers">
                                <p
                                  className="text-sm mb-0 font-weight-bold text-start div-clickeable"
                                  style={pStyles}
                                >
                                  {sede.nombre}
                                </p>
                                <h5
                                  className="font-weight-bolder mb-0 text-start div-clickeable"
                                  style={pStyles}
                                >
                                  {sede.direccion}
                                </h5>
                                <h6>{sede.ciudad}</h6>
                              </div>
                            </div>
                            <div className="col-4 text-end d-flex justify-content-center align-items-center">
                              <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-3">
        <VentasSemana></VentasSemana>
        <VentasSede></VentasSede>
      </div>
      <TotalProductos></TotalProductos>
    </div>
  );
}

export default Dashboard;
