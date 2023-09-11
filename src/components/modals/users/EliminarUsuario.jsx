function EliminarUsuario ({ usuario, setDataParent }) {
    const accessToken = localStorage.getItem('accessToken')
    const eliminarUsuario = async () => {
        const response = await fetch(`${import.meta.env.VITE_FUNCIONARIO}${usuario["id"]}`, {
            mode: 'cors',
            method: 'delete',
            headers: {'Authorization': `Bearer ${accessToken}`, 'Content-type': 'application/json'},
        })

        if(response.status !== 204){
            throw new Error(' Error al realizar acción, intente nuevamente.')
        }
        
        return response
    }

    const deleteUser = () => {
        eliminarUsuario()
            .then(() => {
                document.querySelector('#closeEliminarUsuario').click()
                setDataParent(false)
            })
    }

    return <div className="modal fade" id="modal-eliminar-usuario" tabIndex="-1" role="dialog" aria-labelledby="modal-eliminar-usuario" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-body p-0">
                    <div className="card card-plain">
                        <div className="card-header text-left">
                            <h3 className="font-weight-bolder">Eliminar Usuario</h3>
                        </div>
                        <div className="card-body p-4 ">
                            <h6>¿Desea eliminar a este usuario?</h6>
                            <div>
                                <h6>Nombre:</h6>
                                <span className="ps-4">{`${usuario["first_name"]} ${usuario["last_name"]}`}</span>
                                <h6>Cargo:</h6>
                                <span className="ps-4">{`${usuario["cargo"]}`}</span>
                                <h6>Sede:</h6>
                                <span className="ps-4">{`${usuario["sede"][0]["nombre"]}`}</span>
                            </div>
                        </div>
                        <div className="card card-footer">
                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary" type="button" data-bs-dismiss="modal" id="closeEliminarUsuario">Cancelar</button>
                                <button className="btn btn-danger" type="button" onClick={deleteUser}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
}

export default EliminarUsuario