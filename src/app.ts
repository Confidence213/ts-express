import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import middleware from "./middleware";

import { apiRouter, userRouter } from "./routes/router";
import { applyMiddleware } from "./utils";
import { MONGODB_URI } from "./utils/secrets";

// Create a new express application instance
dotenv.config({ path: ".env" });
const app: express.Application = express();

const mongoUrl = MONGODB_URI;
mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
    if (err) {
        // tslint:disable-next-line:no-console
        console.log(err.message);
    } else {
        // tslint:disable-next-line:no-console
        console.log("Succesfully Connected!");
    }
});

app.set("port", process.env.PORT || 3000);

applyMiddleware(middleware, app);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/", (req, res) => {
    res.send(req.body);
});

app.use("/api", apiRouter);
app.use("/user", userRouter);

export default app;
