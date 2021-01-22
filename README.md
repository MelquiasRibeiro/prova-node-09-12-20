## Sobre este Projeto
Um crud de cadastro de usuarios e autenticação JWT, o cadastro de usúarios conta com várias validações como tipo de dados e tamanho, todas as rotas execeto a de cadastro e de login estão protegidas peola autenticação.

## Romo Rodar este projeto?
### opção 1
+ primeiro requisito é ter o docker isntalado;
+ subir um container de banco de dados docker com o comando ```run --name db_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres```
+ configurar o arquivo .ENV.exemple com as informações pedidas;
+ rodar o comando ```npm install``` para obter as bilbiotecas utilizadas no projeto;
+ rodar as migrations do banco de dados com o comando  ```npx sequelize db:migrate ```.
+ rodar o comando ```npm run start```.

### opção 2

+ primeiro requisito é ter o docker isntalado;
+ subir um container de banco de dados docker com o comando ```run --name db_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres```
+ configurar o arquivo .ENV.exemple com as informações pedidas;
+ rodar as migrations do banco de dados com o comando  ```npx sequelize db:migrate ```
+ rodar a imegem do projeto com o comando ```docker build -t provanode```
+ subir o containercom o comando  ``` docker run -p 3000:3000 -d provanode ```

## Rotas
+ __/users__:  o CRUD de usuários com 5 rotas
    1. (get)/users: lista todos os usuários cadastrados(precisa estar autenticado);
    
    2. (get)/users/id: busca um usuário por ID(precisa estar autenticado);
    3. (post)/users: cria um usuário recebendo no body da requisição as informações {"name":"",
	"username":"",
	"email":"",
	"password":""}
    4. (put)/users/id: atualiza os dados de um usurio que teve o ID fornecido, incluindo a senha(precisa estar autenticado);
    5. (delete)/users/id: delete um usuario ṕor ID .
+ __/login___: 
     1. (post)/login: faz a autenticação e retorna o token JWT e recebe as infornações  {"email":"",
	"password":""} no body.
## Ferramentas utilizadas:
Uma API de cadastro de usuários com autenticaçãodesenvolvida nos padroes REST.

+ Backend desenvolvido em [NODE.js](https://nodejs.org/en/about/) e [Express](https://expressjs.com/pt-br/)
+ Desenvolvimento de Api rest;
+ Padronização de código com [Eslint](https://eslint.org/) e [Prettier](https://prettier.io/);
+ Conexão com banco de dado gerenciado com [Sequelize](https://sequelize.org/) banco de dados Postgress;
+ Autenticação JWT com auxilio da bibliteca [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken);
+ testes automatizados com [Jest](https://jestjs.io/);
+ Validação de  dados com [YUP](https://github.com/jquense/yup);
# Prova de Backend

O projeto inicial é um cadastro de usuários em memória muito simples e sem utilizar nenhuma lib. Apesar de o código estar em qualidade baixa, o projeto está funcional. O que se espera é que o candidato melhore este código de uma maneira que possamos avaliar suas habilidades e competências.

### Rodando o projeto

`node src/index.js`

## O que será avaliado?

A idéia é deixar o candidato bem livre pra reimplementar o código da maneira que mais lhe for conveniente e que mais demonstre suas habilidades. Está liberado o uso de libs de terceiros, bancos de dados, autenticação, etc.

1. Qualidade de código
2. Uso de patterns adequados
3. Estratégia de validação de dados
4. Testes unitários

## O que é desejado (não obrigatório) na entrega?

1. Adição de Banco de dados
2. Utilização de docker
3. Autenticação
4. Utilização de typescript

## Como será feita a entrega?

Deverá ser realizado um fork deste repositório e no formulário enviado você deverá responder com o link deste fork.
