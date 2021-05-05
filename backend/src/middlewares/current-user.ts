import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const currentUser = function (
  req: Request,
  res: Response,
  next: NextFunction
) {

  console.log('currentUser called');

  if (!req.cookies.jwtCookie) {
    console.log('no cookie from current visitor');
    return next();
  }

  try {
    const payload = jwt.verify(
      req.cookies.jwtCookie,
      process.env.JWT_SECRET!
    ) as UserPayload;
    req.currentUser = payload;
    console.log('payload: ', payload);
  } catch (err) {}

  next();
};

export default currentUser;