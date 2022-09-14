const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser')
import db from './units/db.js';
import TGBot from '../src/helpers/TGBot.js';
// routers
import authRouter from './routers/auth.js';
import paymentRouter from './routers/paymentRouter.js';
import cpRouter from './routers/cp.js';
import officeRouter from './routers/office.js';
import categoryRouter from './routers/category.js';
import userRouter from './routers/user.js';
import actionRouter from './routers/action.js';

const PORT = 8088;
const PREFIX = 'api';

var app = express();
app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/${PREFIX}/cp`, cpRouter);
app.use(`/${PREFIX}/office`, officeRouter);
app.use(`/${PREFIX}/auth`, authRouter);
app.use(`/${PREFIX}/category`, categoryRouter);
app.use(`/${PREFIX}/user`, userRouter);
app.use(`/${PREFIX}/action`, actionRouter);
app.use(`/${PREFIX}/payment`, paymentRouter);


TGBot.hears('test', async (ctx) => {
  ctx.reply ('Hello');
});



const startApp = async() => {
  try {
    await db.authenticate();
    console.log('DB connected!');
    TGBot.launch();
    app.listen(PORT, () => {
      console.log(`API server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startApp();
