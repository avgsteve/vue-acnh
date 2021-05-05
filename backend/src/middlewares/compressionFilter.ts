import { Request, Response } from 'express';
import compression from 'compression'


const shouldCompress = (req: Request, res: Response) => {

  console.log('收到的請求header: ', req.headers);

  //@ts-ignore
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // Resort to standard compression
  //@ts-ignore
  return compression.filter(req, res);
};

export default shouldCompress;