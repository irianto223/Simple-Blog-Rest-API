import { Request, Response } from 'express';
import IController from './controller-interface';
import { successResponse, errorResponse, notFoundResponse } from '../helpers/response';
const { User, Role, Access } = require('../models');

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
    res.send('CREATE user OK');
  }

  update(req: Request, res: Response): void {
    res.send('UPDATE user OK');
  }

  delete(req: Request, res: Response): void {
    res.send('DELETE user OK');
  }

}

export default new UserController();
