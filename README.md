# Catálogo de Filmes

Aplicação React (Vite + React Router) que consome a API oficial do [TMDb](https://www.themoviedb.org/).

- **Início (`/`)** – filmes mais populares, com estados de carregamento e erro.
- **Detalhes (`/filme/:id`)** – rota dinâmica com `useParams`, botão Voltar com `useNavigate`.
- **Busca (`/busca`)** – formulário controlado, validação com `.trim()` e resultados com `MovieCard`.
- **Favoritos (`/favoritos`)** – favoritar/desfavoritar com estado imutável, salvo no `localStorage`.
- **404** – qualquer outra rota mostra uma página de erro com link para a Home.

## Como rodar

### 1. Obter a chave da API do TMDb

1. Crie uma conta gratuita em <https://www.themoviedb.org/signup> e confirme o e-mail.
2. Entre na conta e abra <https://www.themoviedb.org/settings/api>
   (menu do avatar → **Configurações** → **API**).
3. Clique em **Solicitar uma chave de API** (*Request an API key*) e escolha **Developer**.
4. Aceite os termos e preencha o formulário. Para um trabalho acadêmico, use tipo de uso *Educational*/*Personal*,
   um nome qualquer para o app, `http://localhost:5173` como URL e uma breve descrição do projeto.
5. De volta à página de API, copie a **Chave da API** (*API Key*, 32 caracteres).
   O **Token de Leitura da API** (começa com `eyJ`) também funciona.

> Os nomes dos menus podem mudar um pouco, pois o site do TMDb é atualizado de tempos em tempos.

### 2. Colocar a chave no projeto

1. Na raiz do projeto, copie o arquivo de exemplo:

   ```bash
   cp .env.example .env
   ```

2. Abra o `.env` e cole a chave depois do `=`, sem aspas e sem espaços:

   ```
   VITE_TMDB_API_KEY=sua_chave_aqui
   ```

O `.env` está no `.gitignore`, então sua chave não vai para o GitHub. Nunca commite esse arquivo.

### 3. Instalar e executar

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente <http://localhost:5173>).
Se mudar o `.env`, pare o servidor (`Ctrl+C`) e rode `npm run dev` de novo, pois o Vite só lê esse arquivo ao iniciar.

Outros comandos: `npm run build` (gera a pasta `dist/`) e `npm run preview` (testa o build).

## Estrutura

```
src/
├── components/
│   ├── Layout.jsx        Navbar + <Outlet/> + rodapé fixo
│   ├── Navbar.jsx        Links com NavLink (estilo do link ativo via isActive)
│   └── MovieCard.jsx     Poster, título, nota e botão de favoritar (via props)
├── pages/
│   ├── Home.jsx
│   ├── Detalhes.jsx
│   ├── Busca.jsx
│   ├── Favoritos.jsx
│   └── NaoEncontrada.jsx
├── App.jsx               BrowserRouter/Routes/Route e estado dos favoritos
├── main.jsx
├── tmdb.js               URL base, chave e funções auxiliares da API
└── index.css
```

## Problemas comuns

| Mensagem na tela | Causa |
| --- | --- |
| "Chave da API do TMDb não configurada…" | O `.env` não existe, está sem a chave ou o servidor não foi reiniciado. |
| "O TMDb recusou a chave da API…" | Chave copiada errada ou incompleta, ou ainda não ativada. |
| "Não foi possível conectar ao TMDb…" | Sem internet, ou a rede bloqueia `api.themoviedb.org`. |

## Atribuição

Este produto usa a API do TMDb, mas não é endossado nem certificado pelo TMDb.
