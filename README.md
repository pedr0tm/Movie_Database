# Catálogo de Filmes

Catálogo feito com React, Vite e React Router, usando a API do [TMDb](https://www.themoviedb.org/).

- Início (`/`): filmes populares.
- Detalhes (`/filme/:id`): sinopse, nota, duração e gêneros de um filme.
- Busca (`/busca`): pesquisa por título.
- Favoritos (`/favoritos`): filmes favoritados, salvos no `localStorage`.

## Como rodar

### 1. Pegar a chave da API do TMDb

1. Crie uma conta em <https://www.themoviedb.org/signup> e confirme o e-mail.
2. Abra <https://www.themoviedb.org/settings/api> (avatar → Configurações → API).
3. Peça uma chave de API e escolha o tipo **Developer**.
4. No formulário, use uso educacional, um nome qualquer para o app, `http://localhost:5173` como URL e uma descrição curta.
5. Copie a **Chave da API** (32 caracteres). O **Token de Leitura da API** (começa com `eyJ`) também funciona.

### 2. Colocar a chave no projeto

Copie o arquivo de exemplo e cole a chave depois do `=`, sem aspas e sem espaços:

```bash
cp .env.example .env
```

```
VITE_TMDB_API_KEY=sua_chave_aqui
```

O `.env` já está no `.gitignore`, então a chave não vai para o GitHub.

### 3. Instalar e executar

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente <http://localhost:5173>).
Se mudar o `.env`, pare o servidor com `Ctrl+C` e rode `npm run dev` de novo, porque o Vite só lê esse arquivo ao iniciar.

## Estrutura

```
src/
├── components/
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   └── MovieCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Detalhes.jsx
│   ├── Busca.jsx
│   ├── Favoritos.jsx
│   └── NaoEncontrada.jsx
├── App.jsx               rotas e estado dos favoritos
├── main.jsx
├── tmdb.js               acesso à API do TMDb
└── index.css
```

## Atribuição

Este produto usa a API do TMDb, mas não é endossado nem certificado pelo TMDb.
