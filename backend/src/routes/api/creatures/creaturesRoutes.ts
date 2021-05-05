import express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();
import * as userController from './creaturesControllers';
import { verifyJWT } from '../../../middlewares/verify_jwt';
import currentUser from '../../../middlewares/current-user';
import * as creaturesController from './creaturesControllers'

// import { body } from 'express-validator';
// import checkReqBodyErrors from './../../errorHandlers/checkReqValidationErrors'

// path : host/api/ac/creatures?category=Insects
router.get("/",
  currentUser,
  creaturesController.cachedBasicQueryData,
  creaturesController.basicQuery
);




// 使用 req.body.name
router.get("/detailed-data",
  currentUser,
  creaturesController.getDetailedData
);



router.get("/categories",
  currentUser,
  creaturesController.cachedAllCategories,
  creaturesController.getAllCategories
);


router.get("/detailed-data/all-tags",
  currentUser,
  creaturesController.getAllTags
);

router.get("/detailed-data/categories/tags",
  currentUser,
  creaturesController.getTagByCategory
);

router.get("/detailed-data/categories/tags/first-doc",
  currentUser,
  creaturesController.getFirstDocOfAllTags
);

export default router;