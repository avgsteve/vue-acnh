
import chalk from 'chalk';
import dayjs from 'dayjs';
import connectToDB from './database/connectionToMongoDB';
import { app } from './app';
require('dotenv').config();
const port = process.env.PORT
connectToDB(startServer);

function startServer() {
  app.listen(port, () => {
    console.log(chalk.yellow(`\n=== service running on port ${port} ===`));
    console.log(chalk.yellow(`Service started up at: ${dayjs().format()}`));
  });
}





