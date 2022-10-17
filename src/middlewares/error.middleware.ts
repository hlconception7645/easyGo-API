import { NextFunction, Request, Response } from "express";
import type { IErrorMW } from "../types";

export const errorMiddleWare = (
  error: IErrorMW,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ error});

  if (error.status && error.error) {
    return res.status(error.status).json({
      status: "FAILED",
      error: error.error,
    });
  }

  res.status(500).json({
    status: "FAILED",
    error: "Un probleme est survenue, veuillez ressayer.",
  });
};
