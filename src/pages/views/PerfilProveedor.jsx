import { useContext, useEffect, useState } from 'react'
import { PageTitle } from "../../App"
import { useLocation } from 'react-router-dom'
import EditarProveedor from '../../components/modals/proveedores/EditarProveedor.jsx'

function PerfilProveedor() {
    const location = useLocation();
    const idProveedor = location.state?.proveedorId;

    const [proveedor, setProveedor] = useState([])
    const accessToken = localStorage.getItem('accessToken')
    const { setTitle } = useContext(PageTitle)
    const [inputBloqueado, setInputBloqueado] = useState(true);

    const handleInput = () => {
        setInputBloqueado(!inputBloqueado)
    } 

    const proveedorRequest = async () => {
        const response = await fetch(`${import.meta.env.VITE_PROVEEDOR}${idProveedor}/`, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        const jsonResponse = await response.json()
        return jsonResponse
    }

    useEffect(() => {
        setTitle('Perfil Proveedores');
        proveedorRequest()
            .then((data) => {
                setProveedor(data);
            })
    }, [])

    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <div className="page-header min-height-300 border-radius-xl mt-4" style={{ backgroundImage: 'url("src/assets/img/curved-images/curved0.jpg")', backgroundPosition: '50%' }}>
                    <span className="mask bg-gradient-primary opacity-6"></span>
                </div>
                <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
                    <div className="row gx-4">
                        <div className="col-auto">
                            <div className="avatar avatar-xl position-relative">
                                <img src='/src/assets/img/bruce-mars.jpg' alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                            </div>
                        </div>
                        <div className="col-auto my-auto">
                            <div className="h-100">
                                <h5 className="mb-1">
                                    {proveedor.nombre}
                                </h5>
                                <p className="mb-0 font-weight-bold text-sm">
                                    {proveedor.direccion}
                                </p>
                            </div>
                        </div>


                        <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                            <div className="nav-wrapper position-relative end-0">
                                <ul className="nav nav-pills nav-fill p-1 bg-transparent" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link mb-0 px-0 py-1 active " data-bs-toggle="tab" href="className" role="tab" aria-selected="true" onClick={handleInput}>
                                            <svg className="text-dark" width="16px" height="16px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g transform="translate(-2020.000000, -442.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(304.000000, 151.000000)">
                                                                <polygon className="color-background" opacity="0.596981957" points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667">
                                                                </polygon>
                                                                <path className="color-background" d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z" opacity="0.596981957"></path>
                                                                <path className="color-background" d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span className="ms-1">Editar perfil</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <EditarProveedor idProveedor={idProveedor} inputBloqueado={inputBloqueado} handleInput={handleInput}></EditarProveedor>
                    </div>
                </div>
            </div>



            <div className="container-fluid py-4">
                <div className="row">
                    
                    <div className="col-12 col-xl-4">
                        <div className="card h-100">
                            <div className="card-header pb-0 p-3">
                                <h6 className="mb-0">Platform Settings</h6>
                            </div>
                            <div className="card-body p-3">
                                <h6 className="text-uppercase text-body text-xs font-weight-bolder">Account</h6>
                                <ul className="list-group">
                                    <li className="list-group-item border-0 px-0">
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault"  />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault">Email me when someone follows me</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-0">
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault1" />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault1">Email me when someone answers on my post</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-0">
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault2"  />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault2">Email me when someone mentions me</label>
                                        </div>
                                    </li>
                                </ul>
                                <h6 className="text-uppercase text-body text-xs font-weight-bolder mt-4">Application</h6>
                                <ul className="list-group">
                                    <li className="list-group-item border-0 px-0">
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault3" />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault3">New launches and projects</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-0">
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault4"  />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault4">Monthly product updates</label>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-0 pb-0">
                                        <div className="form-check form-switch ps-0">
                                            <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault5" />
                                            <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault5">Subscribe to newsletter</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-4">
                        <div className="card h-100">
                            <div className="card-header pb-0 p-3">
                                <div className="row">
                                    <div className="col-md-8 d-flex align-items-center">
                                        <h6 className="mb-0">Profile Information</h6>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        <a href="#">
                                            <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-3">
                                <p className="text-sm">
                                    Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                                </p>
                                <hr className="horizontal gray-light my-4" />
                                <ul className="list-group">
                                    <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">Full Name:</strong> &nbsp; Alec M. Thompson</li>
                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Mobile:</strong> &nbsp; (44) 123 1234 123</li>
                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Email:</strong> &nbsp; alecthompson@mail.com</li>
                                    <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Location:</strong> &nbsp; USA</li>
                                    <li className="list-group-item border-0 ps-0 pb-0">
                                        <strong className="text-dark text-sm">Social:</strong> &nbsp;
                                        <a className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="#">
                                            <i className="fab fa-facebook fa-lg"></i>
                                        </a>
                                        <a className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="#">
                                            <i className="fab fa-twitter fa-lg"></i>
                                        </a>
                                        <a className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="#">
                                            <i className="fab fa-instagram fa-lg"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-4">
                        <div className="card h-100">
                            <div className="card-header pb-0 p-3">
                                <h6 className="mb-0">Conversations</h6>
                            </div>
                            <div className="card-body p-3">
                                <ul className="list-group">
                                    <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                        <div className="avatar me-3">
                                            <img src="../assets/img/kal-visuals-square.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Sophie B.</h6>
                                            <p className="mb-0 text-xs">Hi! I need more information..</p>
                                        </div>
                                        <a className="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="#">Reply</a>
                                    </li>
                                    <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                        <div className="avatar me-3">
                                            <img src="../assets/img/marie.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Anne Marie</h6>
                                            <p className="mb-0 text-xs">Awesome work, can you..</p>
                                        </div>
                                        <a className="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="#">Reply</a>
                                    </li>
                                    <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                        <div className="avatar me-3">
                                            <img src="../assets/img/ivana-square.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Ivanna</h6>
                                            <p className="mb-0 text-xs">About files I can..</p>
                                        </div>
                                        <a className="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="#">Reply</a>
                                    </li>
                                    <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                        <div className="avatar me-3">
                                            <img src="../assets/img/team-4.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Peterson</h6>
                                            <p className="mb-0 text-xs">Have a great afternoon..</p>
                                        </div>
                                        <a className="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="#">Reply</a>
                                    </li>
                                    <li className="list-group-item border-0 d-flex align-items-center px-0">
                                        <div className="avatar me-3">
                                            <img src="../assets/img/team-3.jpg" alt="kal" className="border-radius-lg shadow" />
                                        </div>
                                        <div className="d-flex align-items-start flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">Nick Daniel</h6>
                                            <p className="mb-0 text-xs">Hi! I need more information..</p>
                                        </div>
                                        <a className="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="#">Reply</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PerfilProveedor;