import { Link } from 'react-router-dom';
import { extrairAno, formatarNota, urlImagem } from '../tmdb';

function MovieCard({ filme, favorito, onToggleFavorito }) {
  const poster = urlImagem(filme.poster_path);
  const ano = extrairAno(filme.release_date);

  return (
    <article className="card">
      {/* O título já é um link acessível para o mesmo destino; o poster é só um atalho visual. */}
      <Link to={`/filme/${filme.id}`} className="card-poster" aria-hidden="true" tabIndex={-1}>
        {poster ? (
          <img src={poster} alt="" loading="lazy" />
        ) : (
          <div className="sem-poster">Sem poster</div>
        )}
      </Link>

      <div className="card-info">
        <h3 className="card-titulo">
          <Link to={`/filme/${filme.id}`}>{filme.title}</Link>
        </h3>
        <p className="card-meta">
          <span className="nota">★ {formatarNota(filme.vote_average)}</span>
          {ano && <span className="ano">{ano}</span>}
        </p>
      </div>

      <button
        type="button"
        className={favorito ? 'btn-favorito ativo' : 'btn-favorito'}
        aria-pressed={favorito}
        onClick={() => onToggleFavorito(filme)}
      >
        {favorito ? '♥ Desfavoritar' : '♡ Favoritar'}
      </button>
    </article>
  );
}

export default MovieCard;
