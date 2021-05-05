import express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();
import * as userController from './userControllers';
import { verifyJWT } from './../../../middlewares/verify_jwt';
import currentUser from './../../../middlewares/current-user';
import User from './../../../database/schemas/UserSchema';

// import { body } from 'express-validator';
// import checkReqBodyErrors from './../../errorHandlers/checkReqValidationErrors'

// path : host/api/user/(sub router)

router.get("/currentUser",
  // currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.getUserData) {
      const user = await User.find({
        _id: req.currentUser?.id
      })
      if (user.length > 0)
        return res.send(user[0])
      return res.send(null)

    }
    res.send(req.currentUser)
  }
);

router.get("/:userId",
  userController.getUserById);

router.post("/register",
  userController.register);


export default router;