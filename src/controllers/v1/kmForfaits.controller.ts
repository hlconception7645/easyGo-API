import { NextFunction, Request, Response } from "express";
import { IErrorMW } from "../../types";
import { E_NOT_FOUND, E_SERVER_ERROR } from "../../constants/errors";
import KmForfait from "../../models/KmForfait.model";

/**
 * List all Stations.
 *
 * @param req
 * @param res
 */
export const listAllAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { interval } = req.query;

    const result = await KmForfait.find({
      $and: [
        { "daysCountInterval.min": { $lte: parseInt(interval as string) } },
        { "daysCountInterval.max": { $gte: parseInt(interval as string) } },
      ],
    });

    console.log({result});
    

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

    const result = await KmForfait.findById(id);

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
  listAllAction,
  findOne,
};
