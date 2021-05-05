require('dotenv').config();
import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
import User from './../../../database/schemas/UserSchema';
import { INewUserAttributes } from './../../../database/schemas/UserSchema';

import CustomError from './../../errorHandlers/customError';
import chalk from 'chalk'


function send400ResWithError(errMsg: string, res: Response) {
  if (!errMsg || !res) throw Error('need errMsg and res');
  let error = new CustomError(errMsg, 400);
  res.status(400).send(error);
}

export async function getUserById(req: Request, res: Response) {
  if (!req.params.userId)
    return send400ResWithError('Please use user id for this api', res)

  const userId = req.params.userId;

  if (!mongoose.isValidObjectId(userId))
    return send400ResWithError('user id is not valid MongoDB _id format', res)

  let user = await User.findOne({
    _id: userId
  })

  if (!user)
    return send400ResWithError('User not found', res)

  res.send(user);

};


export async function register(req: Request, res: Response) {
  //   interface RegisterData {
  //   email:string,
  // }
  const registerData = req.body;
  const { email, password }: INewUserAttributes = registerData

  console.log(
    chalk.yellowBright('register, email: '), email
  );

  if (!registerData)
    return send400ResWithError('Incorrect register data not found', res)

  let existingUser = await User.findOne({
    email: email
  })


  if (!existingUser) {

    let newUser = User.buildNewUser({
      email: email,
      password: password
    })
    await newUser.save();

    return res.send(newUser)
  }



  return res.status(400).send('User has been registered');

};


