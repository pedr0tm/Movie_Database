import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function Favoritos({ favoritos, onToggleFavorito }) {
  return (
    <section>
      <h1 className="titulo-pagina">Meus favoritos</h1>

      {favoritos.length === 0 ? (
        <p className="mensagem">
          Você ainda não favoritou nenhum filme. Veja os <Link to="/">filmes populares</Link> ou{' '}
          <Link to="/busca">busque um título</Link>.
        </p>
      ) : (
        <div className="grade">
          {favoritos.map((filme) => (
            <MovieCard
              key={filme.id}
              filme={filme}
              favorito
              onToggleFavorito={onToggleFavorito}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Favoritos;
