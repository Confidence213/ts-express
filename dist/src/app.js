"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const middleware_1 = __importDefault(require("./middleware"));
const router_1 = require("./routes/router");
const utils_1 = require("./utils");
const secrets_1 = require("./utils/secrets");
// Create a new express application instance
dotenv_1.default.config({ path: ".env" });
const app = express_1.default();
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true }, (err) => {
    if (err) {
        // tslint:disable-next-line:no-console
        console.log(err.message);
    }
    else {
        // tslint:disable-next-line:no-console
        console.log("Succesfully Connected!");
    }
});
app.set("port", process.env.PORT || 3000);
utils_1.applyMiddleware(middleware_1.default, app);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/", (req, res) => {
    res.send(req.body);
});
app.use("/api", router_1.apiRouter);
app.use("/user", router_1.userRouter);
exports.default = app;
