import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../helpers/response';
import { verifyToken } from '../helpers/auth';
const { User, Role, Access } = require('../models');

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  const { authorization } = req. headers;
  if (!authorization) {
    return errorResponse(res, 401, 'not authenticated');
  }

  try {
    const token = authorization.split(' ')[1]
    req.token = verifyToken(token, process?.env?.JWT_SECRET ?? '');
    next();
  } catch(err: any) {
    return errorResponse(res, 400, 'invalid token');
  }
}

export const checkRoles = (allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // rules.some(r => myRoles.includes(r))
  const { authorization } = req. headers;
  try {
    const token = authorization?.split(' ')[1] ?? '';
    const decodedToken = verifyToken(token, process?.env?.JWT_SECRET ?? '');
    
    const user = await User.findByPk(decodedToken.id, { include: [Role, Access] });

    const userRoles: string[] = user.Roles.map((d: any) => d.name);
    const isValid = allowedRoles.some((a: string) => userRoles.includes(a));

    if (!isValid) {
      return errorResponse(res, 401, 'not authorized');
    }
    next();
  } catch(err: any) {
    return errorResponse(res, 400, 'invalid token');
  }
}

export const checkAccesses = (allowedAccesses: string[]) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { authorization } = req. headers;
  try {
    const token = authorization?.split(' ')[1] ?? '';
    const decodedToken = verifyToken(token, process?.env?.JWT_SECRET ?? '');

    const user = await User.findByPk(decodedToken.id, { include: [Role, Access] });

    const userAccesses: string[] = user.Accesses.map((d: any) => d.name);
    const isValid = allowedAccesses.some((a: string) => userAccesses.includes(a));

    if (!isValid) {
      return errorResponse(res, 401, 'access forbidden');
    }
    next();
  } catch(err: any) {
    return errorResponse(res, 400, 'invalid token');
  }
}
