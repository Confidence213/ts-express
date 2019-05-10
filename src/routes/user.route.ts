import express from "express";
import { default as User } from "../models/user.model";
export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("User route works!");
});

userRouter.get("/signup", (req, res) => {
    res.send("Signup route works");
});

userRouter.post("/signup", (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.redirect("/user/signup");
        }
        user.save((e) => {
            if (e) {
                return next(e);
            }
            res.status(200).send("User saved!");
        });
    });
});
