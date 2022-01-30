import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/', (request, response) => {
  response.send('API route works!');
});

export default apiRouter;
