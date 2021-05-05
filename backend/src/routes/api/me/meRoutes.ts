import express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();
import * as meController from './meControllers';
import { verifyJWT } from '../../../middlewares/verify_jwt';
import currentUser from '../../../middlewares/current-user';

// import { body } from 'express-validator';
// import checkReqBodyErrors from './../../errorHandlers/checkReqValidationErrors'

// path : host/api/user/(sub router)

router.get("/",
  currentUser,
  meController.getMyInfo
);


router.post("/listData",
  currentUser,
  meController.addListData
);

router.get("/listData",
  currentUser,
  meController.getListData
);

export default router;