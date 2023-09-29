function EliminarPedido() {
    const accessToken = localStorage.getItem('accessToken')
    const eliminarPedidoRequest = async(idPedido) => {
        const response = await fetch(`${import.meta.env.VITE_PROVEEDOR}${idPedido}/`, {
            mode: 'cors',
            method: 'delete',
            headers: {'Authorization': `Bearer ${accessToken}`}
        }).then(response => {
            if(!response.ok){
                throw new Error('Error al realizar la peticion')
            }
        }).then(data => {
            console.log(data)
        }).catch(error => {
            console.log('Ha ocurrido un error al eliminar el pedido: ', error)
        })
        return response
    }


    return (
        <div className="col-md-4">
            <div className="modal fade" id="modal-notification" tabIndex="-1" role="dialog" aria-labelledby="modal-notification" aria-hidden="true">
                <div className="modal-dialog modal-danger modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-notification">Atención!</h6>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="py-3 text-center">
                                <h4 className="text-gradient text-danger mt-4">Lee atentamente esto!</h4>
                                <p>Estás a punto de eliminar un pedido, esta acción es irreversible, ¿estás seguro de esto?.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn bg-gradient-danger" data-bs-dismiss="modal" onClick={eliminarPedidoRequest}>Si, estoy seguro</button>
                            <button type="button" className="btn bg-gradient-default" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EliminarPedido;