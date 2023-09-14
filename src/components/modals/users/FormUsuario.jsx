import { useEffect, useState } from 'react'
import Select from 'react-select'

function FormUsuario ({inputHandler, values, dataReceived, sedes, id, onSubmit, groups, setValues, setDataReceived, editarUsuarioModal, setEditarUsuarioModal}) {

    const [groupList, setGroupList] = useState('')
    const [sedeList, setSedeList] = useState('')
    const [sedeSelected, setSedeSelected] = useState([])
    const [groupSelected, setGroupSelected] = useState([])
    
    const togglePassword = () => {
        const togglePassButton = document.querySelector(`#${id}PasswordButton`)
        const passwordInput = document.querySelector(`#${id}Password`)
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
        passwordInput.setAttribute('type', type)
        togglePassButton.querySelector('i').classList.toggle('bi-eye')
    }

    useEffect(() => {
        if(groups !== undefined && groups.hasOwnProperty(0)){
            setGroupList(groups.map((group) => {
                return {value: group['id'], label: group['name']}
            })) 
        }
        if(sedes !== undefined && sedes.hasOwnProperty(0)){
            setSedeList(sedes.map((sede) => {
                return {value: sede['id'], label: sede['nombre']}
            })) 
            setDataReceived(true)
        }
        if(values["sede"][0] !== undefined && editarUsuarioModal){
            console.log(values);
            setSedeSelected(values["sede"].map((sede) => {
                return {value: sede["id"], label: sede["nombre"]}
            }))
            setGroupSelected(values["groups"].map((group) => {
                return {value: group["id"], label: group["name"]}
            }))
            setEditarUsuarioModal(false)
        }
    }, [groups, editarUsuarioModal, values])

    useEffect(() => {
        if(values["sede"] === '' & values["groups"] === []){
            setSedeSelected([])
            setGroupSelected([])
            if(editarUsuarioModal){
                setDataReceived(false)
            }
        }
    }, [values])

    const changeGroups = (selectedOption) => {
        setGroupSelected(selectedOption)
        const groupData = selectedOption.map((option) => {
            return option.value
        })
        setValues({...values, ["groups"]: groupData})
    }
    const changeSedes = (selectedOption) => {
        setSedeSelected(selectedOption)
        const sedeData = selectedOption.value
        setValues({...values, ["sede"]: [sedeData]})
    }


    return <form role="form text-left" id={`${id}Usuario`} onSubmit={onSubmit}>
        <div className="row mb-3">
            <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label htmlFor={`${id}First-name`} className="fs-6 pt-1">Nombres</label>
                    <input value={values["first_name"]} className="form-control w-65" type="text" name="first-name" id={`${id}First-name`} required onChange={inputHandler("first_name")}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label htmlFor={`${id}Last-name`} className="fs-6 pt-1">Apellidos</label>
                    <input value={values["last_name"]} className="form-control w-65" type="text" name="last-name" id={`${id}Last-name`} required onChange={inputHandler("last_name")}/>
                </div>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label htmlFor={`${id}Email`} className="fs-6 pt-1">Email</label>
                    <input value={values["email"]} className="form-control w-65" type="email" name="email" id={`${id}Email`} required onChange={inputHandler("email")}/>
                </div>
            </div>
            <div className="col-md-6 password">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label htmlFor={`${id}Password`} className="fs-6 pt-1">Contraseña</label>
                    <div className="input-group w-65 ">
                        <input value={values["password"]} className="form-control" type="password" name="password" required={id === 'Agregar' && true}   onChange={inputHandler("password")} id={`${id}Password`}/>
                        <button className="btn btn-outline-primary mb-0 fs-5 px-3 py-0" type="button" onClick={togglePassword} id={`${id}PasswordButton`}>
                            <i className="bi bi-eye-slash" id=""></i>
                        </button> 
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label htmlFor={`${id}Sede`} className="fs-6 pt-1">Sede</label>
                    {dataReceived ? <Select 
                        name='sedes'
                        options={sedeList}
                        id={`${id}Sede`}
                        className='w-65'
                        onChange={changeSedes}
                        isSearchable={false}
                        value={sedeSelected}
                    /> : 
                    <select className='form-select w-65'>
                        <option value="">Loading...</option>    
                    </select>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label htmlFor={`${id}Salario`} className="fs-6 pt-1">Salario</label>
                    <input value={values["salario"]} className="form-control w-65" type="number" name="salario" id={`${id}Salario`} min="0" required onWheel={ event => event.currentTarget.blur() } onChange={inputHandler("salario")}/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label htmlFor={`${id}Cargo`} className="fs-6 pt-1">Cargo</label>
                    <input type="text" value={values["cargo"]} name="cargo" id={`${id}Cargo`} className="form-control w-65" onChange={inputHandler("cargo")}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="d-flex gap-2 align-items-center justify-content-between">
                    <label className="fs-6 pt-1">Grupos</label>
                    {dataReceived ? <Select 
                        isMulti
                        name='groups'
                        options={groupList}
                        id={`${id}Groups`}
                        className='w-65'
                        onChange={changeGroups}
                        isSearchable={false}
                        value={groupSelected}
                    /> : 
                    <select className='form-select w-65'>
                        <option value="">Loading...</option>    
                    </select>}
                </div>
            </div>
        </div>
    </form>
}

export default FormUsuario