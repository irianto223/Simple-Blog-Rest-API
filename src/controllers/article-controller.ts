import { Request, Response } from 'express';
import IController from './controller-interface';
import { successResponse, errorResponse } from '../helpers/response';
const { Article } = require('../models');

class ArticleController implements IController {

  list(_: Request, res: Response): void {
    Article.findAll()
      .then((result: any) => {
        return successResponse(res, 200, undefined, result);
      })
      .catch((err: any) => {
        return errorResponse(res, 400, err.message || undefined, err);
      });
  }

  detail(req: Request, res: Response): void {
    const { id } = req.params;
    Article.findByPk(id)
      .then((result: any) => {
        return successResponse(res, 200, undefined, result);
      })
      .catch((err: any) => {
        return errorResponse(res, 400, err.message || undefined, err);
      });
  }

  create(req: Request, res: Response): void {
    const { title, body } = req.body;
    const { token } = req;

    Article.create({ userId: token.id, title, body })
      .then((result: any) => {
        return successResponse(res, 201, 'article created', result);
      })
      .catch((err: any) => {
        return errorResponse(res, 400, err.message || undefined, err);
      });
  }

  update(req: Request, res: Response): void {
    const { title, body } = req.body;
    const { id } = req.params;

    Article.update({ title, body }, { where: { id } })
      .then((result: any) => {
        return successResponse(res, 204, 'article updated', result);
      })
      .catch((err: any) => {
        return errorResponse(res, 400, err.message || undefined, err);
      });
  }

  delete(req: Request, res: Response): void {
    res.send('DELETE article OK');
  }

}

export default new ArticleController();
