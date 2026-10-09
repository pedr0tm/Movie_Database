import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detalhes from './pages/Detalhes';
import Busca from './pages/Busca';
import Favoritos from './pages/Favoritos';
import NaoEncontrada from './pages/NaoEncontrada';

const CHAVE_FAVORITOS = 'filmes-favoritos';

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
  const [favoritos, setFavoritos] = useState(carregarFavoritos);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
    } catch {
      // storage cheio ou bloqueado: a lista segue funcionando até recarregar
    }
  }, [favoritos]);

  function alternarFavorito(filme) {
    setFavoritos((atual) => {
      if (atual.some((f) => f.id === filme.id)) {
        return atual.filter((f) => f.id !== filme.id);
      }
      // só o que o card precisa, pra não refazer a requisição
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
