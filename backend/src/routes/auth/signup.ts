import express, {
  Request as IRequest,
  Response as IResponse,
  NextFunction,
} from 'express';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

import { body } from 'express-validator';
import { BadRequestError } from './../errors/bad-request-error'
import { validateRequest } from './../middlewares/validate-request'

// https://express-validator.github.io/docs/sanitization.html
import { UserModel } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  function (req: IRequest, res: IResponse, next: NextFunction) {
    console.log('收到的req.body:');
    console.log(req.body);
    next();
  },
  // middleware #1 檢查req.body的註冊內容
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],

  validateRequest,
  // middleware #2 檢查req.body的註冊內容
  async (req: IRequest, res: IResponse) => {
    console.log(
      `\n (${dayjs().format()}) 接收含有註冊資訊的req.body: \n`,
      req.body
    );
    const { email, password } = req.body;

    // 檢查是否已經被註冊
    const existingUser = await UserModel.findOne({
      email: email,
    });
    if (existingUser) {
      throw new BadRequestError('Email is taken');
    }

    // 開始建立新使用者資料
    const newUser = UserModel.buildNewUser({
      email,
      password,
    });
    // console.log('Registration data verified. New user created: ', newUser);
    await newUser.save();

    // 生成 JWT
    // console.log('process.env.JWT_SECRET: ', process.env.JWT_SECRET);
    const jwToken = jwt.sign(
      {
        // arg#1
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET! // arg#2 (加上!取消TS的檢查，已經在index.ts 的 startServiceAndDB function裡面進行檢查)
    );

    // console.log('jwt:\n', jwToken);

    req.session = { jwt: jwToken }; // 需要以物件的資料型別將jwToken存在session
    // https://www.base64decode.org/

    // 將 JWT 存在 session

    res.status(201).send(newUser);
  }
);

export { router as signupRouter };
