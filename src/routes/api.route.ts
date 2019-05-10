import express from "express";
export const apiRouter = express.Router();

apiRouter.get("/", (request, response) => {
  response.send("API route works!");
});
