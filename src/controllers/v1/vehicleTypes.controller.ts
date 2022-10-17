import { NextFunction, Request, Response } from "express";
import { E_NOT_FOUND } from "../../constants/errors";
import vehicleTypes from "../../models/VehicleType.model";

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
    const result = await vehicleTypes.find();

    res.status(200).json({
      status: "OK",
      result: [
        {
          _id: null,
          name: "Toutes",
        },
        ...result,
      ],
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

    const result = await vehicleTypes.findById(id);

    if (result === null) {
      return next({
        status: E_NOT_FOUND,
        error: "Type de vehicule introuvable",
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
