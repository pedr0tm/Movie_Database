import { Link } from 'react-router-dom';

function NaoEncontrada() {
  return (
    <section className="pagina-404">
      <p className="codigo-404">404</p>
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou abrir não existe ou foi movido.</p>
      <Link to="/" className="btn-link">
        Voltar para a Home
      </Link>
    </section>
  );
}

export default NaoEncontrada;
