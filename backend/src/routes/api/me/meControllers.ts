require('dotenv').config();

import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
import User from '../../../database/schemas/UserSchema';
import ListData from '../../../database/schemas/ListDataSchema';
import { INewUserAttributes } from '../../../database/schemas/UserSchema';

import CustomError from '../../errorHandlers/customError';
import chalk from 'chalk'


function send400ResWithError(errMsg: string, res: Response) {
  if (!errMsg || !res) throw Error('need errMsg and res');
  let error = new CustomError(errMsg, 400);
  res.status(400).send(error);
}

export async function getMyInfo(req: Request, res: Response) {
  if (!req.currentUser)
    return send400ResWithError("Need login to fetch user's own data", res)
  const userDocument = await User.find({
    _id: req.currentUser.id
  })

  if (!userDocument || userDocument.length === 0)
    return send400ResWithError("User document not found", res)

  res.send(userDocument)
};


export async function addListData(req: Request, res: Response) {
  if (!req.currentUser)
    return send400ResWithError("Need login to fetch user's own data", res)
  const userDocument = await User.find({
    _id: req.currentUser.id
  })

  if (!userDocument || userDocument.length === 0)
    return send400ResWithError("User document not found", res)

  const listData = req.body.listData


  if (!listData)
    return send400ResWithError("listData not found", res)

  const userId = mongoose.Types.ObjectId(req.currentUser.id);
  const userNickName = userDocument[0].nickName;
  console.log('userNickName: ', userNickName);

  // 建立或是修改目前的list data
  //@ts-ignore
  const updatedListData = await ListData.findOneAndUpdate(
    {
      //@ts-ignore
      owner: userId,
    },
    {
      owner: userId,
      //@ts-ignore
      ownerName: userNickName || null,
      listData: JSON.parse(listData),
    },
    {
      upsert: true,
      new: true
    }
  )
  // res.send(userDocument)
  res.send(updatedListData)
};


export async function getListData(req: Request, res: Response) {
  if (!req.currentUser)
    return res.send(null)

  let userDocument = await User.find({
    _id: req.currentUser.id
  })

  if (!userDocument || userDocument.length === 0)
    return send400ResWithError("User document not found", res)

  const userId = mongoose.Types.ObjectId(req.currentUser.id);

  //@ts-ignore
  let updatedListData = await ListData.findOne({
    owner: userId
  })

  console.log('找到的 updatedListData:', updatedListData);
  userDocument = userDocument[0].toObject();
  // 將 查詢到的list data 加到要傳到前端的資料裡面
  //@ts-ignore
  userDocument.listData = updatedListData

  res.send(userDocument)
};
