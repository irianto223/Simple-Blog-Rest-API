import { Router } from 'express';
import UserController from '../controllers/user-controller';

class UserRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  protected routes(): void {
    this.router.get('/', UserController.list);
    this.router.get('/:id', UserController.detail);
    this.router.post('/', UserController.create);
  }
}

export default UserRoute
