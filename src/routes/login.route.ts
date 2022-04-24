import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../utils/secrets';
import User, { UserModel } from '../models/user.model';

const loginRouter = express.Router();

loginRouter.post('/', (request, response, next) => {
  const { email, password }: { email: string, password: string } = request.body;

  if (email && password) {
    User.findOne({ email }, (err: any, existingUser: UserModel) => {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        existingUser.comparePassword(password, (error: any, isMatch: boolean) => {
          if (error) {
            return next(error);
          }

          if (isMatch) {
            const token = jwt.sign(
              {
                email,
                userId: existingUser.id,
                name: existingUser.profile.name,
              },
              SECRET,
              { expiresIn: '24h' },
            );

            response.json({
              success: true,
              message: 'Logged in successfully!',
              result: { token },
            });
          } else {
            response.status(403).send({
              success: false,
              message: 'Incorrect username or password',
            });
          }
        });
      } else {
        response.status(403).send({
          success: false,
          message: 'Incorrect username or password',
        });
      }
    });
  } else {
    response.status(400).send({
      success: false,
      message: 'Authentication failed! Please check the request',
    });
  }
});

export default loginRouter;
