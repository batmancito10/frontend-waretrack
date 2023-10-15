import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../App'

function SedesStock() {
    const [sedes, setSedes] = useState([])
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)

    const clickeable = {
        cursor: 'pointer'
    }

    const sedesRequest = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_SEDE, {
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
        setTitle('Stock');
        sedesRequest()
            .then((data) => {
                if (data) {
                    setSedes(data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener las sedes:', error);
            });
    }, []);

    const navigate = useNavigate();

    const idClick = (id) => {
        navigate('/stock-sede',
            {
                state: { proveedorId: id }
            });
    };

    return <div className="col-xl-12">
        <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4">
            {sedes ? sedes.map(sede => {
                return <div className="col-md-4 col-lg-4 mb-4" style={clickeable} key={sede.id} onClick={() => idClick(sede.id)}>
                    <div className="card">
                        <div className="card-header mx-4 p-3 text-center">
                            <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                                <i className="fab fa-paypal opacity-10"></i>
                            </div>
                        </div>
                        <div className="card-body pt-0 p-3 text-center">
                            <h6 className="text-center mb-0">{sede.nombre}</h6>
                            <span className="text-xs">{sede.direccion}</span>
                            <hr className="horizontal dark my-3" />
                            <h5 className="mb-0">{sede.ciudad}</h5>
                        </div>
                    </div>
                </div>
            }) :
                <div className="col-md-4 col-lg-4 mb-4">
                    <div className="card">
                        <div className="card-header mx-4 p-3 text-center">
                            <div className="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                                <i className="fab fa-paypal opacity-10"></i>
                            </div>
                        </div>
                        <div className="card-body pt-0 p-3 text-center">
                            <h6 className="text-center mb-0">Loading...</h6>
                            <span className="text-xs">Loading...</span>
                            <hr className="horizontal dark my-3" />
                            <h5 className="mb-0">Loading...</h5>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
}

export default SedesStock;