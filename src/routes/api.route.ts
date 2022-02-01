import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/', (request, response) => {
  response.json({
    message: 'API route works!',
    success: true,
  });
});

export default apiRouter;
