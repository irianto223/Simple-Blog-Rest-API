import AuthController from '../controllers/auth-controller';
import BaseRoutes from './base-routes';

class AuthRoutes extends BaseRoutes {
  routes(): void {
    this.router.post('/', AuthController.login);
    this.router.post('/register', AuthController.register);
  }
}

export default new AuthRoutes().router;
