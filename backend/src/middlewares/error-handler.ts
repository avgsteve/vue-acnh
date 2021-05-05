import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  // 在 TypeScript 要透過 Interface 指定參數的型別
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*
    一開始的做法: 
    if (err instanceof RequestValidationError) {    
    
    const formatterErrors = err.errors.map(err=>{
      return {message: err.msg, field: err.param};
    });

    return res.status(400)
              .send({errors: formatterErrors});
    }


    if (err instanceof DatabaseConnectionError) {    
    
    return res.status(500)
              .send({ errors: [{err.reason}]  });
    }

  */

  // 後來改進的作法
  // 如果 err 是透過 CustomError Class 產生的話就傳出自訂錯誤，
  // 提示使用者錯誤的內容

  // 好處是可以透過確定是 CustomError 的實例和 CustomError 的 abstract 屬性 & 方法，就可以確保每個傳進來的err都有 statusCode 屬性 跟 serializeErrors 方法

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode) // ex: 404
      .send({ errors: err.serializeErrors() });
  }

  // 如果無法確定是何種錯誤，就傳出一般通用的錯誤訊息
  console.log(`發生 CustomError以外的錯誤:\n`, err);

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
