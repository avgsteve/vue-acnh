import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    // 如果 req.currentUser 是null
    // 就攔截 req 並回傳錯誤訊息
    throw new NotAuthorizedError();
  }
  
  next();
};
