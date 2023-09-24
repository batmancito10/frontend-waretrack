import { useState, useContext, useEffect } from "react";
import { PageTitle } from '../App'
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarrouselProveedores = () => {
    const [proveedores, setProveedores] = useState([])
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)

    const proveedoresRequest = async () => {
        const response = await fetch(import.meta.env.VITE_PROVEEDOR, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        const jsonResponse = await response.json()
        return jsonResponse
    }

    useEffect(() => {
        setTitle('Proveedores');
        proveedoresRequest()
            .then((data) => {
                setProveedores(data);
            })
    }, [])

    const chunkedProveedores = chunkArray(proveedores, 3);


    function chunkArray(arr, chunkSize) {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    }

    const pStyles = {
        width: '230px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }

    const clickeable = {
        cursor: 'pointer'
    }

    const navigate = useNavigate();

    const idClick = (id) => {
        navigate('/detalle-proveedor',
          {state: { proveedorId: id }
        });
      }; 

    return <>
        <Carousel showArrows={true} showThumbs={false} showStatus={false} autoPlay={true} interval={3000}>
            {chunkedProveedores.map((proveedorGroup, index) => (
                <div key={index} className="row">
                    {proveedorGroup.map((proveedor) => (
                        <div className="div-clickeable col-xl-4 col-sm-6 mb-xl-0 mb-4" style={clickeable} key={proveedor.id} onClick={() => idClick(proveedor.id)}>
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 font-weight-bold text-start div-clickeable"  style={pStyles}>
                                                    {proveedor.email}
                                                </p>
                                                <h5 className="font-weight-bolder mb-0 text-start div-clickeable" style={pStyles}>
                                                    {proveedor.nombre}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-4 text-end d-flex justify-content-center align-items-center">
                                            <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                                                <img src={proveedor.imagen ? proveedor.imagen : 'https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png'} alt="" />                                              
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            ))}
        </Carousel>
    </>
}

export default CarrouselProveedores;