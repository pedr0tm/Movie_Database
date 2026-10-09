import { NavLink } from 'react-router-dom';

function classeDoLink({ isActive }) {
  return isActive ? 'nav-link ativo' : 'nav-link';
}

function Navbar({ totalFavoritos }) {
  return (
    <header className="navbar">
      <div className="navbar-conteudo">
        <span className="marca">Catálogo de Filmes</span>

        <nav className="nav-links" aria-label="Principal">
          <NavLink to="/" end className={classeDoLink}>
            Início
          </NavLink>
          <NavLink to="/busca" className={classeDoLink}>
            Buscar
          </NavLink>
          <NavLink to="/favoritos" className={classeDoLink}>
            Favoritos
            {totalFavoritos > 0 && <span className="contador">{totalFavoritos}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
