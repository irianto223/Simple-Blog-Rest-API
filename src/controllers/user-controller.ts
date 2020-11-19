import { Request, Response } from 'express';

class UserController {
  static list(_: Request, res: Response): void {
    res.send('GET /users OK');
  }

  static detail(req: Request, res: Response): void {
    res.send(req.params);
  }

  static create(req: Request, res: Response): void {
    res.send(req.body);
    // res.send('POST /users OK');
  }
}

export default UserController;
