import express from 'express';
import { verifyJWT } from '../../middlewares/verify_jwt';
import { requireAuth } from '../../middlewares/require-auth'
const router = express.Router();

router.get(
  '/api/users/currentuser',
  verifyJWT, // middleware that processes the session in request
  // requireAuth,
  (req, res) => {
    console.log("currentUser: ", req.currentUser);
    res.send({
      currentUser: req.currentUser || null,
    });
  }
);

export { router as currentUserRouter };
