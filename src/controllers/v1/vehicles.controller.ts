import { NextFunction, Request, Response } from "express";
import { E_NOT_FOUND } from "../../constants/errors";
import KmForfait from "../../models/KmForfait.model";
import KmPackConfig from "../../models/KmPackConfig.model";
import Vehicle from "../../models/Vehicle.model";
import { dateDiff } from "../../utils";

/**
 * List all vehicles.
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
    const { type } = req.query;
    const filterQuery = {} as { vehicleType?: string };

    if (type !== undefined) {
      filterQuery.vehicleType = type as string;
    }

    const result = await Vehicle.find(filterQuery)
      .populate("station")
      .populate("vehicleType");

    res.status(200).json({
      status: "OK",
      result,
    });
  } catch (error) {
    // console.log(error);

    next(error);
  }
};

export const listAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type: vehicleType, from, to, station } = req.query;

    const filterQuery = {
      $or: [
        {
          isAvailable: true,
        },
        {
          avalableAt: new Date(from as string),
        },
      ],
      station: station,
    } as { [x: string]: any };

    if (vehicleType !== undefined) {
      filterQuery.vehicleType = vehicleType as string;
    }

    const interval = dateDiff(to as string, from as string);
    const [result, kmResult, kmPrice] = await Promise.all([
      Vehicle.find({
        ...filterQuery,
      })
        .populate("station")
        .populate("vehicleType"),

      KmForfait.find({
        $and: [
          { "daysCountInterval.min": { $lte: interval } },
          { "daysCountInterval.max": { $gte: interval } },
        ],
      }),

      KmPackConfig.findOne(),
    ]);

    // console.log({
    //   result, kmResult
    // })

    res.status(200).json({
      status: "OK",
      result,
      kmPack: kmResult[0],
      kmPrice: kmPrice,
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

    const result = await Vehicle.findById(id)
      .populate("station")
      .populate("vehicleType");

    if (result === null) {
      return next({
        status: E_NOT_FOUND,
        error: "VEhicule introuvable",
      });
    }

    res.status(200).json({
      status: "OK",
      result,
    });
  } catch (error) {
    // console.log({ error });

    next(error);
  }
};

export default {
  listAllAction,
  findOne,
  listAvailable,
};
