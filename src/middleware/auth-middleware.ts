import { NextFunction, Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import { SECRET } from "../utils/secrets";

export const checkToken = (req: Request, res: Response, next: NextFunction): any => {
  if (req.originalUrl === "/login") {
    return next();
  }

  let token = req.headers["x-access-token"] || req.headers.authorization;

  if (token) {
    token = token.toString();
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    jwt.verify(token, SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.json({
          message: "Invalid token!",
          success: false
        });
      } else {
        (req as any).decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      message: "Missing authentication token!",
      success: false
    });
  }
};
