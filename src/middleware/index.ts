import {
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
  jwtAuth,
} from './common';

export default [handleCors, handleBodyRequestParsing, handleCompression, jwtAuth];
