import { useNavigate } from 'react-router'


function EliminarProveedor({idProveedor, nombreProveedor}) {
    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    const eliminarProveedorRequest = async () => {
        const response = await fetch(`${import.meta.env.VITE_PROVEEDOR}${idProveedor}/`, {
            mode: 'cors',
            method: 'delete', 
            headers: {'Authorization': `Bearer ${accessToken}`}
        }).then(response => {
            if(!response.ok){
                throw new Error('Algo falló')
            }
            navigate('/pedidos-proveedores')
        })
        .then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log('Ha ocurrido un error, intente más tarde: ', error)
        })
        return response
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Eliminar a {nombreProveedor}</h5>
                        <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-center">
                        ¿Está seguro que desea eliminar al proveedor <strong>{nombreProveedor}?</strong>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal" >Cancelar</button>
                        <button type="button" className="btn bg-gradient-primary" onClick={eliminarProveedorRequest} data-bs-dismiss="modal">Eliminar proveedor</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EliminarProveedor;