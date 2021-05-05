require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
import User from './../../database/schemas/UserSchema';
import CustomError from './../errorHandlers/customError';
import jwt from 'jsonwebtoken';
import sendResponseWithToken from './sendResWithToken';
import { IUserDocProperties } from './../../database/schemas/UserSchema';

import { promisify } from "util";
import { OAuth2Client } from "google-auth-library";
const keys = require("./oauth2.keys.json");



export async function signup(req: Request, res: Response) {
  let { email, password } = req.body;

  if (!email || !password) {
    return sendLoginError("User name or password can't be empty", req, res);
  }

  try {

    let newUser = User.buildNewUser({
      email: email,
      password: password
    })

    newUser.save(function (err, user) {
      if (err)
        return res.status(400).send(new CustomError("User has been registered!", 400));
      res.send('User ' + user.email + ' successfully created!');
    });

    // console.log('newUser: ', newUser);
    // res.send(newUser);

  } catch (error) {
    console.log('register error: ', error);
    let errorMessage = "error while signing up new user"
    if (error.code === 11000) errorMessage = "email has been registered";
    return sendLoginError(errorMessage, req, res);
  }

};

export async function authByGoogleOAuth(req: Request, res: Response) {
  let { idToken } = req.body;

  const oauthClient = new OAuth2Client(
    keys.web.client_id,
    keys.web.client_secret,
    keys.web.redirect_uris[0]
  );


  try {
    // result from Google OAuth
    const verificationResult: any = await oauthClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });


    // User's data from Google OAuth
    const {
      email_verified, // Boolean
      name,
      email,
      picture, // user's profile photo on Google
    } = verificationResult.payload;

    console.log("User data from Google OAuth: \n", verificationResult.payload);

    console.log({
      email_verified, // Boolean
      name,
      email,
      picture,
    });

    console.log({ payload: verificationResult.payload });

    if (email_verified) {
      console.log(
        "\nUser has been verified by Google OAuth, checking if user document exists...\n"
      );

      const existingUser = await User.findOne({
        email: email
      });

      if (!existingUser) {
        const newUser = User.buildNewUser({
          email: email,
          password: null,
          nickName: name,
        })

        newUser.oauthAccounts.google = {
          registered: true,
          email: email,
          picture: picture,
          name: name
        }


        newUser.save(function (err, user) {
          if (err)
            return res.status(400).send(new CustomError("Can't register user with this email!", 400));
          // return res.send('User ' + user.email + ' successfully created!');


          const userDataWithSelectedFields = {
            _id: user._id,
            email: user.email,
            nickName: user.nickName
          }

          console.log("userDataWithSelectedFields:", userDataWithSelectedFields);

          //@ts-ignore
          return sendResponseWithToken(userDataWithSelectedFields, 200, req, res);

        });
      }

      if (existingUser) {

        const userDataWithSelectedFields = {
          _id: existingUser._id,
          email: existingUser.email,
          nickName: existingUser.nickName
        }

        //@ts-ignore
        return sendResponseWithToken(userDataWithSelectedFields, 200, req, res);
        // return res.status(400).send(new CustomError("User has been registered!", 400));
      }

    }

    if (!email_verified)
      return res.status(400).send(new CustomError("User's email can't be verified by Google OAuth"));


    // console.log('There\'s no verified email from Google OAuth serve');
  } catch (error) {
    console.log("\n=> Error log from Google OAuth", error);
    const err = new CustomError("Error while signup with Google", 400)
    res.send(err)

  }
};


export async function login(req: Request, res: Response) {
  let { email, password } = req.body;

  console.log({ email, password });

  if (!email || !password) {
    return sendLoginError("User name or password can't be empty", req, res);
  }

  try {

    let userExisted = await User.findOne({
      $or: [
        // { nickName: account },
        { email: email }
      ]
    }).select('hashed_password _id');

    console.log('userExisted:', userExisted);

    // 找不到帳號 (帳號不存在)
    if (!userExisted) {
      return sendLoginError(`incorrect account or password;`, req, res);
    }

    console.log('userExisted: \n', userExisted);

    if ((await userExisted.verifyPassword(password)) === true) {
      userExisted.hashed_password = '---encrypted---';
      return sendResponseWithToken(userExisted, 200, req, res);
    }
    // 密碼 or 帳號錯誤
    return sendLoginError(`incorrect account or password`, req, res);

  } catch (error) {
    console.log('登入錯誤: ', error);
    return sendLoginError("error while logging in", req, res);
  }

};

export function logout(req: Request, res: Response, next: NextFunction) {

  if (res.locals.user) res.locals.user = null;

  if (req.session) {
    req.session.destroy(() => {
      // res.redirect("/login");
    });
  }

  res.cookie("jwtCookie", "loggedOut", {
    expires: new Date(Date.now() + 1),
    httpOnly: true,
  });

  //
  res.status(200).json({
    status: "OK",
    responseMessage: "Cookie for logging out user has been sent!",
  });
}

const sendLoginError = (errorMessage: string, req: Request, res: Response) => {
  let error = new CustomError(errorMessage, 400, {
    errorLocation: req.originalUrl || '/login',
    errorParam: "login api",
    errorValue: req.body,
  });
  return res.status(400).json(error);
};

// ========== Check if use is logged in ===========
// Will get cookie for token & query a user document then save it to res.locals.user as locals variable for .pug files
// exports.checkIfUserIsLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
//   // console.log('checkIfUserIsLoggedIn');
//   // console.log('req.cookies:', req.cookies);
//   if (req.cookies && req.cookies.jwtCookie) {

//     const jwtSecret: string = process.env.JWT_SECRET ?? 'env is not defined'

//     try {
//       const decodedDataFromToken = await promisify(jwt.verify)(
//         req.cookies.jwtCookie,
//         jwtSecret
//       );

//       // console.log('decodedDataFromToken: ', decodedDataFromToken);
//       const currentUser = await User.findById(decodedDataFromToken.id);


//       if (!currentUser) {
//         return next();
//       }

//       const processedUserData = currentUser.toObject();
//       delete processedUserData.hashed_password;
//       delete processedUserData.salt;

//       res.locals.user = processedUserData;

//       return next();
//     } catch (error) {
//       console.log('error while getting and verifying cookie', error);
//       res.locals.user = "";
//       return next();
//     }
//   }
//   console.log("\njwtCookie not found in req.cookies");
//   next();
// };


exports.restrictToSignedInUser = async (req: Request, res: Response, next: NextFunction) => {
  // console.log('res.locals in restrictToSignedInUser: ', res.locals);

  try {

    if (res.locals.user === undefined || !res.locals.user._id === undefined) {
      let ip: string = (
        req.ip as string || // for express only
        req.headers['x-forwarded-for'] as string ||
        req.connection.remoteAddress as string || "(can't get ip from current user)"
      ).split(',')[0].trim();

      console.log('unauthorized access from ip: ', ip);
      console.log('req.headers: ', req.headers);

      if (req.originalUrl.includes('api'))
        return res
          .status(401)
          .send(new CustomError("Please sign in to use this API", 401));

      return res.redirect('/');

    }

    // when all clear
    next();

  } catch (error) {
    console.log('error in restrictToSignedInUser middleware:', error);
  }

};


