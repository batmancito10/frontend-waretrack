import { useState, useEffect } from "react"
import './AgregarUsuario.css'

function AgregarUsuario () {
    const [sedes, setSedes] = useState({})
    const [dataReceived, setDataReceived] = useState(false)
    const accessToken = localStorage.getItem('accessToken');

    const togglePassword = () => {
        const togglePassButton = document.querySelector('#togglePassword')
        const passwordInput = document.querySelector('#password')
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
        passwordInput.setAttribute('type', type)
        togglePassButton.querySelector('i').classList.toggle('bi-eye')
    }

    const sedeRequest = async () => {
        const response = await fetch('https://waretrack-api.onrender.com/sede/', {
            mode: 'cors',
            method: 'get',
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        const jsonResponse = await response.json()
        return jsonResponse
    }

    useEffect(() => {
        sedeRequest()
            .then((data) => {
                setSedes(data)
                setDataReceived(true)
            })
    }, [])
    
    return <div className="modal fade" id="modal-agregar-usuario" tabIndex="-1" role="dialog" aria-labelledby="modal-agregar-usuario" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-body p-0">
                    <div className="card card-plain">
                        <div className="card-header text-left">
                            <h3 className="font-weight-bolder">Agregar Usuario</h3>
                        </div>
                        <div className="card-body p-4 ">
                            <form action="" role="form text-left">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="first-name" className="fs-6 pt-1">Nombres</label>
                                            <input className="form-control w-65" type="text" name="first-name" id="first-name" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="last-name" className="fs-6 pt-1">Apellidos</label>
                                            <input className="form-control w-65" type="text" name="last-name" id="last-name" required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="email" className="fs-6 pt-1">Email</label>
                                            <input className="form-control w-65" type="email" name="email" id="email" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="password" className="fs-6 pt-1">Contraseña</label>
                                            <div className="input-group w-65 ">
                                                <input className="form-control" type="password" name="password" id="password" required/>
                                                <button className="btn btn-outline-primary mb-0 fs-5 px-3 py-0" type="button" id="togglePassword" onClick={togglePassword}>
                                                    <i className="bi bi-eye-slash" id=""></i>
                                                </button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="sede" className="fs-6 pt-1">Sede</label>
                                            <select name="sede" id="sede" className="form-select w-65" required>
                                                <option value="">Selecciona una opción</option>
                                                {dataReceived ? 
                                                    sedes.map((sede) => {
                                                        return <option key={sede["id"]} value={sede["id"]}>{`${sede["id"]} - ${sede["nombre"]}`}</option>
                                                    })
                                                : <option value="">Loading...</option>}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="salario" className="fs-6 pt-1">Salario</label>
                                            <input className="form-control w-65" type="number" name="salario" id="salario" min="0" required onWheel={ event => event.currentTarget.blur() }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="sede" className="fs-6 pt-1">Cargo</label>
                                            <select name="sede" id="sede" className="form-select w-65" required>
                                                <option value="">Selecciona una opción</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-primary" type="button">Agregar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AgregarUsuario