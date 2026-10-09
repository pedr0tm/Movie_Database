import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import {
  ERRO_SEM_CHAVE,
  TEM_CHAVE,
  descreverErroHttp,
  mensagemDoErro,
  montarRequisicao,
} from '../tmdb';

function Busca({ favoritos, onToggleFavorito }) {
  // a busca fica na URL (/busca?q=...) para os resultados sobreviverem ao voltar dos detalhes
  const [parametros, setParametros] = useSearchParams();
  const consulta = (parametros.get('q') ?? '').trim();

  const [termo, setTermo] = useState(consulta);
  const [erroValidacao, setErroValidacao] = useState('');

  // a resposta guarda a consulta de origem; "carregando" é derivado da diferença com a URL
  const [resposta, setResposta] = useState({ consulta: '', filmes: [], erro: null });
  const carregando = consulta !== '' && resposta.consulta !== consulta;

  // acompanha o voltar/avançar do navegador
  useEffect(() => {
    setTermo(consulta);
  }, [consulta]);

  useEffect(() => {
    if (consulta === '') return;

    if (!TEM_CHAVE) {
      setResposta({ consulta, filmes: [], erro: ERRO_SEM_CHAVE });
      return;
    }

    const controlador = new AbortController();
    const { url, opcoes } = montarRequisicao('/search/movie', {
      query: consulta,
      include_adult: 'false',
    });

    async function buscarFilmes() {
      try {
        const resp = await fetch(url, { ...opcoes, signal: controlador.signal });
        if (!resp.ok) throw new Error(descreverErroHttp(resp.status));

        const dados = await resp.json();
        setResposta({ consulta, filmes: dados.results, erro: null });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setResposta({ consulta, filmes: [], erro: mensagemDoErro(err) });
      }
    }

    buscarFilmes();

    return () => controlador.abort();
  }, [consulta]);

  function aoEnviar(e) {
    e.preventDefault();

    const termoLimpo = termo.trim();
    if (termoLimpo === '') {
      setErroValidacao('Digite o nome de um filme para buscar.');
      return;
    }

    setErroValidacao('');
    setParametros({ q: termoLimpo });
  }

  return (
    <section>
      <h1 className="titulo-pagina">Buscar filmes</h1>

      <form className="form-busca" onSubmit={aoEnviar} noValidate>
        <input
          type="search"
          value={termo}
          onChange={(e) => {
            setTermo(e.target.value);
            setErroValidacao('');
          }}
          placeholder="Ex.: Interestelar"
          aria-label="Título do filme"
          aria-invalid={erroValidacao !== ''}
        />
        <button type="submit">Buscar</button>
      </form>

      {erroValidacao && (
        <p className="mensagem erro" role="alert">
          {erroValidacao}
        </p>
      )}

      {carregando && (
        <div className="status" role="status">
          <span className="spinner" aria-hidden="true" />
          Buscando filmes...
        </div>
      )}

      {!carregando && resposta.erro && consulta !== '' && (
        <p className="mensagem erro" role="alert">
          {resposta.erro}
        </p>
      )}

      {!carregando && !resposta.erro && consulta !== '' && (
        <>
          {resposta.filmes.length === 0 ? (
            <p className="mensagem">Nenhum filme encontrado para “{consulta}”.</p>
          ) : (
            <>
              <p className="subtitulo">
                {resposta.filmes.length} resultado(s) para “{consulta}”
              </p>
              <div className="grade">
                {resposta.filmes.map((filme) => (
                  <MovieCard
                    key={filme.id}
                    filme={filme}
                    favorito={favoritos.some((f) => f.id === filme.id)}
                    onToggleFavorito={onToggleFavorito}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default Busca;
