import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  req.session = null; // (官方文件:) 清空 session 內容

  res.send({});
});

export { router as signoutRouter };
