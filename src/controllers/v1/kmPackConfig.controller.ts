import { NextFunction, Request, Response } from "express";
import { IErrorMW } from "../../types";
import { E_NOT_FOUND, E_SERVER_ERROR } from "../../constants/errors";
import KmPackConfig from "../../models/KmPackConfig.model";

/**
 * Find one Station by id.
 *
 * @param req
 * @param res
 */
export const getConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await KmPackConfig.findOne();

    if (result === null) {
      return next({
        status: E_NOT_FOUND,
        error: "Forfait introuvable",
      });
    }

    res.status(200).json({
      status: "OK",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getConfig,
};
