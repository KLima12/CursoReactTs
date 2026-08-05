# TodoList Frontend

Aplicação de gerenciamento de tarefas com autenticação JWT em React + TypeScript.

## Funcionalidades

- Login e registro
- CRUD de tarefas
- Favoritar tarefas
- Autenticação JWT

## Tecnologias

React 18 | TypeScript | Vite | React Router | Axios | CSS Modules

## Instalação

```bash
git clone https://github.com/KLima12/TodoListFront.git
cd TodoListFront
npm install
npm run dev
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_URL=http://localhost:8000
```

## Build

```bash
npm run build
```

## Estrutura do Projeto

```
src/
├── pages/
│   ├── Home/
│   ├── Details/
│   └── public/
│       ├── login/
│       └── register/
├── shared/
│   ├── components/
│   ├── contexts/
│   ├── layout/
│   └── services/
│       ├── api/
│       └── auth/
└── routes.tsx
```

## Deploy

Vercel - https://todolistfront-taupe.vercel.app

## Contato

kaua.ctotrend@gmail.com
