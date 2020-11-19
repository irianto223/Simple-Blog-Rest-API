import { Request, Response } from 'express';
import ControllerInterface from './controller-interface';

class UserController implements ControllerInterface {

  list(_: Request, res: Response): Response {
    return res.send('GET users OK');
  }

  detail(req: Request, res: Response): Response {
    return res.send('GET detail user OK');
  }

  create(req: Request, res: Response): Response {
    return res.send('CREATE user OK');
  }

  update(req: Request, res: Response): Response {
    return res.send('UPDATE user OK');
  }

  delete(req: Request, res: Response): Response {
    return res.send('DELETE user OK');
  }

}

export default new UserController();
