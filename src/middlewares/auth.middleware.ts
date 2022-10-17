import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { E_UNAUTHORIZED } from "../constants/errors";

/**
 * Admin middleware
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const adminRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role !== "ADMIN") {
    return res.status(401).json({ message: "Forbiden !" });
  }

  next();
};

/**
 * Auth (JWT) middleware
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return next({
        status: E_UNAUTHORIZED,
        error: {
          msg: "Accès refusé !",
        },
      });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        
        if (err) {
          // token has expired , genrate a new one.
          if (err.name === "TokenExpiredError") {
            // TODO: implement a refreshing
          }

          return next({
            status: E_UNAUTHORIZED,
            error: {
              msg: "Accès refusé !",
            },
          });
        }

        req.user = user;

        next();
      }
    );
  } catch (error) {
    console.log({ error });

    return next({
      status: E_UNAUTHORIZED,
      error: {
        msg: "Accès refusé !",
      },
    });
  }
};
