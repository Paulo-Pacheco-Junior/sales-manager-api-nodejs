# 📊 Sales Manager API

API RESTful desenvolvida com **Node.js**, **TypeScript** e **Prisma** para gerenciar vendas, com autenticação JWT, controle de acesso baseado em função (seller, supervisor), e integração com banco de dados PostgreSQL.

---

## 🌐 Front-end da Aplicação

Você pode visualizar e testar a aplicação em produção com a interface React que consome esta API:

- 🔗 **Site em Produção:** [https://vendasreact.vercel.app](https://vendasreact.vercel.app)
- 💻 **Repositório do Front-end:** [github.com/Paulo-Pacheco-Junior/minhas-vendas-render-reactjs](https://github.com/Paulo-Pacheco-Junior/minhas-vendas-render-reactjs)

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)
- [JWT](https://jwt.io/)
- [Docker](https://www.docker.com/)

---

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js v18+
- PostgreSQL
- Docker (opcional)

### Passos

```bash
git clone https://github.com/Paulo-Pacheco-Junior/sales-manager-1.0.git
cd sales-manager

npm install

cp .env.example .env

npx prisma generate
npx prisma migrate dev --name init

npm run dev
```

---

## 📁 Estrutura do Projeto

```
src/
├── app.ts
├── server.ts
├── routes/
├── controllers/
├── middlewares/
├── utils/
├── database/
├── configs/
├── env.ts
```

---

## 🧾 Modelos

**`User`**

| Campo      | Tipo   | Observações              |
| ---------- | ------ | ------------------------ |
| id         | UUID   | Chave primária           |
| name       | string | Nome do usuário          |
| email      | string | Único                    |
| password   | string | Criptografado com bcrypt |
| employeeId | string | Único                    |
| role       | enum   | `seller` ou `supervisor` |


**`Sale`**

Campos como:
- cpfCnpj
- region
- saleDate
- internetPlanSpeed
- paymentMethod
- status (enum):
    - Em_aprovisionamento
    - Instalada
    - Cancelada
    - Com_pendencia
    - Aguardando_pagamento
    - Pendencia_tecnica
    - Draft
    - Sem_slot

---

## 📬 Endpoints da API

### 🔐 Sessões
**`POST /sessions`** → Autenticação (login)

### 👤 Usuários
**`POST /users`** → Criação de usuário

### 📦 Vendas (autenticadas)

| Método | Rota         | Descrição                  |
| ------ | ------------ | -------------------------- |
| POST   | `/sales`     | Criar venda                |
| GET    | `/sales`     | Listar vendas (por função) |
| GET    | `/sales/:id` | Buscar venda específica    |
| PUT    | `/sales/:id` | Atualizar venda            |
| DELETE | `/sales/:id` | Deletar venda              |

---

## 🔐 Autenticação e Autorização

JWT
- Login gera um token válido para acesso às rotas protegidas.
- Middleware ensureAuthenticated protege rotas privadas.
- Middleware verifyUserAuthorization restringe acesso por função.

---

## ✅ Validação com Zod

- Todos os dados de entrada são validados com zod, tanto para criação de usuários quanto vendas e login.

---

## 🧱 Tratamento de Erros

Classe AppError
- Permite lançar erros personalizados com mensagens e códigos HTTP.

```bash
throw new AppError("Unauthorized access", 401);
```

Middleware errorHandling
- Lida com erros AppError, ZodError e internos do servidor.
- Retorna respostas JSON padronizadas.

---

## 📦 Scripts NPM

| Comando            | Descrição                                |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Inicia com `tsx` em modo desenvolvimento |
| `npm run build`    | Compila com `tsup`                       |
| `npm start`        | Executa build em produção                |

---

## 🐳 Usando com Docker

```bash
docker-compose up --build
```

---
