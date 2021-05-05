require('dotenv').config();
import redis from "redis";
let redisPort: any = process.env.PORT_REDIS || 6379
const redisClient = redis.createClient(redisPort);

import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcrypt';
import CustomError from '../../errorHandlers/customError';
import Item from './../../../models/Item'
import Creatures from './../../../models/Creatures'


function send400ResWithError(errMsg: string, res: Response) {
  if (!errMsg || !res) throw Error('need errMsg and res');
  let error = new CustomError(errMsg, 400);
  res.status(400).send(error);
}
interface QueryObj {
  sourceSheet?: string;
  name?: string,
  category?: string,
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

  redisClient.get(queryString, (err, data) => {
    if (err)
      return next();
    if (!data)
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
  console.log('queryString :', queryString);

  const doc = await Item.find(queryObj)

  redisClient.setex(queryString, 3600, JSON.stringify(doc))

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
  console.log('aggregation: getAllCategories:');
  const doc = await Creatures.aggregate([
    {
      $group: {
        _id: null,
        category: { $addToSet: "$category" }
      }
    }
  ])
  console.log('doc: ', doc);
  const sortedCategories = doc[0].category = doc[0].category.sort();

  redisClient.setex("sortedCategories", 3600, JSON.stringify(sortedCategories));

  res.send(sortedCategories)
};

export async function cachedAllCategories(req: Request, res: Response, next: NextFunction) {

  redisClient.get("sortedCategories", (err, data) => {
    console.log({ err, data });
    if (err || !data || req.query.new === 'true')
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
