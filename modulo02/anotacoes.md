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








======================== PASSO-A-PASSO REALIZADO PARA CRIAR A CONEXÃO COM O BANCO POSTGRES =============


0 - ANTES DE QUALQUER COISA CRIAR UMA ESTRUTURA DE PASTAS PARA ARMAZENAR AS CONFIGURAÇÕES DA APLICAÇÃO DE DO BANCO DE DADOS:


   - dentro da pasta SRC criamos uma pasta chamada config e dentro da pasta config criamos um arquivo chamado database.js. Nessa pasta ficaraá armazenada a maioria das configurações da nossa aplicação. - O arquivo database.js contem as instruções para a aplicação se conectar ao nosso banco de dados. Para isso acontecer, precisamos exportar um objeto com as seguintes configurações:

    module.exports = {
      dialect: NOME DO SGBD - MYSQL, POSTEGRESS, MARIADB, ETC,
      host: ENDEREÇO EM QUE SE ENCONTRA O BANCO,
      username: USUÁRIO UTILIZADO PARA SE CONECTAR NO BANCO,
      password: SENHA PARA SE AUTENTICAR NO BACO,
      database: NOME DO BANCO DE DADOS,
      define: {
        OPCIONAL - PODE SER USADO PARA DEFINIR CONFIGURAÇÕES ADICIONAIS, COMO TIMESTAMPS E UNEDRSCORED(QUE SERVE PARA ACEITAR _ NO NOME DAS TABELAS)
        imestamps: true,
        underscored: true,
        underscoredAll: true,
      },
  };


  -  dentro da pasta SRC criamos uma pasta chamada database e dentro da pasta database criamos uma pasta chamada migrations. A pasta database será responsável por amarmazenar tudo o que for relacionado ao banco de dados, fora  a configuração de conexão que deverá ser feita dentro da pasta config. A pasta migrations ficará responsável por armazenar toda à lógica de interação com o banco de dados (CREATE, UPDATE, INSERT, DELETE, SELECT, ETC).


 - ainda dentro da pasta SRC criamos uma pasta chamada app. Dentro dessa pasta criaremos uma pasta chamada model e outra chamada controller. Na pasta app ficará a maioria do código que envolve regra de negócio, lógica ou qualquer outro tipo de regra da nossa aplicação.


1 - Após isso, instalamos as dependencias do sequelize:

   - yarn add sequelize
   - yarn add sequelize-cli -D




2 - Criamos o arquivo .sequelizerc. Esse arquivo serve para identificarmos o caminho que a aplicação deverá percorrer do momento de uma requisição de cadastro até a conclusão e registro com o banco de dados. Para fazer isso importamos o método resolve do pacote path. O resolve cria o caminho absoluto para as pastas desejadas, precisamos apenas informar entre stings e separando por virgulas o nome das pastas que queremos interligar.


EX.:

const { resolve } = require('path')

module.exports = {
  config: resolve(__dirname, 'src', 'config', 'database.js'), //src/config/database.js
  'models-path': resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'seeds', 'migrations'),

}


3 - abrimos o terminal integrado do vscode e executamos o comando yarn sequelize migration:create --name=create-users. Esse comando cria um arquivo dentro  da pasta migrations com 2 métodos: UP e Down. O método UP é utilizado para realizar uma ação inicial dentro do banco de dados. O método down é utilizado para armazenar o rollback caso algo de errado.

dentro do método UP, começamos a definir o que vai ser feito no banco de dados com aquela migration. no exemplo abaixo, utilizamos o método UP para criar uma tabela de usuários através do queryInterface.createTable('users')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};


4 - após criar a lógica da migration, executamos o comando yarn sequelize db:migrate. Esse comando roda a migrate e insere a lógica no banco de dados (no caso do exemplo anterior cria uma tabela user).



5 - depois de criar a migration, precisamos criar o nosso model de usuários, para conseguirmos manipular os dados no banco.

 - dentro da pasta models criamos um arquivo chamado Users.js


 OBS: por convenção é recomendável utilizar a primeira letra maiuscula ná hora de criar models.


 - dentro do arquivo users.js importamos o Model do sequelize, da seguinte forma:

  import {Model} from 'sequelize;


 - criamos uma classe User que extende o Model:

  class User extends Model


 - dentro do model definimos um método estático chamado init(sequelize). Esse método é chamado automáticamente com o sequelize.

 class User extends Mode {
   static.init(sequelize)
 }


  - após criarmos o método static,  chamamos a classe pai  através de super.init(),


  class User extends Mode {
    static.init(sequelize){
      super.init()
    }
  }


 - como primeiro parametro do método super.init, iremos passar através de um objeto as colunas  que teremos dentro da nossa base de dados. Nesa etapa, podemos ignorar tudo o que for chave primária, chave estrangeira e também timestamps. Colocaremos apenas as colunas que realmente serão cadastradas pelo usuário. Para fazer isso precisamos importar também  o Sequelize de dentro do pacote 'sequelize'. Esse Sequelize importado passaremos como segundo parametro do método super.init().


 No final de todo o processo, exportamos a classe User para utilizá-la em  etapas futuras.

 import Sequelize,  {Model} from 'sequelize;



eX.:


import { Sequelize, Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;



6 - depois de criar o model, precisamos criar um arquivo que vai realizar a conexão com o nosso banco de dados definido lá no config - database.js e também fazer com que esse arquivo carregue todos os models que existirem na aplicação, para que todo o nosso sistema conheca os models.  A conexão do banco de dados será feita da seguinte forma:


 - dentro da pasta database, criamos um arquivo chamado index.js (esse é o arquivo responsável por tudo)


  - dentro do arquivo importamos o sequelize.

   - criamos uma classe chamada Database

    - criamos um método chamado constructor() - esse método será responsável por


     - criamos um método chamado init() - esse método será responsável por  fazer a conexão com a base de dados e exportar os nossos módulos.


   -dentro do constructor chamados o próprio método init()

   EX.: constructor(){
     this.init
   }


    - dentro do método init  instanciamos uma variável connection, que recebe new Sequelize().

    EX.: init(){
      this.connection = new Sequelize()
    }


     - após fazer isso precisamos importar a nossa configuração do banco de dados, que está lá na pasta config:


     import databaseConfig from '../config/database';



   - passamos o databaseConfig como parametro  da variável this.connection.


   Ex.:  this.connection = new Sequelize(databaseConfig);

  Dessa forma, o this.connection passa a ter a conexão com a base de dados.



 depois disso, precisamos fazer com que o nosso arquivo de conexão acesse todos os models que tivermos na aplicação. Para isso, iremos importar dentro do nosso arquivo index.js TODOS os models que tivermos na nossa aplicação, e salvá-los dentro de um array.


 Ex.:


 import User from '../app/models/user';

 const models = [User]




depois disso (dentro do init), iremos percorrer este array,  e chamar todos os métodos init dentro de cada model que tivermos,, passando a nossa começão como parametro, da seguinte forma.




init() {
  this.connection = new Sequelize(databaseConfig);

  models.map(model => model.init(this.connection));

}


export default new Database;




Depois de criar o nosso arquivo de conexão com o banco, precisamos chamar esse arquivo em algum lugar. Para isso podemos ir no nosso app.js e importálo lá (lembre-se que o app é o arquivo em que configuramos o nosso servidor, middlewares e rotas).


import './database';



Após fazer isso podemos ir nas nossas rotas e realizar um teste para ver se a conexão com o banco está funcionando. Para isso, importamos o nosso model nas rotas (lembrando que depois isso irá para o controller) e criamos uma rota get para cadastro dos dados. Lembre-se que o processo de cadastro no banco é assincrono, então temos que usar async / await.




routes.get('/', asyn(req, res) =>{
  const user = await User.creae({
    name: 'Daniel Vieira',
    email: 'daniel@mail.com',
    password_hash: '1234567678,
  });

  return res.json(user);
})


depois disso é só iniciar o servidor e entrar no local host para ver se o usuário vai ser cadastrado.






=========================== JWT ===========================


Jason Web Token - é uma forma de autenticação que utilizamos em API'S Rest's



POST http://api.com/sessions


{
  email: daniel@mail.com
  password: 123456
}


 - vai até o banco  e verifica se tudo está correto


  - se tudo estiver ok gera um token jwt (geramos o token através de uma biblioteca).



  cada parte do token tem um significado:

   - Headers (primeira parte do código, vai até o primeiro ponto) - são informações que definem qual que é o tipo de token que fora gerado.


   - Payload (segunda parte do hash, vai do primeiro ponto até o segundo) - contem informações do usuário (não podemos armazenar informações sensíveis) para depois utilizarmos ela de alguma forma.



    - Assinatura do Token - é o que garante que o token não foi modificado externamente por um outro usuário.




