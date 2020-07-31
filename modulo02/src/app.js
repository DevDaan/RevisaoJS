import express from 'express';
import routes from './routes';

class App {
  // constructors iniciam automaticamente quando a classe é chamada
  constructor() {
    // é a mesma coisa que app = express()
    this.server = express();

    this.middlewares();

    this.routes();
  }

  // Aqui vão todos os middlewares da aplicação

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
