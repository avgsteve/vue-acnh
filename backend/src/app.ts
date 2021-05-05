import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path'
import compression from 'compression';
import compressionFilter from './middlewares/compressionFilter'
// import chalk from 'chalk';
// import dayjs from 'dayjs';
// import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/auth/current-user';
// import { signinRouter } from './routes/signin';
// import { signoutRouter } from './routes/signout';
// import { signupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';

console.log(`current process.env.NODE_ENV: `, process.env.NODE_ENV);
const app = express();
app.set('trust proxy', true); // 允許來自 nginx proxy 的 req
app.use(
  compression(
    { filter: compressionFilter }
  ),
  json(), // parse req.body
  cors(),
  morgan('combined'),
  // cookieSession({
  //   signed: false,
  //   secure: false,
  //   // secure: process.env.NODE_ENV !== 'test', // 使用 jest 進行測試的時候會設為 'test
  //   httpOnly: true,
  // }),
  cookieParser()
);



app.use(express.static(path.join(__dirname, "./../public")));

// app.get('/api/users/currentuser', (req, res) => {
//   res.send('Hi there!!');
// });

import currentUser from './middlewares/current-user';

import authRouter from './routes/auth/authRoutes';
import userRouter from './routes/api/user/userRoutes'
import meRouter from './routes/api/me/meRoutes'
import itemsRouter from './routes/api/items/itemsRoutes'
import creaturesRouter from './routes/api/creatures/creaturesRoutes'
import recipesRouter from './routes/api/recipes/recipesRoutes'
import clothingRouter from './routes/api/clothing/clothingRoutes'
import listRouter from './routes/api/list/listRoutes'



app.use(currentUser)
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/me", meRouter);
app.use("/api/ac/items", itemsRouter);
app.use("/api/ac/creatures", creaturesRouter);
app.use("/api/ac/recipes", recipesRouter);
app.use("/api/ac/clothing", clothingRouter);

app.use("/api/list", listRouter);


// app.use(signinRouter);
// app.use(signoutRouter);
// app.use(signupRouter);

app.all(
  '*',
  async (
    req,
    res
    // next
  ) => {
    // next(new NotFoundError());  // 改成以下就可以不用 next
    throw new NotFoundError();
    // https://expressjs.com/en/guide/error-handling.html
    // https://www.npmjs.com/package/express-async-errors
  }
);

app.use(errorHandler);

export { app };
