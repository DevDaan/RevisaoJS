Criamos  o arquivo app.js e criamos uma classe APP para facilitar  os testes da aplicação.



======================== DOCKER ===============

PARA QUE SERVE :

O Docker nos ajuda a controlar os serviços externos da nossa aplicação.


COMO FUNCIONA ? 

O docker tem varias funções, dentre elas a criação de ambientes isolados(container). Esses ambientes isolados  são ambientes que não interferem no funcionamento de outras tecnologias dentro do nosso servidor.


 Ex.: Se a gente fosse instalar um servidor de banco de dados no nosso sistema de forma tradicional, ele mexeria em varios arquivos da nossa máquina. Se por um acaso em algum momento quiséssemos trocar o banco de dados, ou exclui-lo, ou atualiza-lo para uma versão mais recente, teríamos muitos problemas.


Tendo isso em vista, quando criamos um ambiente isolado com o docker, o nosso sistema fica totalmente desconexo de outros serviços da nossa aplicação. então quando instalamos um postegrees sql, ele fica em um subsistema da nossa maquina que não interfere no funcionamento restante da nossa máquina.  Um container que subimos com docker jamais mexerá em arquivos do restante da nossa aplicação ou do nosso SO.


Os containers expõem portas para comunicação. Ou seja, para nos comunicarmos entre os containers, utilizamos as portas que eles disponibilizam


Ex:

No postgrees, utilizamos a porta 5432

No MYSQL, utilizamos a porta 3306




Principais conceitos do docker.


 - Imagem: serviço disponível do docker (postgrees, mysql, etc), são tecnologias que podemos colocar dentro do docker.


- Container: O Container é uma instancia de imagem. Se a gente pensar que a imagem é o postgrees, nós podemos ter 3 banco de dados postgress dentro do nosso ambibente  de desenvolvimento rodando com a imagem do postgress



- Docker Registry (Docker Hub) - É onde encontramos essas imagens para utilizar no docker. 

- Dockerfile - É a receita para a gente montar a nossa própria imagem e inclui-lá no docker registry. O dockerfile define a receita  (código node) para a nossa aplicação funcionar totalmente do zero.


Ex.: 

//  Partimos de uma imagem existente

FROM node:10

// Definimos a pasta e copiamos os arquivos

WORKDIR /usr/app
COPY . ./


// Instalamos as dependencias
RUN yarn


// Qual porta queremos expor ? 
EXPOSE 3333


// Executamos nossa aplicação
CMD yarn start




DESSA FORMA, SE QUISERMOS TROCAR DE SERVIDOR POR EXEMPLO, FICA MUUUUUITO MAIS SIMPLESS




=================== ORM ====================

É uma forma  de abstrair o nosso banco de dados (mudar a corma como o nosso banco de dados funciona e como a nossa aplicação se comunica com o banco de dados)


- Tabelas viram models - NO MVC, as nossas tabelas viram models




MANIPULAÇÃO DOS DADOS COM SEQUELIZE


 - NÃO UTILIZAMOS SQL (NA MAIORIA DAS VEZEs UTILIZAMOS APENAS CÓDIGO JS)

 
 Exemplo:


SQL NORMAL

 INSERT INTO users(name, email) 
 VALUES(

   "Daniel Vieira"
   "daniel@email.com"
   
   )



COM SEQUELIZE:


User.create({
  name: 'Daniel Vieira',
  email: 'daniel@mail.com'
})




MIGRATIONS 


É um controle de versão para a base de dados, ou seja, é uma forma  de manter o nosso banco de dados atualizados entre todo o time de desenvolvimento e entre o desenvolvimento e a produção.


 - Cada arquivo contem instruções para criação, alteração o uremoção de tabelas ou colunas da base de dados. (um arquivo de migration pode criar tabela nova, atualizar, ou até mesmo deletar)

 - Cada arquivo é uma migration e sua ordenação ocorre por data.



 Ex de migration:


 module.exports = {
   up: (queryInterface, Sequelize) =>{
     return queryInterface.createTable('users', {
       id: {
         allowNull: False,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
       },
       name: {
         allowNull: false,
         type: Sequelize.STRING,
       },
       email: {
         allowNull: false,
         unique: true,
         type: Sequelize.STRING
       }
     })
   },

   down: (query.Interface, Sequelize) =>{
     return queryInterface,dropTable('users')
   }
 }


 - Toda migration precisa ter um rollback, para caso algo dê errado. (geralmente as rollbacks apagam a tabela que foi criada)



IMPORTANTE: DEPOIS QUE A MIGRATION SAI DO NOSSO AMBIENTE DE DESENVOLVIMENTO E VAI PARA OUTROS USUARIOS / DESENVOLVEDORES OU PRODUÇÃO, NÓS NUNCA PODEMOS EDITAR ESSA MIGRATION.





 - É possível desfazer uma migração se erramos algo enquanto estivemos desenvolvendo a feature, para isso realizamos o rollback da migration.


  - Depois quea migration foi enviada para outros devs ou para o ambiente de produção, ela JAMAIS DEVERÁ SER ALTERADA.


   - Cada migration deve realizar alterações em apenas uma tabela, voce pode criar várias migrations para alterações maiores







SEEDS -  


 - Populam a base de dados para desenvolviemtno.

  - Muito utilizado para popular dados para testes

  - Executável apenas por código


  - Jamais serão utilizados em produção.

  - Caso sejam dados que precisam ir para produção, a própria migration pode manipular dados das tabelas;







  ============================ARQUITETURA MVC= ==============


  Consiste uma forma de estruturar as pastas e arquivos da aplicação a fim de separar as responsabilidades de cada tipo de arquivo.


  MCV é o acronomo de Model, Controller e View



  Model - Armazena a abstração do banco, utilizado para manipular os dados contidos nas tabelas de banco. Não possuem responsabilidades sobre a regra de negócio da nossa aplicação


  Controller - É o entry point da nossa aplicação. Por eles passam as requisições da nosas aplicação. Uma rota geralmente está associada diretamente com um método do controller. Podemos incluir a grande parte das regras de negócio da aplicação nos controllers (conforme a aplicação cresce prodemos isolar as regras)



  View = É o retnorno ao cliente, em aplicações que não utilizamos o modelo de API REST isso pode ser um html, mas no nosso caso a view é apenas nosso JSON que será retornado ao front-tend e depois manipulado pelo REACTJS ou REACT NATIVE



  A FACE  DE UM CONTROLLER


   - Classes
    - Sempre retorna um JSON
      Não chama outro controller / método


QUANDO CRIAR UM NOVO CONTROLLER

 - Toda vez que tivemos uma nova entidade (ENTIDADE NÃO É A MESMA COISA QUE MODEL),

 - Quando o controller ultrapassar  os 5 métodos:

 Index() {} //listagem de usuários

 show() {} //exibir  um único usuário]

 store() {} cadastrar usuário

 update() {} //alterar usuário

 delete() {} remover usuário



