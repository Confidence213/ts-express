"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/", (req, res) => {
    res.send("USER works!");
});
exports.userRouter.get("/signup", (req, res) => {
    res.send("Signup page");
});
exports.userRouter.post("/signup", (req, res, next) => {
    const user = new user_model_1.default({
        email: req.body.email,
        password: req.body.password
    });
    user_model_1.default.findOne({ email: req.body.email }, (err, existingUser) => {
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
