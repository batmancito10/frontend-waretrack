import { useEffect, useContext } from "react"
import { PageTitle } from "../../App"
import CarrouselProveedores from "../../containers/CarrouselProveedores.jsx"
import Pedidos from "../../containers/Pedidos.jsx"

function PedidosProveedores() {
    const { setTitle } = useContext(PageTitle)

    useEffect(() => {
        setTitle('Pedidos - Proveedores')
    })

    return <>
        <CarrouselProveedores/>
        <Pedidos/>
    </>
}

export default PedidosProveedores