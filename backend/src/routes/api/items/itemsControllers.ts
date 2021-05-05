require('dotenv').config();
import redis from "redis";
let redisPort: any = process.env.PORT_REDIS || 6379
const redisClient = redis.createClient(redisPort);
import fs from 'fs';
import path from 'path';
import Mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
import User from '../../../database/schemas/UserSchema';
import CustomError from '../../errorHandlers/customError';
import Item from './../../../models/Item'

function send400ResWithError(errMsg: string, res: Response) {
  if (!errMsg || !res) throw Error('need errMsg and res');
  let error = new CustomError(errMsg, 400);
  res.status(400).send(error);
}

export async function getAllData(req: Request, res: Response) {
  const filePath = path.join(__dirname, "./../../../database/items/item_all_translation_outputFromDB.json")

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    res.send(jsonData);
  });

  // const data = fs('')
  // res.send(filePath);
};


// const doc = await Item.find({
//   name: "cat nose"

export async function getDetailedData(req: Request, res: Response) {
  const q = req.query

  // 表示是 itemsPage 的查詢
  if (q.sourceSheet && q.tag) {
    console.log('req.query: ', req.query);
    let name: any = q.name;
    const doc = await Item.find({
      // "name": req.body.name
      sourceSheet: q.sourceSheet,
      tag: q.tag
    })
    console.log('doc: ', doc);
    return res.send(doc)
  }

  // 表示是 searchPage的查詢
  if (q.name) {
    let name: any = q.name;
    const doc = await Item.find({
      // "name": req.body.name
      "name": name
    })
    console.log('doc: ', doc);
    res.send(doc[0])
  }
};



export async function getAllDetailedData(req: Request, res: Response) {

  const filePath = path.join(__dirname, "./../../../database/animal-crossing data/all_items.json")

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    res.send(jsonData);
  });
};


export async function getAllCategories(req: Request, res: Response) {
  console.log('aggregation: getAllCategories:');
  const doc = await Item.aggregate([
    {
      $group: {
        _id: null,
        sourceSheet: { $addToSet: "$sourceSheet" }
      }
    }
  ])
  console.log('doc: ', doc);
  doc[0].sourceSheet = doc[0].sourceSheet.sort();
  res.send(doc[0])
};


export async function getTagByCategory(req: Request, res: Response) {
  const category = req.query.category
  console.log('aggregation: 查詢所有 sourceSheet (category) 為某個值的多個文件，其unique tags:');
  console.log('category: ', category);

  if (!category) return res.status(400);

  const doc = await Item.aggregate([
    {
      $match:
      {
        'sourceSheet': category
      }
    },
    {
      $group: {
        _id: null,
        tag: { $addToSet: "$tag" }
      }
    }
  ])
  console.log('以sourceSheet查詢符合文件中的tags: ', doc);
  res.send(doc[0])
};


export async function getAllTags(req: Request, res: Response) {
  console.log('aggregation: 查詢所有 tag fields 的 unique value:');
  const doc = await Item.aggregate([
    {
      $group: {
        _id: null,
        tag: { $addToSet: "$tag" }
      }
    },
  ])
  res.send(doc[0].tag)
};



export async function getFirstDocOfAllTags(req: Request, res: Response) {
  console.log('aggregation: 查詢category底下所有 tag fields 的 第一筆文件:');
  // https://stackoverflow.com/questions/16409719/can-i-get-first-document-not-field-in-mongodb-aggregate-query
  const doc = await Item.aggregate([
    {
      $match:
      {
        'sourceSheet': req.query.category
      }
    },
    {
      $group: {
        _id: "$tag",
        // tag: "$tag",
        tag: { $addToSet: "$tag" },
        first: { $first: "$$ROOT" }
      }
    },
    {
      // https://docs.mongodb.com/manual/reference/operator/aggregation/project/
      "$project": {
        "_id": 1,
        "tag": 1,
        "image": { $arrayElemAt: ["$first.variants.image", 0] },
        "image-storage": { $arrayElemAt: ["$first.variants.storageImage", 0] },

        // "tag": 1,

        // "total": 1
      }
    },
    { $sort: { tag: 1 } },

  ])
  console.log(`分類: ${req.query.category}底下 共有 ${doc.length} 種tag 資料`);
  res.send(doc)
};
