import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ totalFavoritos }) {
  const { pathname } = useLocation();

  // o BrowserRouter não volta ao topo sozinho ao trocar de rota
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Navbar totalFavoritos={totalFavoritos} />

      <main className="conteudo">
        <Outlet />
      </main>

      <footer className="rodape">
        Este produto usa a API do TMDb, mas não é endossado nem certificado pelo TMDb.
      </footer>
    </div>
  );
}

export default Layout;
