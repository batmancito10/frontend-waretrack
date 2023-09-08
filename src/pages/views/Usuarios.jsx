import { useState, useContext, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { PageTitle } from '../../App'
import AgregarUsuario from '../../components/modals/users/AgregarUsuario'

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
        cell: () => (
            <div className="App d-flex justify-content-center pt-3 pb-0">
                <div className="btn-group">
                    <button className="btn btn-outline-secondary py-2 px-3">
                        <i className="bi bi-pencil fs-5"></i>
                    </button>
                    <button className="btn btn-outline-secondary py-2 px-3">
                        <i className="bi bi-trash fs-5"></i>
                    </button>
                </div>
            </div>
        )
    }
]

function Usuarios () {
    const [usuarios, setUsuarios] = useState([])
    const [dataReceived, setDataReceived] = useState(false)
    const {setTitle} = useContext(PageTitle);
    const accessToken = localStorage.getItem('accessToken');

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
     }, [])

    return <>
    <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0 d-flex justify-content-between" >
                    <h6>Usuarios</h6>
                    <button className="btn btn-secondary d-flex gap-2 align-items-center" data-bs-toggle="modal" data-bs-target="#modal-agregar-usuario">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
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
    <AgregarUsuario />
    </>
}

export default Usuarios