import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export const PageTitle = createContext();

function App() {
  const [title, setTitle] = useState();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = './src/assets/js/soft-ui-dashboard.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <PageTitle.Provider value={{ title, setTitle }}>
        <Sidebar />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
          <Navbar />
          <div className="container-fluid py-4">
            <Outlet />
          </div>
        </main>
      </PageTitle.Provider>
    </>
  );
}

export default App;
