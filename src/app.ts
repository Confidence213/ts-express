import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import middleware from './middleware';

import loginRouter from './routes/login.route';
import { apiRouter, usersRouter } from './routes/router';
import applyMiddleware from './utils';
import { MONGODB_URI } from './utils/secrets';

// Create a new express application instance
dotenv.config({ path: '.env' });
const app: express.Application = express();

const mongoUrl = MONGODB_URI;
mongoose.connect(mongoUrl, (err: any) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);
  } else {
    // eslint-disable-next-line no-console
    console.log('Succesfully Connected!');
  }
});

app.set('port', process.env.PORT || 3000);

applyMiddleware(middleware, app);

app.post('/', (req, res) => {
  res.send(req.body);
});

app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

export default app;
