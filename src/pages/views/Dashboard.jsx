import { useContext, useEffect } from 'react';
import { PageTitle } from '../../App';
import VentasSemana from '../../components/metricas/VentasSemana';
import VentasSede from '../../components/metricas/VentasSede';
import TotalProductos from '../../components/metricas/TotalProductos';

function Dashboard() {
  const { setTitle } = useContext(PageTitle);

  useEffect(() => {
    setTitle('Dashboard');
  }, []);



  return <> 
  <div className='row mt-4'>
    <VentasSemana></VentasSemana>
    <VentasSede></VentasSede>
  </div>
    <TotalProductos></TotalProductos>
    </>
}

export default Dashboard;
