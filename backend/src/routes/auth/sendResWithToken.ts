import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { IUserDocProperties } from './../../database/schemas/UserSchema'

require('dotenv').config();
// @ts-ignore
const jwtSecret: string = process.env.JWT_SECRET;

const signToken = (document_id: string) => {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  return jwt.sign(
    {
      id: document_id, // this is MongoDB's document _id
    },
    jwtSecret,
    {
      // 3) third argument: expiry time (current setting: 90days)
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

// Sign a token, set cookie and send HTTP response for processed user document
function sendResponseWithToken(user: IUserDocProperties, statusCode: number, req: Request, res: Response) {
  console.log('sendResponseWithToken裡面的 user:', user);

  const tokenAsPayload = signToken(user._id);
  const jwtTimeToExpire: number = parseInt(<string>process.env.JWT_COOKIE_EXPIRES_IN, 10) || 1000;

  res.cookie(
    // ref: http://expressjs.com/en/5x/api.html#res.cookie
    "jwtCookie", // cookie name
    tokenAsPayload, // cookie payload
    {
      // options
      expires: new Date(
        // Option: expires . Set expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
        Date.now() + jwtTimeToExpire * 60 * 60 * 24 * 10 // default is one second and turn it to 10 days
      ),
      httpOnly: true,
      sameSite: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    }
  );

  user.tokenIsValidUntil = new Date(
    // Option: expires . Set expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
    Date.now() + jwtTimeToExpire * 60 * 60 * 24 * 10 // default is one second and turn it to 10 days
  )

  res.status(statusCode).send(user);
};

export default sendResponseWithToken;


