import express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();
import * as userController from './itemsControllers';
import { verifyJWT } from '../../../middlewares/verify_jwt';
import currentUser from '../../../middlewares/current-user';
import * as itemsController from './itemsControllers'

// import { body } from 'express-validator';
// import checkReqBodyErrors from './../../errorHandlers/checkReqValidationErrors'

// path : host/api/items/(sub router)

router.get("/translation-data",
  currentUser,
  itemsController.getAllData
);

router.get("/detailed-data",
  currentUser,
  itemsController.getDetailedData
);

router.get("/detailed-data/all",
  currentUser,
  itemsController.getAllDetailedData
);


router.get("/detailed-data/categories",
  currentUser,
  itemsController.getAllCategories
);


router.get("/detailed-data/all-tags",
  currentUser,
  itemsController.getAllTags
);

router.get("/detailed-data/categories/tags",
  currentUser,
  itemsController.getTagByCategory
);

router.get("/detailed-data/categories/tags/first-doc",
  currentUser,
  itemsController.getFirstDocOfAllTags
);

export default router;