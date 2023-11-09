import { useContext, useEffect, useState } from 'react';
import { PageTitle } from '../../App';
import Chart from 'chart.js/auto'
 

function VentasSemana() {
    const { setTitle } = useContext(PageTitle);
    const accessToken = localStorage.getItem('accessToken')
    const [ventasSemana, setVentasSemana] = useState(null)

    const ventasSemanalesRequest = async () => {
        const response = await fetch(import.meta.env.VITE_METRICAS, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })

        const jsonResponse = response.json()
        return jsonResponse
    }


    function fechaHora(fechaAPI) {
        const fecha = fechaAPI.split('T')[0]
        return fecha;
    }

    function obtenerFechasDeSemana(fecha) {
        const fechaActual = new Date(fecha);
        const primerDiaDeSemana = fechaActual.getDate() - fechaActual.getDay();
        const inicioDeSemana = new Date(fechaActual.setDate(primerDiaDeSemana));
        const fechasDeSemana = [];

        for (let i = 0; i < 7; i++) {
            const fechaActual = new Date(inicioDeSemana);
            fechaActual.setDate(inicioDeSemana.getDate() + i);
            fechasDeSemana.push(fechaHora(fechaActual.toISOString()));
        }

        return fechasDeSemana;
    }

    const obtenerVentasPorDia = (ventas) => {
        const ventasPorDia = Array(7).fill(0);

        ventas.forEach((venta) => {
            const fecha = new Date(venta.created_at);
            const diaDeLaSemana = fecha.getDay();

            ventasPorDia[diaDeLaSemana] += venta.total;
        });

        return ventasPorDia;
    };


    const hoy = new Date();
    const fechasDeSemanaActual = obtenerFechasDeSemana(hoy);
    let ventasPorDia = []

    useEffect(() => {
        setTitle('Dashboard');
        ventasSemanalesRequest()
            .then((data) => {
                setVentasSemana(data.ventas_semana)
                ventasPorDia = obtenerVentasPorDia(ventasSemana)

                var ctx1 = document.getElementById("chart-line").getContext("2d");

                if (ctx1) {
                    const existingChart = Chart.getChart(ctx1);
                    if (existingChart) {
                        existingChart.destroy();
                    }

                    var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

                    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
                    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
                    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)');

                    new Chart(ctx1, {
                        type: "line",
                        data: {
                            labels: fechasDeSemanaActual,
                            datasets: [{
                                label: "Ventas totales",
                                tension: 0.4,
                                pointRadius: 0,
                                borderColor: "#cb0c9f",
                                borderWidth: 3,
                                backgroundColor: gradientStroke1,
                                fill: true,
                                data: ventasPorDia,
                                maxBarThickness: 6

                            }
                            ],
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
                            scales: {
                                y: {
                                    grid: {
                                        drawBorder: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        borderDash: [5, 5]
                                    },
                                    ticks: {
                                        display: true,
                                        padding: 10,
                                        color: '#b2b9bf',
                                        font: {
                                            size: 11,
                                            family: "Open Sans",
                                            style: 'normal',
                                            lineHeight: 2
                                        },
                                    }
                                },
                                x: {
                                    grid: {
                                        drawBorder: false,
                                        display: false,
                                        drawOnChartArea: false,
                                        drawTicks: false,
                                        borderDash: [5, 5]
                                    },
                                    ticks: {
                                        display: true,
                                        color: '#b2b9bf',
                                        padding: 20,
                                        font: {
                                            size: 11,
                                            family: "Open Sans",
                                            style: 'normal',
                                            lineHeight: 2
                                        },
                                    }
                                },
                            },
                        },
                    });
                }
            })
    }, [ventasSemana == null]);




    return <div className="col-lg-7">
        <div className="card z-index-2">
            <div className="card-header pb-0">
                <h6>Resumen de ventas de la última semana</h6>
            </div>
            <div className="card-body p-3">
                <div className="chart">
                    <canvas id="chart-line" className="chart-canvas" height="300"></canvas>
                </div>
            </div>
        </div>
    </div>
}

export default VentasSemana;
