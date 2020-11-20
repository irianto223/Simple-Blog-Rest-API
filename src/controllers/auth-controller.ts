import { Request, Response } from 'express';
import { successResponse, errorResponse, notFoundResponse } from '../helpers/response';
const { User, Role, UserRole, Access, UserAccess } = require('../models');

class AuthController {

  login(_: Request, res: Response): void {
    res.send('Login OK');
  }

  register(req: Request, res: Response): void {
    
    const { fullName, email, password, gender } = req.body;

    Role.findOne({ where:{ name: 'Account' }, include: [Access]})
      .then(async (role: any) => {
        
        const createdUser = await User.create({ fullName, email, password, gender })
        console.log(role)
        role.Accesses.forEach((d: any) => {
          UserAccess.create({ userId: createdUser.id, accessId: d.id });
        });
        
        if (!role) {
          const createdRole = await Role.create({ name: 'Account' });
          return { user: createdUser, role: createdRole };
        }

        return { user: createdUser, role };
      })
      .then((result: any) => {
        return UserRole.create({ userId: result.user.id, roleId: result.role.id });
      })
      .then((result: any) => {
        return successResponse(res, 201, 'register success', result);
      })
      .catch((error: any) => {
        return errorResponse(res, 400, error.message || undefined, error);
      });
  }

}

export default new AuthController();
