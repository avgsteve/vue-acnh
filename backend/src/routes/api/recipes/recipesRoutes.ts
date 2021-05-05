import express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();
import * as userController from './recipesControllers';
import { verifyJWT } from '../../../middlewares/verify_jwt';
import currentUser from '../../../middlewares/current-user';
import * as recipesController from './recipesControllers'

// import { body } from 'express-validator';
// import checkReqBodyErrors from './../../errorHandlers/checkReqValidationErrors'

// path : host/api/ac/creatures?category=Insects
router.get("/",
  currentUser,
  recipesController.cachedBasicQueryData,
  recipesController.basicQuery
);




// 使用 req.body.name
router.get("/detailed-data",
  currentUser,
  recipesController.getDetailedData
);



router.get("/categories",
  currentUser,
  recipesController.cachedAllCategories,
  recipesController.getAllCategories
);


router.get("/detailed-data/all-tags",
  currentUser,
  recipesController.getAllTags
);

router.get("/detailed-data/categories/tags",
  currentUser,
  recipesController.getTagByCategory
);

router.get("/detailed-data/categories/tags/first-doc",
  currentUser,
  recipesController.getFirstDocOfAllTags
);

export default router;