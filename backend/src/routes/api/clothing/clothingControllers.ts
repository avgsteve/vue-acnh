require('dotenv').config();
import redis from "redis";
let redisPort: any = process.env.PORT_REDIS || 6379
const redisClient = redis.createClient(redisPort);

import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
import CustomError from '../../errorHandlers/customError';
import Item from '../../../models/Item'


function send400ResWithError(errMsg: string, res: Response) {
  if (!errMsg || !res) throw Error('need errMsg and res');
  let error = new CustomError(errMsg, 400);
  res.status(400).send(error);
}
interface QueryObj {
  sourceSheet?: string;
  name?: string,
  category?: string,
  diy?: boolean,
  style1?: string,
}

export async function cachedBasicQueryData(req: Request, res: Response, next: NextFunction) {
  const q: any = req.query
  console.log('req.query: ', q);

  let queryObj: QueryObj = {}

  // 表示是 searchPage的查詢
  if (q.name) {
    queryObj.name = q.name;
  }

  if (q.category) {
    queryObj.sourceSheet = q.category;
  }

  let queryString = JSON.stringify(queryObj).toString()

  queryString =
    queryString
      .replace("{", "").replace("}", "")
      .replace("\"", "").replace(":", "")
      .split(",").join("").split("\"").join("")

  // console.log('queryString :', queryString);

  redisClient.get("clothing" + queryString, (err, data) => {
    if (err || !data || data.length === 0 || req.query.new)
      return next();
    if (data) {
      const cachedData = JSON.parse(data!)
      console.log('透過redis送出cached data');
      return res.send(cachedData)
    } next();
  })


}

export async function basicQuery(req: Request, res: Response) {

  const q: any = req.query
  console.log('req.query: ', q);

  let queryObj: QueryObj = {}

  // 表示是 searchPage的查詢
  if (q.name) {
    queryObj.name = q.name;
  }

  if (q.category) {
    queryObj.sourceSheet = q.category;
  }


  let queryString = JSON.stringify(queryObj).toString()

  queryString =
    queryString
      .replace("{", "").replace("}", "")
      .replace("\"", "").replace(":", "")
      .split(",").join("").split("\"").join("")

  //@ts-ignore
  queryObj.style1 = { $ne: null }
  console.log('queryObj :', queryObj);
  console.log('queryString :', queryString);

  const doc = await Item.find(queryObj)

  redisClient.setex("clothing" + queryString, 3600, JSON.stringify(doc))

  console.log('doc found: ', doc.length);
  return res.send(doc)
}


export async function getDetailedData(req: Request, res: Response) {
  const q = req.query
  if (!q.name) {
    return res.status(400)
  }
  // 表示是 searchPage的查詢
  if (q.name) {
    let name: any = q.name;
    const doc = await Item.find({
      // "name": req.body.name
      "name": name
    })
    console.log('doc: ', doc);
    return res.send(doc[0])
  }
};


export async function getAllCategories(req: Request, res: Response) {
  console.log('aggregation: getAllCategories for clothing:');
  const doc = await Item.aggregate([
    {
      $match: {
        'style1': { $ne: null }
      }
    },
    {
      $group: {
        _id: null,
        categories: { $addToSet: "$sourceSheet" }
      }
    }
  ])
  console.log('doc: ', doc);
  let
    sortedRecipeCategories = doc[0].categories
  sortedRecipeCategories = doc[0].categories.sort();

  redisClient.setex("sortedClothingCategories", 3600, JSON.stringify(sortedRecipeCategories));

  res.send(sortedRecipeCategories)
};

export async function cachedAllCategories(req: Request, res: Response, next: NextFunction) {

  console.log('req.query.new:', req.query.new);

  redisClient.get("sortedClothingCategories", (err, data) => {
    console.log({ err, data });
    if (err || !data || data.length === 0 || req.query.new)
      return next();
    return res.send(JSON.parse(data))
  })
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
        'style1': { $ne: null },
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


export async function getAllStyles(req: Request, res: Response) {
  console.log('aggregation: 查詢所有 tag fields 的 unique value:');
  const doc = await Item.aggregate([
    {
      $match:
      {
        'style1': { $ne: null },
      }
    },
    {
      $group: {
        _id: null,
        style1: {
          $addToSet: "$style1",
        },
        style2: {
          $addToSet: "$style2",
        }

      }
    },
  ])
  res.send(doc[0])
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
