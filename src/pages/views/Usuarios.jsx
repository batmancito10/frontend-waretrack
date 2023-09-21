import { useState, useContext, useEffect } from "react";
import { PageTitle } from '../../App'
import AgregarUsuario from '../../components/modals/users/AgregarUsuario'
import EditarUsuario from '../../components/modals/users/EditarUsuario'
import EliminarUsuario from "../../components/modals/users/EliminarUsuario";


function Usuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [agregarUsuarioModal, setAgregarUsuarioModal] = useState(false)
    const [editarUsuarioModal, setEditarUsuarioModal] = useState(false)
    const [eliminarUsuarioModal, setEliminarUsuarioModal] = useState(false)
    const [dataReceived, setDataReceived] = useState(false)
    const [editarUsuario, setEditarUsuario] = useState(null)
    const [eliminarUsuario, setEliminarUsuario] = useState(null)
    const [sedes, setSedes] = useState('')
    const [groups, setGroups] = useState('')
    const { setTitle } = useContext(PageTitle)
    const accessToken = localStorage.getItem('accessToken')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const usersRequest = async () => {
        const response = await fetch(import.meta.env.VITE_FUNCIONARIO, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        const jsonResponse = await response.json()
        return jsonResponse
    }

    const sedeRequest = async () => {
        const response = await fetch(import.meta.env.VITE_SEDE, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        const jsonResponse = await response.json()
        return jsonResponse
    }

    const groupRequest = async () => {
        const response = await fetch(import.meta.env.VITE_GROUPS, {
            mode: 'cors',
            method: 'get',
            headers: { 'Authorization': `Bearer ${accessToken}` }
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
        setEliminarUsuarioModal(true)
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
                    <div className="card">
                        <div className="table-responsive" >
                            <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Usuario</th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Funciones</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sedes</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Salario</th>
                                        <th className="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                {dataReceived ? usuarios.map(usuario => {
                                    return <tbody key={usuario.id}>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    <div>
                                                        <img src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg" className="avatar avatar-sm me-3" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-xs">{usuario.first_name + ' ' + usuario.last_name}</h6>
                                                        <p className="text-xs text-secondary mb-0">{usuario.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">{usuario.groups.map((group) => group['name']).join(' ')}</p>
                                                <p className="text-xs text-secondary mb-0">{usuario.cargo}</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <div>
                                                    {usuario.sede.map((item, index) => (
                                                        <span className="text-xs font-weight-bold mb-0" key={index}>
                                                            {item['nombre']}
                                                            {index < usuario.sede.length - 1 ? <br /> : null}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{usuario.salario}</span>
                                            </td>
                                            <td className="align-middle">

                                                <div className="App d-flex justify-content-center pt-3 pb-0">
                                                    <div className="btn-group">
                                                        <button className="btn btn-outline-secondary py-2 px-3" data-bs-toggle="modal" data-bs-target="#modal-editar-usuario" onClick={() => updateUser(usuario)}>
                                                            <i className="bi bi-pencil fs-5"></i>
                                                        </button>
                                                        {(userInfo["id"] !== usuario.id) &&
                                                            <button className="btn btn-outline-secondary py-2 px-3" data-bs-toggle="modal" data-bs-target="#modal-eliminar-usuario" onClick={() => deleteUser(usuario)}>
                                                                <i className="bi bi-trash fs-5"></i>
                                                            </button>}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                }) : null}

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AgregarUsuario agregarUsuarioModal={agregarUsuarioModal} setDataParent={setDataReceived} sedeRequest={sedeRequest} sedes={sedes} setSedes={setSedes} groups={groups} setGroups={setGroups} groupRequest={groupRequest} />
        <EditarUsuario editarUsuarioModal={editarUsuarioModal} setDataParent={setDataReceived} usuario={editarUsuario} sedeRequest={sedeRequest} sedes={sedes} setSedes={setSedes} groups={groups} setGroups={setGroups} groupRequest={groupRequest} setEditarUsuarioModal={setEditarUsuarioModal} />
        <EliminarUsuario usuario={eliminarUsuario} setDataParent={setDataReceived} eliminarUsuarioModal={eliminarUsuarioModal} />


        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="javascript:;" aria-label="Previous">
                        <i className="fa fa-angle-left"></i>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                <li className="page-item"><a className="page-link" href="javascript:;">1</a></li>
                <li className="page-item"><a className="page-link" href="javascript:;">2</a></li>
                <li className="page-item"><a className="page-link" href="javascript:;">3</a></li>
                <li className="page-item">
                    <a className="page-link" href="javascript:;" aria-label="Next">
                        <i className="fa fa-angle-right"></i>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>


    </>
}

export default Usuarios