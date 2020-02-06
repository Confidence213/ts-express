import express from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/secrets";
export const loginRouter = express.Router();

loginRouter.post("/", (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  const mock = {
    password: 'password',
    username: 'admin'
  };

  if (username && password) {
    if (username === mock.username && password === mock.password) {
      const token = jwt.sign(
        { username },
        SECRET,
        { expiresIn: '24h' }
      );

      response.json({
        token,
        username
      });
    } else {
      response.status(403).send({
        message: 'Incorrect username or password'
      });
    }
  } else {
    response.status(400).send({
      message: 'Authentication failed! Please check the request'
    });
  }
});
