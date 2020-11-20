import { Request, Response } from 'express';
import IController from './controller-interface';

class ArticleController implements IController {

  list(_: Request, res: Response): Response {
    return res.send('GET articles OK');
  }

  detail(req: Request, res: Response): Response {
    return res.send('GET detail article OK');
  }

  create(req: Request, res: Response): Response {
    return res.send('CREATE article OK');
  }

  update(req: Request, res: Response): Response {
    return res.send('UPDATE article OK');
  }

  delete(req: Request, res: Response): Response {
    return res.send('DELETE article OK');
  }

}

export default new ArticleController();
