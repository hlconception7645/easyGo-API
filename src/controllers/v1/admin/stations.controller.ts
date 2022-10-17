import { NextFunction, Request, Response } from "express";
import { IErrorMW } from "../../../types";
import {
  E_BAD_REQUEST,
  E_NOT_FOUND,
  E_SERVER_ERROR,
} from "../../../constants/errors";
import Station from "../../../models/Station.model";

/**
 * Create a new Station.
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
    const { name, lt, ln } = req.body;

    const station = new Station({
      name,
      ln: ln || null,
      lt: lt || null,
    });

    const result = await station.save();

    res.status(201).json({
      msg: "Station created successfully",
      result,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";

    if (error?.code === 11000) {
      msg = "Une station existe deja avec ce nom";
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
    const { name, lt, ln } = req.body;
    const { id } = req.params;

    const station = await Station.findOneAndUpdate(
      { _id: id },
      {
        name,
        lt,
        ln,
      },
      {
        new: true,
      }
    );

    if (station === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Station introuvable !",
        },
      };

      return next(err);
    }

    res.status(200).json({
      status: "OK",
      msg: "Station modifie avec succes !",
      result: station,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";
    let code = E_SERVER_ERROR;

    if (error?.code === 11000) {
      msg = "Une station existe deja avec ce nom";
      code = E_BAD_REQUEST;
    }

    const err: IErrorMW = {
      status: code,
      error: {
        msg,
      },
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
    const station = await Station.findOneAndDelete({ _id: req.params.id });

    if (station === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Station introuvable !",
        },
      };

      return next(err);
    }

    res.status(200).json({
      status: "OK",
      msg: "Station supprimée avec succès !",
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
