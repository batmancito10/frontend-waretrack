import { useState, useEffect } from "react"
import './AgregarUsuario.css'

function AgregarUsuario ({agregarUsuarioModal, setDataParent}) {

    const [sedes, setSedes] = useState({})
    const [dataReceived, setDataReceived] = useState(false)
    const accessToken = localStorage.getItem('accessToken');

    const [values, setValues] = useState({
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        deleted_at: null,
        salario: 0,
        cargo: null,
        groups: [],
        sede: '',
    })

    const inputHandler = (name) => {
        return (e) => {
            setValues({...values, [name] : e.target.value})
        }
    }

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

    const agregarUsuario = async () => {
        console.log(values);
        const response = await fetch('https://waretrack-api.onrender.com/funcionario/', {
            mode: 'cors',
            method: 'post',
            headers: {'Authorization': `Bearer ${accessToken}`, 'Content-type': 'application/json'},
            body: JSON.stringify({
                ...values,
                sede: [values.sede],
                salario: Number(values.salario)
            })
        })
        return response
    }

    const addUser = () => {
        agregarUsuario()
            .then((response) => {
                document.querySelector('#closeAgregarUsuario').click()
                setDataParent(false)
            })
            .catch((e) => console.log(e))
    }

    const limpiarFormulario = () => {
        setValues({
            password: '',
            first_name: '',
            last_name: '',
            email: '',
            deleted_at: null,
            salario: 0,
            cargo: null,
            groups: [],
            sede: '',
        })
    }

    useEffect(() => {
        console.log(agregarUsuarioModal);
        if(agregarUsuarioModal){
            sedeRequest()
                .then((data) => {
                    setSedes(data)
                    setDataReceived(true)
                }) 
        }
    }, [agregarUsuarioModal])
    
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
                                            <input value={values["first_name"]} className="form-control w-65" type="text" name="first-name" id="first-name" required onChange={inputHandler("first_name")}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="last-name" className="fs-6 pt-1">Apellidos</label>
                                            <input value={values["last_name"]} className="form-control w-65" type="text" name="last-name" id="last-name" required onChange={inputHandler("last_name")}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="email" className="fs-6 pt-1">Email</label>
                                            <input value={values["email"]} className="form-control w-65" type="email" name="email" id="email" required onChange={inputHandler("email")}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="password" className="fs-6 pt-1">Contraseña</label>
                                            <div className="input-group w-65 ">
                                                <input value={values["password"]} className="form-control" type="password" name="password" id="password" required onChange={inputHandler("password")}/>
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
                                            <select value={values["sede"]} name="sede" id="sede" className="form-select w-65" required onChange={inputHandler("sede")}>
                                                <option value="">Selecciona una opción</option>
                                                {dataReceived ? 
                                                    sedes.map((sede) => {
                                                        return <option key={sede["id"]} value={sede["id"]}>{sede["nombre"]}</option>
                                                    })
                                                : <option value="">Loading...</option>}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="salario" className="fs-6 pt-1">Salario</label>
                                            <input value={values["salario"]} className="form-control w-65" type="number" name="salario" id="salario" min="0" required onWheel={ event => event.currentTarget.blur() } onChange={inputHandler("salario")}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label htmlFor="cargo" className="fs-6 pt-1">Cargo</label>
                                            <select value={values["cargo"]} name="cargo" id="cargo" className="form-select w-65" required onChange={inputHandler("cargo")}>
                                                <option value="">Selecciona una opción</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card card-footer">
                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary" type="button" data-bs-dismiss="modal" id="closeAgregarUsuario" onClick={limpiarFormulario}>Cancelar</button>
                                <button className="btn btn-primary" type="button" onClick={addUser}>Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AgregarUsuario