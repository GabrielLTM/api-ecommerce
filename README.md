[README.md](https://github.com/user-attachments/files/23887706/README.md)
#  API E-commerce

## Visão Geral

Esta API implementa um sistema completo de E-commerce, incluindo:

- Autenticação com JWT
- CRUD de usuários
- CRUD de clientes
- CRUD de produtos, marcas e categorias
- Carrinho de compras
- Pedidos
- Fornecedores
- Compras de estoque

A arquitetura segue boas práticas, separando responsabilidades em **routes**, **controllers** e **services**, além de tratamento global de erros.

---

## Estrutura do Projeto

```
src/
├── routes/
├── controllers/
├── services/
├── repositories/
├── middlewares/
├── database/
└── index.js
```

---

## Como Executar:

1️ Instale as dependências:

```bash
npm install
```

2️ Configure a variável de ambiente criando um arquivo `.env`:

```
JWT_SECRET=sua_chave_secreta_aqui
DATABASE_URL=sua_string_de_conexao
```

3️ Inicie o servidor:

```bash
npm start
```

Servidor rodará em: `http://localhost:3000`

---

##  Autenticação

Alguns endpoints exigem **token JWT**.  
Envie no cabeçalho:

```
Authorization: Bearer SEU_TOKEN
```

O token é obtido nos endpoints:

- `/auth/login`
- `/auth/register`

---

## Endpoints por Módulo

### AUTH — `/auth`

- **POST /auth/register** — Registra um novo usuário  
  **Body**:
  ```json
  { "name": "João", "email": "joao@mail.com", "password": "123456" }
  ```

- **POST /auth/login** — Realiza login e retorna token  
  **Body**:
  ```json
  { "email": "joao@mail.com", "password": "123456" }
  ```

---

### USERS — `/users`

- **GET /users** — Lista todos os usuários
- **GET /users/:id** — Retorna usuário específico
- **POST /users** — Cria novo usuário
- **PUT /users/:id** — Atualiza usuário
- **DELETE /users/:id** — Remove usuário

---

### BRANDS — `/api/brands`

- **GET /api/brands** — Lista todas as marcas
- **GET /api/brands/:id** — Retorna marca por id
- **POST /api/brands** — Cria marca
- **PUT /api/brands/:id** — Atualiza marca
- **DELETE /api/brands/:id** — Remove marca

---

### PRODUCTS — `/api/products`

- **GET /api/products** — Lista todos os produtos
- **GET /api/products/:id** — Retorna produto específico
- **POST /api/products** — Cria produto
- **PUT /api/products/:id** — Atualiza produto
- **DELETE /api/products/:id** — Remove produto

---

### CLIENTS — `/api/clients`

- **GET /api/clients** — Lista clientes
- **GET /api/clients/:id** — Cliente por ID
- **POST /api/clients** — Cria cliente
- **PUT /api/clients/:id** — Atualiza cliente
- **DELETE /api/clients/:id** — Deleta cliente

---

### CART — `/api/carts`

- **GET /api/carts/:clientId** — Obtém carrinho do cliente
- **POST /api/carts/add** — Adiciona item ao carrinho  
  **Body**:
  ```json
  {
    "clientId": 1,
    "productId": 5,
    "quantity": 2
  }
  ```
- **POST /api/carts/remove** — Remove item do carrinho

---

###  ORDERS — `/api/orders`

- **GET /api/orders** — Lista todos os pedidos
- **GET /api/orders/:id** — Retorna pedido por ID
- **POST /api/orders** — Cria pedido
- **PUT /api/orders/:id** — Atualiza pedido
- **DELETE /api/orders/:id** — Cancela pedido

---

###  FORNECEDORES — `/api/fornecedores`

- **GET /api/fornecedores** — Lista fornecedores
- **GET /api/fornecedores/:id** — Fornecedor por ID
- **POST /api/fornecedores** — Cria fornecedor
- **PUT /api/fornecedores/:id** — Atualiza fornecedor
- **DELETE /api/fornecedores/:id** — Remove fornecedor

---

###  COMPRAS — `/api/compras`

- **GET /api/compras** — Lista compras
- **GET /api/compras/:id** — Compra por ID
- **POST /api/compras** — Registra compra
- **PUT /api/compras/:id** — Atualiza compra
- **DELETE /api/compras/:id** — Remove compra

---

###  CATEGORIES — `/api/categories`

- **GET /api/categories** — Lista categorias
- **GET /api/categories/:id** — Retorna categoria
- **POST /api/categories** — Cria categoria
- **PUT /api/categories/:id** — Atualiza categoria
- **DELETE /api/categories/:id** — Remove categoria

---

##  Tratamento Global de Erros

O middleware captura erros no formato:

```json
{ "id": 400, "msg": "Mensagem de erro" }
```

E retorna:

```json
{ "erro": "Mensagem de erro" }
```

Para erros inesperados:

```json
{ "erro": "Erro interno do servidor" }
```
