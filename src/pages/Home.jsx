import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import {
  ERRO_SEM_CHAVE,
  TEM_CHAVE,
  descreverErroHttp,
  mensagemDoErro,
  montarRequisicao,
} from '../tmdb';

function Home({ favoritos, onToggleFavorito }) {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Array de dependências vazio: busca os filmes uma única vez, quando a página abre.
  useEffect(() => {
    if (!TEM_CHAVE) {
      setErro(ERRO_SEM_CHAVE);
      setLoading(false);
      return;
    }

    const controlador = new AbortController();
    const { url, opcoes } = montarRequisicao('/movie/popular');

    async function carregarPopulares() {
      try {
        const resposta = await fetch(url, { ...opcoes, signal: controlador.signal });
        if (!resposta.ok) throw new Error(descreverErroHttp(resposta.status));

        const dados = await resposta.json();
        setFilmes(dados.results);
        setLoading(false);
      } catch (e) {
        if (e.name === 'AbortError') return;
        setErro(mensagemDoErro(e));
        setLoading(false);
      }
    }

    carregarPopulares();

    // Cancela a requisição se a página for fechada antes da resposta chegar.
    return () => controlador.abort();
  }, []);

  return (
    <section>
      <h1 className="titulo-pagina">Filmes populares</h1>

      {loading && (
        <div className="status" role="status">
          <span className="spinner" aria-hidden="true" />
          Carregando filmes...
        </div>
      )}

      {erro && (
        <p className="mensagem erro" role="alert">
          {erro}
        </p>
      )}

      {!loading && !erro && (
        <div className="grade">
          {filmes.map((filme) => (
            <MovieCard
              key={filme.id}
              filme={filme}
              favorito={favoritos.some((f) => f.id === filme.id)}
              onToggleFavorito={onToggleFavorito}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
