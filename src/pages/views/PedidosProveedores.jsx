import { useEffect, useContext } from "react"
import { PageTitle } from "../../App"

function PedidosProveedores () {
    const {setTitle} = useContext(PageTitle)

    useEffect(() => {
        setTitle('Pedidos - Proveedores')
    })
    
    return <>
    <div className="row">
        <div id="carousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">  
                    <div className="d-flex flex-row gap-2">
                        <div className="card w-25">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="font-weight-bolder">PIÑONES LTDA  
                                        </h5>
                                        <p className="text-sm font-weight-bold">correo</p>
                                        <span className="text-sm font-weight-bold">3001234567</span>
                                    </div>
                                    <div className="col-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-25">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="font-weight-bolder">PIÑONES LTDA  
                                        </h5>
                                        <p className="text-sm font-weight-bold">correo</p>
                                        <span className="text-sm font-weight-bold">3001234567</span>
                                    </div>
                                    <div className="col-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-25">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="font-weight-bolder">PIÑONES LTDA  
                                        </h5>
                                        <p className="text-sm font-weight-bold">correo</p>
                                        <span className="text-sm font-weight-bold">3001234567</span>
                                    </div>
                                    <div className="col-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-25">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="font-weight-bolder">PIÑONES LTDA  
                                        </h5>
                                        <p className="text-sm font-weight-bold">correo</p>
                                        <span className="text-sm font-weight-bold">3001234567</span>
                                    </div>
                                    <div className="col-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div>
                <div className="carousel-item">
                    <div className="d-flex flex-row gap-2">
                        <div className="card w-25">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="font-weight-bolder">PIÑONES LTDA  
                                        </h5>
                                        <p className="text-sm font-weight-bold">correo</p>
                                        <span className="text-sm font-weight-bold">3001234567</span>
                                    </div>
                                    <div className="col-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-25">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="font-weight-bolder">PIÑONES LTDA  
                                        </h5>
                                        <p className="text-sm font-weight-bold">correo</p>
                                        <span className="text-sm font-weight-bold">3001234567</span>
                                    </div>
                                    <div className="col-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-25">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="font-weight-bolder">PIÑONES LTDA  
                                        </h5>
                                        <p className="text-sm font-weight-bold">correo</p>
                                        <span className="text-sm font-weight-bold">3001234567</span>
                                    </div>
                                    <div className="col-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-25">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="font-weight-bolder">PIÑONES LTDA  
                                        </h5>
                                        <p className="text-sm font-weight-bold">correo</p>
                                        <span className="text-sm font-weight-bold">3001234567</span>
                                    </div>
                                    <div className="col-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div>
                
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col md-7 mt-4">
            <div className="card">
                <div className="card-body">
                    Card
                </div>
            </div>
        </div>
        <div className="col md-5 mt-4">
            <div className="card">
                <div className="card-body">
                    Card
                </div>
            </div>
        </div>
    </div>
    </>
}

export default PedidosProveedores