function AgregarProductos(){
    return (
        <>
            <button type="button" className="btn btn-outline-default btn-lg w-100" data-bs-toggle="modal" data-bs-target="#agregarProveedor">
                <i className="bi bi-person-add fs-5 py-0 me-2"></i>
                Agregar producto
            </button>

            <div className="modal fade" id="agregarProveedor" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Agregar producto con stock</h5>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form role="form text-left" id="editarProveedor">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label className="fs-6 pt-1">Nombre</label>
                                            <input className="form-control w-65" type="text" name="first-name" />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label className="fs-6 pt-1">Email</label>
                                            <input className="form-control w-65" type="email" name="email" />

                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label className="fs-6 pt-1">Direccion</label>
                                            <input type="text" name="direccion" className="form-control w-65" />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label className="fs-6 pt-1">Sede</label>
                                            
                                                <select className="form-select w-65">
                                                    <option value="">Loading...</option>
                                                </select>
                                            
                                        </div>
                                    </div>
                                </div>


                                <div className="row mb-3">

                                    <div className="col-md-6">
                                        <div className="d-flex gap-2 align-items-center justify-content-between">
                                            <label className="fs-6 pt-1">Telefono</label>
                                            <input className="form-control w-65" type="text" name="telefono" min="0" />

                                        </div>
                                    </div>

                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button className="btn btn-primary" type="submit" form="AgregarUsuario" data-bs-dismiss="modal" >Agregar proveedor</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AgregarProductos