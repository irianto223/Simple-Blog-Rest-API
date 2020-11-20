import { Request, Response } from 'express';
import { successResponse, errorResponse, notFoundResponse } from '../helpers/response';
import { comparePassword, createToken } from '../helpers/auth';
const { User, Role, UserRole, Access, UserAccess } = require('../models');

class AuthController {

  login(req: Request, res: Response): void {

    const { authorization } = req.headers;
    const decoded = Buffer.from(authorization?.split(' ')[1] ?? '', 'base64').toString('ascii');
    const email = decoded.split(':')[0]
    const password = decoded.split(':')[1]

    User.findOne({ where: { email }, include: [Role, Access] })
      .then((result: any) => {
        if (!result) {
          return errorResponse(res, 400, 'email not registered');
        }
        
        if (!comparePassword(password, result.password)) {
          return errorResponse(res, 403, 'wrong password');
        }

        const payload = {
          id: result.id,
          fullName: result.fullName,
          email: result.email,
          gender: result.gender,
          Roles: result.Roles,
          Accesses: result.Accesses
        }

        const token: string = createToken(payload, process?.env?.JWT_SECRET ?? '');
        
        return successResponse(res, 200, 'login success', {
          token,
          data: payload
        });
      })
      .catch((err: any) => {
        return errorResponse(res, 500, err.message || undefined, err);
      });
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
