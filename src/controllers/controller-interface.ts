import { Request, Response } from 'express';

interface ControllerInterface {
  list(req: Request, res: Response): Response;
  detail(req: Request, res: Response): Response;
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  delete(req: Request, res: Response): Response;
}

export default ControllerInterface;
