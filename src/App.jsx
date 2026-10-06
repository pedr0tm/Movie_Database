import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detalhes from './pages/Detalhes';
import Busca from './pages/Busca';
import Favoritos from './pages/Favoritos';
import NaoEncontrada from './pages/NaoEncontrada';

const CHAVE_FAVORITOS = 'filmes-favoritos';

// Lê a lista salva no navegador; qualquer valor inválido vira uma lista vazia.
function carregarFavoritos() {
  try {
    const salvo = localStorage.getItem(CHAVE_FAVORITOS);
    const lista = salvo ? JSON.parse(salvo) : [];
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

function App() {
  // A função inicial roda só na primeira renderização e já traz os favoritos salvos.
  const [favoritos, setFavoritos] = useState(carregarFavoritos);

  // Sempre que a lista muda, grava a nova versão no localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
    } catch {
      // Armazenamento cheio ou bloqueado: a lista continua funcionando até recarregar a página.
    }
  }, [favoritos]);

  // Imutabilidade: nunca alteramos o array atual, sempre criamos um novo.
  function alternarFavorito(filme) {
    setFavoritos((atual) => {
      if (atual.some((f) => f.id === filme.id)) {
        return atual.filter((f) => f.id !== filme.id);
      }
      // Guarda só o necessário para desenhar o card sem nova requisição.
      const resumo = {
        id: filme.id,
        title: filme.title,
        poster_path: filme.poster_path,
        vote_average: filme.vote_average,
        release_date: filme.release_date,
      };
      return [...atual, resumo];
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout totalFavoritos={favoritos.length} />}>
          <Route
            path="/"
            element={<Home favoritos={favoritos} onToggleFavorito={alternarFavorito} />}
          />
          <Route
            path="/filme/:id"
            element={<Detalhes favoritos={favoritos} onToggleFavorito={alternarFavorito} />}
          />
          <Route
            path="/busca"
            element={<Busca favoritos={favoritos} onToggleFavorito={alternarFavorito} />}
          />
          <Route
            path="/favoritos"
            element={<Favoritos favoritos={favoritos} onToggleFavorito={alternarFavorito} />}
          />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
