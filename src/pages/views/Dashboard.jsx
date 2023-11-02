import { useContext, useEffect } from 'react';
import { PageTitle } from '../../App';

function Dashboard() {
  const { setTitle } = useContext(PageTitle);
  useEffect(() => {
    setTitle('Dashboard');
  }, []);

  return <>{/*<h1>This is your dashboard</h1>*/}</>;
}

export default Dashboard;
