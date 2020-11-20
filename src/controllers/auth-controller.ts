import { Request, Response } from 'express';

class AuthController {

  login(_: Request, res: Response): Response {
    return res.send('Login OK');
  }

  register(_: Request, res: Response): Response {
    return res.send('Register OK');
  }

}

export default new AuthController();
