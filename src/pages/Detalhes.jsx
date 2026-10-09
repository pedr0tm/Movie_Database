import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ERRO_SEM_CHAVE,
  TEM_CHAVE,
  descreverErroHttp,
  extrairAno,
  formatarNota,
  mensagemDoErro,
  montarRequisicao,
  urlImagem,
} from '../tmdb';

function formatarDuracao(minutos) {
  if (!minutos) return '';
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return horas > 0 ? `${horas}h ${resto}min` : `${resto}min`;
}

function Detalhes({ favoritos, onToggleFavorito }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);
    setFilme(null);

    if (!TEM_CHAVE) {
      setErro(ERRO_SEM_CHAVE);
      setCarregando(false);
      return;
    }

    const controlador = new AbortController();
    const { url, opcoes } = montarRequisicao(`/movie/${id}`);

    async function carregarDetalhes() {
      try {
        const resposta = await fetch(url, { ...opcoes, signal: controlador.signal });
        if (!resposta.ok) throw new Error(descreverErroHttp(resposta.status));

        setFilme(await resposta.json());
        setCarregando(false);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setErro(mensagemDoErro(err));
        setCarregando(false);
      }
    }

    carregarDetalhes();

    return () => controlador.abort();
  }, [id]);

  // location.key é 'default' quando a página foi aberta direto pela URL, sem histórico para voltar
  function voltar() {
    if (location.key === 'default') {
      navigate('/');
    } else {
      navigate(-1);
    }
  }

  const botaoVoltar = (
    <button type="button" className="btn-voltar" onClick={voltar}>
      ← Voltar
    </button>
  );

  if (carregando) {
    return (
      <section>
        {botaoVoltar}
        <div className="status" role="status">
          <span className="spinner" aria-hidden="true" />
          Carregando detalhes...
        </div>
      </section>
    );
  }

  if (erro) {
    return (
      <section>
        {botaoVoltar}
        <p className="mensagem erro" role="alert">
          {erro}
        </p>
      </section>
    );
  }

  const poster = urlImagem(filme.poster_path, 'w500');
  const ano = extrairAno(filme.release_date);
  const duracao = formatarDuracao(filme.runtime);
  const favorito = favoritos.some((f) => f.id === filme.id);

  return (
    <section>
      {botaoVoltar}

      <article className="detalhes">
        {poster ? (
          <img className="detalhes-poster" src={poster} alt={`Poster de ${filme.title}`} />
        ) : (
          <div className="detalhes-poster sem-poster">Sem poster</div>
        )}

        <div className="detalhes-info">
          <h1>
            {filme.title} {ano && <span className="ano">({ano})</span>}
          </h1>

          {filme.tagline && <p className="slogan">“{filme.tagline}”</p>}

          <p className="card-meta">
            <span className="nota">
              ★ {formatarNota(filme.vote_average)}
              {filme.vote_count > 0 && ` (${filme.vote_count} votos)`}
            </span>
            {duracao && <span>{duracao}</span>}
          </p>

          {filme.genres.length > 0 && (
            <ul className="generos">
              {filme.genres.map((genero) => (
                <li key={genero.id}>{genero.name}</li>
              ))}
            </ul>
          )}

          <h2>Sinopse</h2>
          <p>{filme.overview || 'Sinopse não disponível em português.'}</p>

          <button
            type="button"
            className={favorito ? 'btn-favorito ativo' : 'btn-favorito'}
            aria-pressed={favorito}
            onClick={() => onToggleFavorito(filme)}
          >
            {favorito ? '♥ Desfavoritar' : '♡ Favoritar'}
          </button>
        </div>
      </article>
    </section>
  );
}

export default Detalhes;
