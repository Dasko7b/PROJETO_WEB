
# Materias Manager

Este é um aplicativo de gerenciamento de matérias, onde você pode cadastrar, editar e excluir matérias, mantendo informações sobre o nome da matéria, o professor, o semestre e as faltas dos alunos. O back-end utiliza Prisma com um banco de dados SQL (ou MongoDB com Prisma, dependendo da configuração do seu ambiente) para armazenar os dados, enquanto o front-end é desenvolvido com React e Vite.

## Tecnologias Utilizadas

### Back-end
- **Prisma ORM**: Ferramenta para interagir com o banco de dados. Usada para criar, ler, atualizar e excluir dados de forma eficiente.
- **Express**: Framework para construção da API RESTful.
- **Node.js**: Ambiente de execução para a aplicação.
- **CORS**: Habilita a comunicação entre o front-end e o back-end de diferentes origens.

### Front-end
- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Vite**: Ferramenta de build para desenvolvimento rápido e otimização de performance no front-end.
- **Axios**: Para realizar as requisições HTTP para a API.

## Funcionalidades

- **Cadastrar Matéria**: Permite cadastrar uma nova matéria, incluindo o nome, o nome do professor, o semestre e o número de faltas.
- **Editar Matéria**: Você pode editar uma matéria existente, alterando seus dados.
- **Excluir Matéria**: As matérias podem ser excluídas após confirmação, removendo-as do banco de dados.
- **Validação de Formulário**: Verifica se todos os campos estão preenchidos corretamente antes de enviar os dados ao servidor.

## Instruções para Rodar o Projeto

### Pré-requisitos

- Node.js (recomendado versão LTS)
- Banco de dados configurado (SQL ou MongoDB, dependendo do uso do Prisma)

### Back-end

1. Clone o repositório.
2. Navegue até a pasta do back-end.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure a conexão do Prisma com o seu banco de dados no arquivo `.env` (prisma/.env). Se estiver usando um banco SQL (como PostgreSQL ou MySQL), ajuste a variável `DATABASE_URL` com as credenciais de acesso.
5. Realize as migrações para criar a tabela `materias` no banco de dados:
   ```bash
   npx prisma migrate dev
   ```
6. Inicie o servidor:
   ```bash
   npm start
   ```
7. O servidor estará rodando na porta 3000 (por padrão).

### Front-end

1. Navegue até a pasta do front-end.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. O front-end estará disponível no navegador em `http://localhost:5173` (por padrão).

### Endpoints da API

- **GET `/materias`**: Retorna todas as matérias cadastradas.
- **POST `/materias`**: Cria uma nova matéria.
  - Corpo da requisição:
    ```json
    {
      "materia": "Nome da Matéria",
      "professor": "Nome do Professor",
      "semestre": 1,
      "faltas": 0
    }
    ```
- **PUT `/materias/:id`**: Atualiza uma matéria existente.
  - Corpo da requisição:
    ```json
    {
      "materia": "Novo Nome da Matéria",
      "professor": "Novo Nome do Professor",
      "semestre": 2,
      "faltas": 1
    }
    ```
- **DELETE `/materias/:id`**: Exclui uma matéria com o ID especificado.

## Contribuindo

Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias ou correções de bugs.

