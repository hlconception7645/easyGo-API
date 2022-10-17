import { NextFunction, Request, Response } from "express";
import { IErrorMW } from "../../../types";
import {
  E_BAD_REQUEST,
  E_NOT_FOUND,
  E_SERVER_ERROR,
} from "../../../constants/errors";
import KmForfait from "../../../models/KmForfait.model";

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
    const { minDays, maxDays, includedKm, maxKm } = req.body;

    const kmForfait = new KmForfait({
      daysCountInterval: {
        min: minDays,
        max: maxDays,
      },
      includedKm,
      maxKm,
    });

    const result = await kmForfait.save();

    res.status(201).json({
      status: "OK",
      msg: "Forfait créé avec succès !",
      result,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";
    let code = E_SERVER_ERROR;

    if (error?.code === 11000) {
      msg = "Un forfait existe deja avec les memes parametres de durees.";
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

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { minDays, maxDays, includedKm, maxKm } = req.body;
    const { id } = req.params;

    const forfait = await KmForfait.findOneAndUpdate(
      { _id: id },
      {
        minDays,
        maxDays,
        includedKm,
        maxKm,
      },
      {
        new: true,
      }
    );

    if (forfait === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Forfait introuvable !",
        },
      };

      return next(err);
    }

    res.status(200).json({
      status: "OK",
      msg: "Forfait modifie avec succes !",
      result: forfait,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";
    let code = E_SERVER_ERROR;

    if (error?.code === 11000) {
      msg = "Un forfait existe deja avec les memes parametres de durees.";
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
    const forfait = await KmForfait.findOneAndDelete({ _id: req.params.id });

    if (forfait === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Forfait introuvable !",
        },
      };

      return next(err);
    }

    res.status(200).json({
      status: "OK",
      msg: "Forfait supprimée avec succès !",
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
