import express, { Application, Request, Response } from 'express';
import IndexRoute from './routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.applyMiddleware();
    this.routes();
  }

  protected applyMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected routes(): void {
    this.app.use(new IndexRoute().router);
  }
}

const port: number = 5000;
const app = new App().app;

app.listen(port, () => {
  console.log('App run on port:', port)
});
