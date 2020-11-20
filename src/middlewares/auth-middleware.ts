import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  console.log('auth middleware run ...');
  next();
}
