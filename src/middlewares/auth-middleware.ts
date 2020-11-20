import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../helpers/response';
import { verifyToken } from '../helpers/auth';

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

export const checkRoles = (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction): any => {
  // rules.some(r => myRoles.includes(r))
  const { authorization } = req. headers;
  try {
    const token = authorization?.split(' ')[1] ?? '';
    const decodedToken = verifyToken(token, process?.env?.JWT_SECRET ?? '');

    const userRoles: string[] = decodedToken.Roles.map((d: any) => d.name);
    const isValid = allowedRoles.some((a: string) => userRoles.includes(a));

    if (!isValid) {
      return errorResponse(res, 401, 'not authorized');
    }
    next();
  } catch(err: any) {
    return errorResponse(res, 400, 'invalid token');
  }
}

export const checkAccesses = (allowedAccesses: string[]) => (req: Request, res: Response, next: NextFunction): any => {
  const { authorization } = req. headers;
  try {
    const token = authorization?.split(' ')[1] ?? '';
    const decodedToken = verifyToken(token, process?.env?.JWT_SECRET ?? '');

    const userAccesses: string[] = decodedToken.Accesses.map((d: any) => d.name);
    const isValid = allowedAccesses.some((a: string) => userAccesses.includes(a));

    if (!isValid) {
      return errorResponse(res, 401, 'access forbidden');
    }
    next();
  } catch(err: any) {
    return errorResponse(res, 400, 'invalid token');
  }
}
