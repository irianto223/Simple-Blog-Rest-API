import { Router } from 'express';
import UserRoute from './user-route';

class IndexRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  protected routes(): void {
    this.router.use('/api/v1/users', new UserRoute().router);
  }
}

export default IndexRoute
