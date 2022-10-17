import { NextFunction, Request, Response } from "express";
import { IErrorMW } from "../../types";
import { E_NOT_FOUND, E_SERVER_ERROR } from "../../constants/errors";
import Station from "../../models/Station.model";

/**
 * List all Stations.
 * .
 * @param req
 * @param res
 */
export const listAllAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Station.find();
    res.status(200).json({
      status: "OK",
      result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Find one Station by id.
 *
 * @param req
 * @param res
 */
export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await Station.findById(id);

    if (result === null) {
      return next({
        status: E_NOT_FOUND,
        error: "Station introuvable",
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
  listAllAction,
  findOne,
};
