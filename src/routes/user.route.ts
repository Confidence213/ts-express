import express from 'express';
import User from '../models/user.model';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('User route works!');
});

userRouter.get('/signup', (req, res) => {
  res.send('Signup route works');
});

userRouter.post('/signup', (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      gender: req.body.gender,
      location: req.body.location,
      name: req.body.name,
      website: req.body.website,
    },
  });

  User.findOne({ email: req.body.email } as any, (err: any, existingUser: any) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.redirect('/user/signup');
    }
    user.save((e) => {
      if (e) {
        return next(e);
      }
      res.status(200).send('User saved!');
    });
  });
});

userRouter.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (e: any, user: any) => {
    if (e) {
      return next(e);
    }
    if (!user) {
      return res.sendStatus(404);
    }
    return res.json(user.toUserJSON());
  });
});

export default userRouter;
