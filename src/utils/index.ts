import { Router } from 'express';

type Wrapper = ((router: Router) => void);

const applyMiddleware = (middleware: Wrapper[], router: Router) => {
  middleware.forEach((f: Wrapper) => {
    f(router);
  });
};

export default applyMiddleware;
