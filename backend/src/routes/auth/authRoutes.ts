import express from 'express';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();
import * as authController from './authControllers';
import { body } from 'express-validator';
import checkReqBodyErrors from './../errorHandlers/checkReqValidationErrors'
// router : host/api/posts/(sub router)

router.post("/signup",
  [
    body('email').notEmpty().trim()
      .withMessage('user name or email for login is required'),
    body('password').trim().isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  checkReqBodyErrors,
  authController.signup);


router.post("/signup/google",
  [
    body('idToken').notEmpty().trim()
      .withMessage('idToken is required')
  ],
  checkReqBodyErrors,
  authController.authByGoogleOAuth);


router.post("/login",
  [
    body('email').notEmpty().trim()
      .withMessage('user name or email for login is required'),
    body('password').trim().isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  checkReqBodyErrors,
  authController.login);

router.get("/logout",
  authController.logout
);

export default router;