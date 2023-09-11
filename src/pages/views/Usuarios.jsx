import { useState, useContext, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { PageTitle } from '../../App'
import AgregarUsuario from '../../components/modals/users/AgregarUsuario'
import EditarUsuario from '../../components/modals/users/EditarUsuario'
import EliminarUsuario from "../../components/modals/users/EliminarUsuario";


function Usuarios () {
    const [usuarios, setUsuarios] = useState([])
    const [agregarUsuarioModal, setAgregarUsuarioModal] = useState(false)
    const [editarUsuarioModal, setEditarUsuarioModal] = useState(false)
    const [dataReceived, setDataReceived] = useState(false)
    const [editarUsuario, setEditarUsuario] = useState(null)    
    const [eliminarUsuario, setEliminarUsuario] = useState(null)
    const [sedes, setSedes] = useState('')
    const {setTitle} = useContext(PageTitle)
    const accessToken = localStorage.getItem('accessToken')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    const columns = [
        {
            name: 'Nombres',
            selector: row => row.first_name,
            sortable: true
        },
        {
            name: 'Apellidos',
            selector: row => row.last_name,
            sortable: true
        },
        {
            name: 'Cargo',
            selector: row => row.cargo,
            sortable: true
        },
        {
            name: 'Sede',
            selector: row => row.sede[0]["nombre"],
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {   
            name: 'Acciones',
            cell: row => {

                return (
                <div className="App d-flex justify-content-center pt-3 pb-0">
                    <div className="btn-group">
                        <button className="btn btn-outline-secondary py-2 px-3" data-bs-toggle="modal" data-bs-target="#modal-editar-usuario" onClick={() => updateUser(row)}>
                            <i className="bi bi-pencil fs-5"></i>
                        </button>
                        {(userInfo["id"] !== row.id) &&
                            <button className="btn btn-outline-secondary py-2 px-3" data-bs-toggle="modal" data-bs-target="#modal-eliminar-usuario" onClick={() => deleteUser(row)}>
                                <i className="bi bi-trash fs-5"></i>
                            </button>}
                    </div>
                </div>
            )}
        }
    ]

    const usersRequest = async () => {
        const response = await fetch(import.meta.env.VITE_FUNCIONARIO, {
            mode: 'cors',
            method: 'get',
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        const jsonResponse = await response.json()
        return jsonResponse
    }

    const sedeRequest = async () => {
        const response = await fetch(import.meta.env.VITE_SEDE, {
            mode: 'cors',
            method: 'get',
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        const jsonResponse = await response.json()
        return jsonResponse
    }

    const updateUser = (usuario) => {
        setEditarUsuario(usuario)
        setEditarUsuarioModal(true)
    }

    const deleteUser = (usuario) => {
        setEliminarUsuario(usuario)
    }
    
    useEffect(() => {
        setTitle('Usuarios');
        usersRequest()
        .then((data) => {
            setUsuarios(data)
            setDataReceived(true);
        })
    }, [dataReceived])
    

    return <>
    <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0 d-flex justify-content-between" >
                    <h6>Usuarios</h6>
                    <button className="btn btn-secondary d-flex gap-2 align-items-center" data-bs-toggle="modal" data-bs-target="#modal-agregar-usuario" onClick={() => setAgregarUsuarioModal(true)}>
                    <i className="bi bi-person-add fs-5 py-0"></i>
                         Agregar usuario 
                    </button>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                        { dataReceived ?
                            <DataTable 
                            columns={columns}
                            data={usuarios}
                            pagination
                            /> 
                        : <h5 className="ps-5">Loading Data</h5>}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AgregarUsuario agregarUsuarioModal={agregarUsuarioModal} setDataParent={setDataReceived} sedeRequest={sedeRequest} sedes={sedes} setSedes={setSedes}/>
    <EditarUsuario editarUsuarioModal={editarUsuarioModal} setDataParent={setDataReceived} usuario={editarUsuario} sedeRequest={sedeRequest} sedes={sedes} setSedes={setSedes}/>
    <EliminarUsuario usuario={eliminarUsuario} setDataParent={setDataReceived}/>
    </>
}

export default Usuarios