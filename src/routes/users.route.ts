import express from 'express';
import User from '../models/user.model';

const usersRouter = express.Router();

usersRouter.get('/', (req, res, next) => {
  User.find({}, (e, users) => {
    if (e) {
      return next(e);
    }
    if (!users) {
      return res.sendStatus(404);
    }

    const userMap: any = [];

    users.forEach((user) => {
      userMap.push(user.toUserJSON());
    });

    res.json(userMap);
  });
});

usersRouter.get('/signup', (req, res) => {
  res.send('Signup route works');
});

usersRouter.post('/signup', (req, res, next) => {
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

usersRouter.get('/:id', (req, res, next) => {
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

export default usersRouter;
