import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

interface UserPayload {
  id: string;
  role?: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.slice(7).trim();

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.user = decoded as UserPayload;
        next();
      }
    );
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
