import { Response } from 'express';

export const successResponse = (res: Response, statusCode?: number, messsage?: string, data?: any): Response => {
  return res.status(statusCode || 200).json({ message: messsage || 'success', data });
}

export const errorResponse = (res: Response, statusCode?: number, messsage?: string, error?: any): Response => {
  return res.status(statusCode || 500).json({ message: messsage || 'unknown error', error });
}

export const notFoundResponse = (res: Response, messsage?: string): Response => {
  return res.status(404).json({ message: messsage || 'resources not found' });
}
