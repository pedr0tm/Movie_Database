const URL_BASE = 'https://api.themoviedb.org/3';
const URL_IMAGENS = 'https://image.tmdb.org/t/p';
const CHAVE = (import.meta.env.VITE_TMDB_API_KEY ?? '').trim();

export const TEM_CHAVE = CHAVE !== '';

export const ERRO_SEM_CHAVE =
  'Chave da API do TMDb não configurada. Crie o arquivo .env com VITE_TMDB_API_KEY=sua_chave e reinicie o servidor (npm run dev).';

export function montarRequisicao(caminho, parametros = {}) {
  const url = new URL(`${URL_BASE}${caminho}`);
  url.searchParams.set('language', 'pt-BR');
  Object.entries(parametros).forEach(([nome, valor]) => {
    url.searchParams.set(nome, valor);
  });

  // o token v4 é um JWT (começa com "eyJ") e vai no cabeçalho; a chave v3 vai na URL
  if (CHAVE.startsWith('eyJ')) {
    return {
      url: url.toString(),
      opcoes: { headers: { Authorization: `Bearer ${CHAVE}`, accept: 'application/json' } },
    };
  }

  url.searchParams.set('api_key', CHAVE);
  return { url: url.toString(), opcoes: {} };
}

export function urlImagem(caminho, tamanho = 'w342') {
  return caminho ? `${URL_IMAGENS}/${tamanho}${caminho}` : null;
}

export function descreverErroHttp(status) {
  if (status === 401) {
    return 'O TMDb recusou a chave da API. Confira o valor de VITE_TMDB_API_KEY no arquivo .env.';
  }
  if (status === 404) return 'Filme não encontrado.';
  if (status === 429) return 'Muitas requisições ao TMDb. Aguarde um instante e tente novamente.';
  return `O TMDb respondeu com erro ${status}. Tente novamente mais tarde.`;
}

// sem conexão o fetch lança TypeError; os outros erros já têm mensagem própria
export function mensagemDoErro(erro) {
  if (erro instanceof TypeError) {
    return 'Não foi possível conectar ao TMDb. Verifique sua conexão com a internet.';
  }
  return erro.message;
}

export function formatarNota(nota) {
  return nota > 0 ? nota.toFixed(1) : 'N/D';
}

export function extrairAno(data) {
  return data ? data.slice(0, 4) : '';
}
