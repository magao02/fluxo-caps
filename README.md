# Store API

## Descrição

Este projeto é uma API desenvolvida com o framework [NestJS](https://nestjs.com/), utilizando TypeScript. A API é responsável por gerenciar usuários, incluindo operações como criação, atualização, remoção e recuperação de dados de usuários.

## Imagens

Atualmente, este projeto não inclui um front-end. No entanto, você pode utilizar ferramentas como o [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar as rotas da API. Além disso, o projeto inclui integração com o [Swagger](https://swagger.io/) para documentação interativa das rotas.

## Swagger

Para rodar o Swagger localmente, basta iniciar o projeto no ambiente de desenvolvimento. O Swagger estará disponível na seguinte rota:

```
http://localhost:3000/playground
```

Certifique-se de que o projeto está rodando para acessar a documentação interativa.

## Configuração de Ambiente

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Yarn](https://yarnpkg.com/) instalados. Além disso, configure as variáveis de ambiente necessárias para o funcionamento da aplicação.

## How to Run

### Instalação

```bash
$ yarn install
```

### Executando o Projeto

#### Ambiente de Desenvolvimento

```bash
$ yarn run start:dev
```

#### Ambiente de Produção

```bash
$ yarn run start:prod
```

### Testes

O projeto inclui testes unitários e de integração para garantir a qualidade do código.

```bash
# Testes unitários
$ yarn run test

# Testes end-to-end
$ yarn run test:e2e

# Cobertura de testes
$ yarn run test:cov
```

## Variáveis de Ambiente (Exemplos)

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente conforme necessário. Aqui está um exemplo atualizado:

```
PORT=3000
```

## Estrutura de Pastas

Abaixo está uma visão geral da estrutura do projeto:

```
src/
  app.module.ts          # Módulo principal da aplicação
  main.ts                # Arquivo de inicialização
  externals/             # Repositórios externos
    repositories/
      users/
        users-cache.repository.ts
        users-cache.types.ts
  modules/               # Módulos da aplicação
    users/               # Módulo de usuários
      user.module.ts
      users.controller.ts
      users.service.ts
      dto/               # Data Transfer Objects
        create-user.dto.ts
        update-user.dto.ts
      interfaces/        # Interfaces
        user.interface.ts
      repositories/      # Repositórios
        users.repository.ts
      usecases/          # Casos de uso
        create-user.usecase.ts
        remove-user.usecase.ts
        retrieve-user.usecase.ts
        retrieve-users.usecase.ts
        update-user.usecase.ts
        usecases.ts
  shared/                # Recursos compartilhados
    config/              # Configurações
      development.ts
    pipes/               # Pipes customizados
      add-uuid.pipe.ts
      add-uuid.spec.ts
test/                    # Testes
  app.e2e-spec.ts        # Testes end-to-end
  jest-e2e.json          # Configuração do Jest para E2E
```

## Funcionalidades

- **Gerenciamento de Usuários**:
  - Criar um novo usuário
  - Atualizar informações de um usuário existente
  - Remover um usuário
  - Recuperar informações de um ou mais usuários

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/): Framework para construção de aplicações Node.js escaláveis.
- [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática.
- [Jest](https://jestjs.io/): Framework de testes.
- [class-transformer](https://github.com/typestack/class-transformer): Para transformar objetos em instâncias de classes.
- [Lodash](https://lodash.com/): Biblioteca utilitária para manipulação de dados.

## ESLint e Regras de Estilo

Este projeto utiliza o [ESLint](https://eslint.org/) para garantir a qualidade do código e a consistência do estilo. As regras de estilo estão configuradas no arquivo `.eslintrc.js` e incluem:

- **@typescript-eslint**: Regras específicas para TypeScript, como desativar prefixos de interfaces e tipos explícitos de retorno de funções.
- **import/order**: Garante que as importações sejam organizadas em grupos e em ordem alfabética.
- **prettier**: Integração com o Prettier para formatação automática do código.

### Executando o ESLint

Para verificar e corrigir problemas de estilo no código, utilize o seguinte comando:

```bash
$ yarn lint
```

## Arquitetura do Projeto

A arquitetura do projeto segue uma abordagem modular e em camadas, facilitando a escalabilidade e a manutenção. Abaixo está uma descrição de como as pastas e camadas devem ser utilizadas:

### Estrutura Modular

Cada módulo representa uma funcionalidade ou domínio específico da aplicação. Por exemplo, o módulo `users` é responsável por todas as operações relacionadas a usuários.

### Camadas

1. **Controller**:
   - Localizado na pasta `modules/<modulo>/`.
   - Responsável por receber as requisições HTTP e retornar as respostas apropriadas.
   - Exemplo: `users.controller.ts`.

2. **Service**:
   - Localizado na pasta `modules/<modulo>/`.
   - Contém a lógica de negócios e orquestra as chamadas para os repositórios e casos de uso.
   - Exemplo: `users.service.ts`.

3. **Use Cases**:
   - Localizado na pasta `modules/<modulo>/usecases/`.
   - Implementa casos de uso específicos, como criação, atualização e remoção de usuários.
   - Exemplo: `create-user.usecase.ts`.

4. **Repositórios**:
   - Localizado na pasta `modules/<modulo>/repositories/`.
   - Responsável por interagir com a camada de dados, como bancos de dados ou caches.
   - Exemplo: `users.repository.ts`.

5. **DTOs (Data Transfer Objects)**:
   - Localizado na pasta `modules/<modulo>/dto/`.
   - Define os formatos de dados esperados nas requisições e respostas.
   - Exemplo: `create-user.dto.ts`.

6. **Interfaces**:
   - Localizado na pasta `modules/<modulo>/interfaces/`.
   - Define contratos e tipos utilizados no módulo.
   - Exemplo: `user.interface.ts`.

7. **Shared**:
   - Localizado na pasta `shared/`.
   - Contém recursos compartilhados entre os módulos, como pipes, configurações e utilitários.
   - Exemplo: `add-uuid.pipe.ts`.

Essa organização modular e em camadas facilita a separação de responsabilidades e promove a reutilização de código.

## Cobertura de Testes

A cobertura de testes do projeto foi analisada e apresenta os seguintes resultados:

- **Statements**: 100% (73/73)
- **Functions**: 100% (18/18)
- **Lines**: 100% (67/67)

### Cobertura por Funções e Linhas

#### Funções
- **Total**: 18
- **Cobertas**: 18
- **Cobertura**: 100%

#### Linhas
- **Total**: 67
- **Cobertas**: 67
- **Cobertura**: 100%

```bash
yarn test:cov
```

# Autenticação OAuth2/OpenID Connect

O projeto agora suporta autenticação OAuth2/OpenID Connect utilizando Passport.js e a estratégia `passport-openidconnect` integrada ao NestJS.

## Como funciona

- As rotas de autenticação estão disponíveis em `/auth/login`, `/auth/callback` e `/auth/logout`.
- O fluxo de autenticação utiliza variáveis de ambiente para configuração dos endpoints e credenciais do provedor OpenID Connect.
- O usuário é redirecionado para o provedor, faz login e retorna autenticado para a aplicação.

## Variáveis de ambiente necessárias

Adicione as seguintes variáveis ao seu `.env`:

```
OIDC_ISSUER=...           # Issuer do provedor OpenID
OIDC_AUTH_URL=...         # URL de autorização
OIDC_TOKEN_URL=...        # URL de token
OIDC_USERINFO_URL=...     # URL de userinfo
OIDC_CLIENT_ID=...        # Client ID registrado
OIDC_CLIENT_SECRET=...    # Client Secret
OIDC_CALLBACK_URL=...     # URL de callback (ex: http://localhost:3000/auth/callback)
```

## Rotas de autenticação

- `GET /auth/login` — Inicia o fluxo de autenticação.
- `GET /auth/callback` — Callback do provedor OpenID Connect.
- `GET /auth/logout` — Realiza logout do usuário.

## Exemplo de uso

1. Acesse `/auth/login` para iniciar o login.
2. Após autenticação, você será redirecionado para `/`.
3. Para sair, acesse `/auth/logout`.

---
