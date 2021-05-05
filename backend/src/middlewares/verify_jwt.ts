import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUserPayload {
  id: string;
  email: string;
}

// 在Express package 中擴充 Request interface 的 內容.
declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  if (
    // !req.session || !req.session.jwt
    // !req.session?.jwt // 使用 TypeScript 的特殊 運算符號 "?"
    !req.cookies.jwtCookie // 使用 TypeScript 的特殊 運算符號 "?"

  ) {
    req.currentUser = null!;
    console.log('req.currentUser: ', req.currentUser);
    return next();
  }

  try {
    const payload = jwt.verify(
      // req.session.jwt,
      req.cookies.jwtCookie,
      process.env.JWT_SECRET!
      // 已經在 index.ts 檢查 process.env.JWT_SECRET 是否存在
    ) as IUserPayload;
    // 使用IUserPayload 建立並規範 payload 物件的屬性

    req.currentUser = payload;
    // 將 req 物件新增子物件 currentUser
    // 但是會引起 TypeScript 需要檢查子物件的型別
    // 所以要在更高一層的global環境中擴充 Request 的interface 內容
  } catch (err) {
    console.log(err);
  }

  next();
};
