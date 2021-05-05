

import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator';
//@ts-ignore
import CustomError from './customError';


const checkReqBodyErrors = (
  req: Request, res: Response, next: NextFunction
) => {
  // console.log('validating error from post request now:');
  // console.log('req.body: ', req.body);

  const errors = validationResult(req);
  const errorLocation: string = req.originalUrl;
  let extractedErrors: any[] = [];

  if (!errors.isEmpty()) {
    // console.log('found error: ', errorsArray);
    errors.array().forEach(err => {
      console.log('err: ', err);
      extractedErrors.push(
        err
        // {
        // value: err.value,
        // msg: err.msg,
        // param: err.param,
        // location: err.location
        // }
      )
    }
    );

    const error = new CustomError(extractedErrors, 400,
      {
        errorLocation: errorLocation,
        errorParam: '',
        errorValue: ''
      });
    console.log('found error: \n', error);
    return res.status(400).json(error);
  }
  next();
};

export default checkReqBodyErrors;