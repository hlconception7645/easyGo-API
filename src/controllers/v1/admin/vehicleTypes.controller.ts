import { NextFunction, Request, Response } from "express";
import { IErrorMW } from "../../../types";
import {
  E_BAD_REQUEST,
  E_NOT_FOUND,
  E_SERVER_ERROR,
} from "../../../constants/errors";
import VehicleType from "../../../models/VehicleType.model";

/**
 * Create a new vehicleType.
 *
 * @param req
 * @param res
 */
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const vehicleType = new VehicleType({
      name,
    });

    const result = await vehicleType.save();

    res.status(201).json({
      status: "OK",
      msg: "Type de vehicule ajoute avec succes !",
      result,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";

    if (error?.code === 11000) {
      msg = "Une Type de vehicule existe deja avec ce nom";
    }

    const err: IErrorMW = {
      status: E_SERVER_ERROR,
      error: {
        msg,
      },
      originalErr: error,
    };

    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name} = req.body;
    const { id } = req.params;

    const result = await VehicleType.findOneAndUpdate(
      { _id: id },
      {
        name,
      },
      {
        new: true,
      }
    );

    if (result === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Type de vehicule introuvable !",
        },
      };

      return next(err);
    }

    res.status(200).json({
      status: "OK",
      msg: "Type de vehicule modifie avec succes !",
      result,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";
    let code = E_SERVER_ERROR;

    if (error?.code === 11000) {
      msg = "Un Type de vehicule existe deja avec ce nom";
      code = E_BAD_REQUEST;
    }

    const err: IErrorMW = {
      status: code,
      error: msg,
      originalErr: error,
    };

    next(err);
  }
};

export const deleteAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const station = await VehicleType.findOneAndDelete({ _id: req.params.id });

    if (station === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Type de vehicule introuvable !",
        },
      };

      return next(err);
    }

    res.status(200).json({
      status: "OK",
      msg: "Type de vehicule supprimée avec succès !",
    });
  } catch (error: any) {
    next({
      status: E_SERVER_ERROR,
      error: "Un problème est survenue, veuillez réessayer !",
      originalErr: error,
    });
  }
};

export default {
  create,
  deleteAction,
  update,
};
