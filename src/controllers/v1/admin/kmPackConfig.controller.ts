import { NextFunction, Request, Response } from "express";
import { IErrorMW } from "../../../types";
import {
  E_BAD_REQUEST,
  E_NOT_FOUND,
  E_SERVER_ERROR,
} from "../../../constants/errors";
import KmPackConfig from "../../../models/KmPackConfig.model";

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
    const { notSubscribedPrice, subscribedPrice } = req.body;

    const config = await KmPackConfig.find();
    let kmPackConfig: any = null;

    if (config && config.length > 0) {
      kmPackConfig = config[0];
      
      kmPackConfig.notSubscribedPrice = notSubscribedPrice;
      kmPackConfig.subscribedPrice = subscribedPrice;
    } else {
      kmPackConfig = new KmPackConfig({
        notSubscribedPrice,
        subscribedPrice,
      });
    }

    const result = await kmPackConfig.save();

    res.status(201).json({
      status: "OK",
      msg: "Configuration créé avec succès !",
      result,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";
    let code = E_SERVER_ERROR;

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
    const { notSubscribedPrice, subscribedPrice } = req.body;
    const { id } = req.params;

    const config = await KmPackConfig.findOneAndUpdate(
      { _id: id },
      {
        notSubscribedPrice,
        subscribedPrice,
      },
      {
        new: true,
      }
    );

    if (config === null) {
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
      msg: "Configuration modifié avec succes !",
      result: config,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";
    let code = E_SERVER_ERROR;

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

export default {
  create,
  update,
};
