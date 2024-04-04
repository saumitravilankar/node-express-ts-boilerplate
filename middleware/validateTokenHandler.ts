import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

const validateToken = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECERT as string,
        (err: any, decode: any) => {
          if (err) {
            res.status(401);
            throw new Error("User is not authorized");
          }
          req.user = decode.user;
          next();
        }
      );
    }
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
);

export { validateToken };
