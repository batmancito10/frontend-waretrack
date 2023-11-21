import { useContext, useEffect, useState } from 'react';
import { PageTitle } from '../../App';
import Chart from 'chart.js/auto';

function TotalProductos() {
  const { setTitle } = useContext(PageTitle);
  const accessToken = localStorage.getItem('accessToken');
  const [totalProductos, setTotalProductos] = useState(null);
  const [totalServicios, setTotalServicios] = useState(null);

  const metricasRequest = async () => {
    const response = await fetch(import.meta.env.VITE_METRICAS, {
      mode: 'cors',
      method: 'get',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const jsonResponse = response.json();
    return jsonResponse;
  };

  useEffect(() => {
    setTitle('Dashboard');
    metricasRequest().then((data) => {
      setTotalProductos(data.productos_total);
      setTotalServicios(data.servicios_total);

      const sedes = data.servicios_total.map((item) => item.sede);

      const productos = data.productos_total.map((item) => item.productos);
      const servicios = data.servicios_total.map((item) => item.servicios);

      var ctx3 = document.getElementById('bar-chart').getContext('2d');

      if (ctx3) {
        const existingChart = Chart.getChart(ctx3);
        if (existingChart) {
          existingChart.destroy();
        }

        new Chart(ctx3, {
          type: 'bar',
          data: {
            labels: sedes,
            datasets: [
              {
                label: 'Productos x sede',
                data: productos,
                backgroundColor: [
                  'rgb(233, 173, 46)',
                  'rgb(232, 55, 27)',
                  'rgb(51, 139, 40)',
                  'rgb(29, 153, 117)',
                  'rgb(91, 128, 255)',
                  'rgb(207, 75, 209)',
                ],
                hoverOffset: 4,
              },
              {
                label: 'Servicios x sede',
                data: servicios,
                backgroundColor: [
                  'rgb(233, 173, 46)',
                  'rgb(232, 55, 27)',
                  'rgb(51, 139, 40)',
                  'rgb(29, 153, 117)',
                  'rgb(91, 128, 255)',
                  'rgb(207, 75, 209)',
                ],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
          },
        });
      }
    });
  }, []);

  return (
    <div className="w-100">
      <div className="card z-index-2">
        <div className="card-header pb-0">
          <h6>Cantidad de servicios y productos para una sede</h6>
        </div>
        <div className="card mb-3">
          <div className="card-body p-3">
            <div className="chart">
              <canvas
                id="bar-chart"
                className="chart-canvas"
                height="300px"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalProductos;
