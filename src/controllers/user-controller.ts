import { Request, Response } from 'express';
import IController from './controller-interface';
import { successResponse, errorResponse, notFoundResponse } from '../helpers/response';
const { User, Role, Access, UserAccess } = require('../models');

class UserController implements IController {

  list(_: Request, res: Response): void {
    User.findAll()
      .then((result: any) => {
        return successResponse(res, 200, 'success', result);
      })
      .catch((error: any) => {
        return errorResponse(res, 400, error.message || undefined, error);
      });
  }

  detail(req: Request, res: Response): void {

    const { id } = req.params;

    User.findByPk(id, { include: [Role, Access] })
      .then((result: any) => {
        return successResponse(res, 200, 'success', result);
      })
      .catch((error: any) => {
        return errorResponse(res, 400, error.message || undefined, error);
      });
  }

  create(req: Request, res: Response): void {
    res.send('not implemented');
  }

  update(req: Request, res: Response): void {
    res.send('not implemented');
  }

  delete(req: Request, res: Response): void {
    res.send('not implemented');
  }

  deleteAccess(req: Request, res: Response): void {
    const { id, accessId } = req.params;

    UserAccess.destroy({ where: { userId: id, accessId } })
      .then((result: any) => {
        return successResponse(res, 200, 'access deleted', result);
      })
      .catch((error: any) => {
        return errorResponse(res, 400, error.message || undefined, error);
      });
  }

  addAccess(req: Request, res: Response): void {
    const { id } = req.params;
    const { accessId } = req.body;

    UserAccess.create({ userId: id, accessId })
      .then((result: any) => {
        return successResponse(res, 200, 'access added', result);
      })
      .catch((error: any) => {
        return errorResponse(res, 400, error.message || undefined, error);
      });
  }

}

export default new UserController();
