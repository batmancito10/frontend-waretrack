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

    const [dobleClick, setDobleClick] = useState(false)
    const [inputValue, setInputValue] = useState(0);
    const handleInputStock = (e, stockcito) => {
        setDobleClick(!dobleClick)
        e.stopPropagation();
        setInputValue(stockcito.stock);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const patchRequest = async (e) => {
        e.preventDefault()

        const data = {
            stock: inputValue
        }
        try {
            let idProd = null
            stock.map((stockcito) => {
                idProd = stockcito.id
            })
            const response = await fetch(import.meta.env.VITE_PATCH_STOCK.replace(':sede', idSede).replace(':producto', idProd), {
                mode: 'cors',
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })


            if (response.ok) {
                console.log('Actualización exitosa');
            } else {
                console.log('Error al actualizar');
            }
        }
        catch (error) {
            console.error('Hubo un error al hacer la solicitud', error);
        }
    }

    return <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0">
                    <h6>Poductos y su stock</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                        <table className="table align-items-center justify-content-center mb-0">
                            <thead>
                                <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Producto</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Precio</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Descripción</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Código</th>
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
                                                    {/* <div>
                                                        <img src="src/assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm rounded-circle me-2" alt="spotify" />
                                                    </div> */}
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
                                            <td>
                                                <span className="text-xs font-weight-bold">{producto.codigo}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                {producto.stock.map((stockcito) => (
                                                    <div className="d-flex align-items-center justify-content-center" key={stockcito.stock}>
                                                        {dobleClick ? (
                                                            <input className="form-control w-35 mr-1 d-flex align-items-center" type="text" name="stock" key={stockcito.stock} value={inputValue} onChange={handleInputChange} onKeyUp={(e) => {if (e.key === 'Enter') {patchRequest(e)}}}/>
                                                        ) : (
                                                            <div className="d-flex align-items-center">
                                                                <span className="me-2 text-xs font-weight-bold" key={stockcito.stock} onDoubleClick={(e) => handleInputStock(e, stockcito)}>{stockcito.stock}</span>

                                                                <div>
                                                                    <div className="progress">
                                                                        <div className="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }}></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
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