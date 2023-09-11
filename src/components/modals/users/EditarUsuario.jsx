import { useEffect, useState } from "react";
import FormUsuario from "./FormUsuario";
import './FormularioUsuario.css'

function EditarUsuario ({editarUsuarioModal, setDataParent, usuario, sedeRequest, sedes, setSedes}){
    const [dataReceived, setDataReceived] = useState(false)
    const accessToken = localStorage.getItem('accessToken');

    const [values, setValues] = useState({
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        deleted_at: null,
        salario: 0,
        cargo: '',
        groups: [],
        sede: '',
    })

    const inputHandler = (name) => {
        return (e) => {
            setValues({...values, [name] : e.target.value})
        }
    }

    const editarUsuario = async () => {
        if(values["password"] === '') delete values["password"]

        const response = await fetch(`${import.meta.env.VITE_FUNCIONARIO}${usuario["id"]}/`, {
            mode: 'cors',
            method: 'PATCH',
            headers: {'Authorization': `Bearer ${accessToken}`, 'Content-type': 'application/json'},
            body: JSON.stringify({
                ...values,
                sede: [values.sede],
                salario: Number(values.salario),
                cargo: values.cargo === '' ? null : values.cargo
            })
        })

        if(response.status !== 200) {
            throw new Error(' Error al realizar acción, intente nuevamente.')
        }

        return response
    }

    const editUser = (e) => {
        e.preventDefault()
        editarUsuario()
            .then((response) => {
                document.querySelector('#closeEditarUsuario').click()
                setDataParent(false)
            })
            .catch((e) => alert(e))
    }

    const limpiarFormulario = () => {
        setValues({
            password: '',
            first_name: '',
            last_name: '',
            email: '',
            deleted_at: null,
            salario: 0,
            cargo: '',
            groups: [],
            sede: '',
        })
    }

    useEffect(() => {
        if(editarUsuarioModal && sedes === ''){
            sedeRequest()
                .then((data) => {
                    setSedes(data)
                    setDataReceived(true)
                }) 
            } else if (editarUsuarioModal) {
                setDataReceived(true)
            }
        if(usuario !== null) {
            setValues({
                ...values,
                password: '',
                first_name: usuario["first_name"],
                last_name: usuario["last_name"],
                email: usuario["email"],
                salario: usuario["salario"] === null ? 0 : usuario["salario"],
                cargo: usuario["cargo"] === null ? '' : usuario["cargo"],
                groups: usuario["groups"],
                sede: usuario["sede"][0]["id"],
            })
        }
    }, [editarUsuarioModal, usuario])

    return <div className="modal fade" id="modal-editar-usuario" tabIndex="-1" role="dialog" aria-labelledby="modal-editar-usuario" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-body p-0">
                    <div className="card card-plain">
                        <div className="card-header text-left">
                            <h3 className="font-weight-bolder">Editar Usuario</h3>
                        </div>
                        <div className="card-body p-4 ">
                            <FormUsuario values={values} inputHandler={inputHandler} sedes={sedes} dataReceived={dataReceived} id={'Editar'} onSubmit={editUser}/>
                        </div>
                        <div className="card card-footer">
                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary" type="button" data-bs-dismiss="modal" id="closeEditarUsuario" onClick={limpiarFormulario}>Cancelar</button>
                                <button className="btn btn-primary" type="submit" form="EditarUsuario">Editar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default EditarUsuario