import { useLocation } from 'react-router-dom'
import { PageTitle } from "../App"
import { useContext, useEffect, useState } from 'react'

function StockTable() {
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)

    const location = useLocation();
    const idSede = location.state?.proveedorId;

    const [stock, setStock] = useState([])

    const stockRequest = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_SEDE_STOCK.replace(':id', idSede), {
                mode: 'cors',
                method: 'get',
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }

    useEffect(() => {
        setTitle('Stock sede');
        stockRequest()
            .then((data) => {
                if (data) {
                    setStock(data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener las sedes:', error);
            });
    }, [])

    return <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0">
                    <h6>Projects table</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                        <table className="table align-items-center justify-content-center mb-0">
                            <thead>
                                <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Producto</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Precio</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">descripcion</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Stock</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {stock ? stock.map(producto => {
                                    return <>
                                        <tr key={producto.id}>
                                            <td>
                                                <div className="d-flex px-2">
                                                    <div>
                                                        <img src="src/assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm rounded-circle me-2" alt="spotify" />
                                                    </div>
                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm">{producto.nombre}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm font-weight-bold mb-0">${producto.precio}</p>
                                            </td>
                                            <td>
                                                <span className="text-xs font-weight-bold">{producto.descripcion}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    {producto.stock.map(stockcito => {

                                                        return <span className="me-2 text-xs font-weight-bold" key={stockcito.stock}>{stockcito.stock}</span>
                                                    })}
                                                    <div>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <button className="btn btn-link text-secondary mb-0">
                                                    <i className="fa fa-ellipsis-v text-xs"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                })
                                    : <tr>
                                        <td>
                                            Loading...
                                        </td>

                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default StockTable;