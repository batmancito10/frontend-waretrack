function AgregarPedido() {
    return (
    <>
        <div className="modal fade" id="exampleModalMessage" tabIndex="-1" role="dialog" aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Agregar un nuevo pedido</h5>
                        <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                <input type="text" className="form-control" value="Creative Tim" id="recipient-name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">Message:</label>
                                <textarea className="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn bg-gradient-primary">Send message</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default AgregarPedido;