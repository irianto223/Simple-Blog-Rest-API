import userController from '../controllers/user-controller';
import BaseRoutes from './base-routes';

class UserRoutes extends BaseRoutes {
  routes(): void {
    this.router.get('/', userController.list);
    this.router.get('/:id', userController.detail);
    this.router.post('/', userController.create);
    this.router.put('/:id', userController.update);
    this.router.delete('/:id', userController.delete);
  }
}

export default new UserRoutes().router;
