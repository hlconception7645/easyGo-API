import { NextFunction, Request, Response } from "express";
import { IErrorMW } from "../../../types";
import {
  E_BAD_REQUEST,
  E_NOT_FOUND,
  E_SERVER_ERROR,
} from "../../../constants/errors";
import InsuranceForfait from "../../../models/InsuranceForfait.model";

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
    const { name, desc, price, icon } = req.body;

    const kmForfait = new InsuranceForfait({
      name,
      desc,
      price,
      icon,
    });

    const result = await kmForfait.save();

    res.status(201).json({
      status: "OK",
      msg: "Forfait d'assurance ajoute avec succès !",
      result,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";
    let code = E_SERVER_ERROR;

    if (error?.code === 11000) {
      msg = "Un Forfait d'assurance deja avec ce nom.";
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
    const { name, desc, price, icon } = req.body;
    const { id } = req.params;

    const forfait = await InsuranceForfait.findOneAndUpdate(
      { _id: id },
      {
        name,
        desc,
        price,
        icon
      },
      {
        new: true,
      }
    );

    if (forfait === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Forfait d'assurance introuvable !",
        },
      };

      return next(err);
    }

    res.status(200).json({
      status: "OK",
      msg: "Forfait d'assurance modifie avec succes !",
      result: forfait,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";
    let code = E_SERVER_ERROR;

    if (error?.code === 11000) {
      msg = "Un forfait d'assurance  existe deja avec ce nom.";
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
    const forfait = await InsuranceForfait.findOneAndDelete({
      _id: req.params.id,
    });

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
