import parser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { Router } from 'express';
import checkToken from './auth-middleware';

export const handleCors = (router: Router) => router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};

export const jwtAuth = (router: Router) => {
  router.use(checkToken);
};
