import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import IndexRoute from './routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.applyMiddleware();
    this.routes();
    dotenv();
  }

  protected applyMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.use(new IndexRoute().router);
  }
}

const app = new App().app;

app.listen(process.env.PORT || 3000, () => {
  console.log(`App run on port: ${process.env.PORT || 3000}, in ${process.env.NODE_ENV} environment.`)
});
