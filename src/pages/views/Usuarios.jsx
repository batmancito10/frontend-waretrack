import { useState, useContext, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { PageTitle } from '../../App'
import AgregarUsuario from '../../components/modals/users/AgregarUsuario'


function Usuarios () {
    const [usuarios, setUsuarios] = useState([])
    const [agregarUsuarioModal, setAgregarUsuarioModal] = useState(false)
    const [dataReceived, setDataReceived] = useState(false)
    const [updateUsuario, setUpdateUsuario] = useState(null)
    const {setTitle} = useContext(PageTitle);
    const accessToken = localStorage.getItem('accessToken');
    
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
            selector: row => row.sede,
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
                        <button className="btn btn-outline-secondary py-2 px-3" onClick={() => updateUser(row)}>
                            <i className="bi bi-pencil fs-5"></i>
                        </button>
                        <button className="btn btn-outline-secondary py-2 px-3" onClick={() => deleteUser(row)}>
                            <i className="bi bi-trash fs-5"></i>
                        </button>
                    </div>
                </div>
            )}
        }
    ]
    
    
    const usersRequest = async () => {
        const response = await fetch('https://waretrack-api.onrender.com/funcionario/', {
            mode: 'cors',
            method: 'get',
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        const jsonResponse = await response.json()
        return jsonResponse
    }
    
    useEffect(() => {
        setTitle('Usuarios');
        usersRequest()
        .then((data) => {
            setUsuarios(data)
            setDataReceived(true);
        })
    }, [dataReceived])
    
    const updateUser = (usuario) => {
        setUpdateUsuario(usuario)
        console.log(updateUsuario);
    }

    const deleteUser = (usuario) => {
        console.log(usuario);
    }

    return <>
    <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0 d-flex justify-content-between" >
                    <h6>Usuarios</h6>
                    <button className="btn btn-secondary d-flex gap-2 align-items-center" data-bs-toggle="modal" data-bs-target="#modal-agregar-usuario" onClick={() => setAgregarUsuarioModal(true)}>
                    <i class="bi bi-person-add fs-5 py-0"></i>
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
    <AgregarUsuario agregarUsuarioModal={agregarUsuarioModal} setDataParent={setDataReceived}/>
    </>
}

export default Usuarios