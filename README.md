# Boas-vindas!

Esta é uma API que simula ao usuário acesso aos ativos de uma corretora e a detalhes de sua conta.

Documentação da API(Swagger) : https://psel-xp-api.herokuapp.com/docs/#/

Deploy : https://psel-xp-api.herokuapp.com

<br />

# Linguagens e ferramentas utilizadas

<ul>
<li>Node.js</li>
<li>Javascript</li>
<li>Sequelize</li>
<li>JWT</li>
<li>Supabase</li>
<li>Swagger</li>
<li>Heroku</li>
<li>Mocha</li>
<li>Chai</li>
<li>Sinon</li>
</ul>

<br />


# Diagrama do banco de dados
<img src="./images/db.png"/>


# Orientações de como rodar o projeto
 ## 👉 Sem Docker
  > Após clonar o projeto, entre no diretório do projeto e execute o comando `npm install`.<br>
  
  > Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis <br>

  > Execute os comandos `npx sequelize-cli db:create`, `npx sequelize-cli db:migrate` e `npx sequelize-cli db:seed:all`<br>

  > Execute `npm start` para rodar a aplicação<br>
  
  ## 👉 Com Docker
  > Após clonar o projeto, entre no diretório do projeto e execute o comando `npm install`. <br> 

  > Execute `docker-compose up` <br>

  > Renomeie o arquivo `.env.example para` `.env` e preencha a variável `JWT_SECRET`<br>

  > Abra o CLI do container api com o comando `docker exec -it api bash`<br>

  > Execute os comandos `npx sequelize-cli db:create`, `npx sequelize-cli db:migrate` e `npx sequelize-cli db:seed:all`<br>

# Autenticação

Pensando na necessidade de segurança de acesso em uma API real, as rotas de <strong>saque, compra de ativos, venda de ativos, consulta de saldo, busca de ativos por cliente, e histórico de transações do cliente</strong> são autenticadas e requerem o token de autenticação dado nas rotas de registro ou de login. Esse token deve ser passado nos headers da requisição na chave `authorization`. Se atente também em utilizar o código de cliente correto que também é retornado nas rotas de registro ou login. 

<strong>Um e-mail pode ser cadastrado um única vez no banco de dados da aplicação, caso não consiga finalizar o cadastro de um cliente, tente alterá-lo!</strong>

# Testes

Foram implementados neste projeto testes unitários somente da camada service e das middlewares de validação.
 >  Para rodar os testes, execute o comando `npm test`. Não é necessário estar rodando a aplicação
  <br>