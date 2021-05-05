require('dotenv').config()
import CustomError from './customError';
import { Request, Response, NextFunction } from 'express'

//@ts-ignore
let httpProtocol: string = process.env.NODE_ENV;
httpProtocol = httpProtocol.toString().trim() === 'development' ? 'http' : 'https';

interface CustomErrorObj {
  statusCode: number,
  status: string,
  message: string,
}

function routeNotFoundHandler(req: Request, res: Response, next: NextFunction) {
  let customErrorObj: CustomErrorObj;

  const fullUrl = httpProtocol + '://' + req.get('host') + req.originalUrl;

  // 如果是關於 API 的的路徑錯誤
  if (fullUrl.match(/api/g)) {

    customErrorObj = new CustomError(`The api path: '${req.originalUrl}' is not found on server. Please check again`, 404);

    if (process.env.NODE_ENV === 'development')
      // 送出 json 格式錯誤訊息
      return res.status(customErrorObj.statusCode).json({
        status: customErrorObj.status,
        message: customErrorObj.message,
        error: customErrorObj,
        // stack: err.stack
      });

    // 如果是 production 的話
    return res.status(400).send('Invalid api request or invalid api path');



    // 如果是關於前端的路徑錯誤
  } else {
    customErrorObj = new CustomError(`\nCan't find this page:${fullUrl} on this server!!\n`, 404);
    return sendNotFoundPage(req, res, customErrorObj, fullUrl);
  }

};



function sendNotFoundPage(req: Request, res: Response, err: CustomErrorObj, fullUrl: string) {
  console.error('\n ERROR (related to page url)💥\n', err);

  let inlineStyle = 'text-align:center;';

  res.status(404).send(`
        <h1 style="${inlineStyle}">   Oops! (⊙x⊙;)          </h1>
        <p style="${inlineStyle}">    The page on this URL:   </p>
        <h3 style="${inlineStyle};">  ${fullUrl}              </h3>
        <p style="${inlineStyle}">    is NOT FOUND!           </p>       
    `);

  //     .render('./error_pages/page_not_found', {
  //     title: 'Page not found',
  //     user_data: res.locals.user,
  //     current_url: fullUrl
  // });
};


module.exports = routeNotFoundHandler;