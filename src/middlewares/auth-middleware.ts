import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../helpers/response';
import { verifyToken } from '../helpers/auth';
import { ACCESSES } from '../shared/constant';
const { User, Role, Access, Article } = require('../models');

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

export const articleOwnerOrArticleAdminUpdate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { authorization } = req. headers;
  const { id } = req.params;

  try {
    const token = authorization?.split(' ')[1] ?? '';
    const decodedToken = verifyToken(token, process?.env?.JWT_SECRET ?? '');

    const article = await Article.findByPk(id);
    const user = await User.findByPk(decodedToken.id, { include: [Access] });

    const userAccesses: string[] = user.Accesses.map((d: any) => d.name);

    // kalo datanya tidak ada
    if(!article) {
      return errorResponse(res, 404, 'article not found');
    }

    // kalo punya akses ArticleAdminUpdate, LANJUT
    if (userAccesses.includes(ACCESSES.ArticleAdminUpdate)) {
      return next()
    }

    // kalo bukan yang punya data
    if (decodedToken.id != article.userId) {
      return errorResponse(res, 401, 'not owner');
    }

    next();
  } catch(err: any) {
    return errorResponse(res, 400, 'invalid token');
  }
}
