import userController from '../controllers/user-controller';
import BaseRoutes from './base-routes';
import { checkRoles, checkAccesses, auth } from '../middlewares/auth-middleware';
import { ROLES } from '../shared/constant';

class UserRoutes extends BaseRoutes {
  routes(): void {
    this.router.get('/', checkRoles([ROLES.SystemAdmin]), userController.list);
    this.router.get('/:id', userController.detail);
    this.router.post('/', userController.create);
    this.router.put('/:id', userController.update);
    this.router.put('/:id/accesses', auth, checkRoles([ROLES.SystemAdmin]), userController.addAccess);
    this.router.delete('/:id', userController.delete);
    this.router.delete('/:id/accesses/:accessId', auth, checkRoles([ROLES.SystemAdmin]), userController.deleteAccess);
  }
}

export default new UserRoutes().router;
