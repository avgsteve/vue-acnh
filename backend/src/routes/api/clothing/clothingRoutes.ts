import express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { verifyJWT } from '../../../middlewares/verify_jwt';
import currentUser from '../../../middlewares/current-user';
import * as clothingController from './clothingControllers'

// import { body } from 'express-validator';
// import checkReqBodyErrors from './../../errorHandlers/checkReqValidationErrors'

// path : host/api/ac/creatures?category=Insects
router.get("/",
  currentUser,
  clothingController.cachedBasicQueryData,
  clothingController.basicQuery
);




// 使用 req.body.name
router.get("/detailed-data",
  currentUser,
  clothingController.getDetailedData
);



router.get("/categories",
  currentUser,
  clothingController.cachedAllCategories,
  clothingController.getAllCategories
);


router.get("/detailed-data/all-styles",
  currentUser,
  clothingController.getAllStyles
);

router.get("/detailed-data/categories/tags",
  currentUser,
  clothingController.getTagByCategory
);

router.get("/detailed-data/categories/tags/first-doc",
  currentUser,
  clothingController.getFirstDocOfAllTags
);

export default router;