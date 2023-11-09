import { useContext, useEffect, useState } from 'react';
import { PageTitle } from '../../App';
import Chart from 'chart.js/auto'

function PedidoSemana() {
    const { setTitle } = useContext(PageTitle);
    const accessToken = localStorage.getItem('accessToken')
    const [ventasSede, setVentasSede] = useState(null)

    const pedidosSemanalesRequest = async () => {
        const response = await fetch(import.meta.env.VITE_METRICAS, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })

        const jsonResponse = response.json()
        return jsonResponse
    }


    useEffect(() => {
        setTitle('Dashboard');
        pedidosSemanalesRequest()
            .then((data) => {
                setVentasSede(data.ventas_sede)

                const sedes = data.ventas_sede.map(item => item.sede);
                const ventas = data.ventas_sede.map(item => item.ventas);

                var ctx2 = document.getElementById("doughnut-chart").getContext("2d");

                if (ctx2) {
                    const existingChart = Chart.getChart(ctx2);
                    if (existingChart) {
                        existingChart.destroy();
                    }


                    new Chart(ctx2, {
                        type: "doughnut",
                        data: {
                            labels: sedes,
                            datasets: [{
                                label: 'Pedidos x sede',
                                data: ventas,
                                backgroundColor: [
                                    'rgb(156, 65, 227)',
                                    'rgb(234, 102, 234)',
                                    'rgb(62, 57, 233)',
                                    'rgb(74, 171, 189)',
                                    'rgb(203, 40, 57)',
                                    'rgb(192, 249, 53)'
                                ],
                                hoverOffset: 4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                }
                            },
                            interaction: {
                                intersect: false,
                                mode: 'index',
                            },

                        },
                    });
                }
            })
    }, []);




    return <div className="col-lg-7">
            <div className="card mb-3">
                <div className="card-body p-3">
                    <div className="chart">
                        <canvas id="doughnut-chart" className="chart-canvas" height="300px"></canvas>
                    </div>
                    <h6 className="ms-2 mt-4 mb-0">Ventas realizadas por sede</h6>
                </div>
            </div>
    </div>
}

export default PedidoSemana;
