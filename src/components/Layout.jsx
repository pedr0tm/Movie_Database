import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ totalFavoritos }) {
  const { pathname } = useLocation();

  // Ao trocar de página, volta ao topo (o BrowserRouter não faz isso sozinho).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Navbar totalFavoritos={totalFavoritos} />

      <main className="conteudo">
        {/* Aqui entra a página da rota atual */}
        <Outlet />
      </main>

      <footer className="rodape">
        Este produto usa a API do TMDb, mas não é endossado nem certificado pelo TMDb.
      </footer>
    </div>
  );
}

export default Layout;
