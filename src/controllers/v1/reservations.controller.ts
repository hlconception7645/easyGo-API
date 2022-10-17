import { NextFunction, Request, Response } from "express";
import Rerservation from "../../models/Rerservation.model";
import { IUser, RESERVATIONS_STATUS } from "../../types";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {_id: userId} = req.user as IUser; 

    console.log("Creating reservation");
    const {
      vehicleId,
      kmForfaitId,
      hasAdditionalDriver,
      additionalKm,
      startAt,
      endAt,
      insuranceForfaitId,
      driverLicenceUrl,
    } = req.body;

    const newReservation = new Rerservation({
      vehicleId,
      kmForfaitId,
      hasAdditionalDriver,
      additionalKm,
      startAt,
      endAt,
      insuranceForfaitId,
      status: RESERVATIONS_STATUS.WAITING_PAYMENT,
      driverLicenceUrl,
      userId
    });

    const result = await newReservation.save();

    res.status(201).json({
      msg: "Vehicule created successfully",
      result,
    });

  } catch (error) {
    console.log({error});
    
    next(error)
  }
};

/**
 * List all reservations. Filterable by status.
 *
 * @param req
 * @param res
 */
export const listAllAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {status} = req.query;


    let statusV: string[] = [];
    if (status === "CLOSED") {
      statusV = [RESERVATIONS_STATUS.CLOSED];
    } else if (status === "PROGRESS") {
      statusV = [
        RESERVATIONS_STATUS.PAYMENT_DONE,
        RESERVATIONS_STATUS.VEHICLE_TAKEN,
        RESERVATIONS_STATUS.WAITING_PAYMENT,        
      ];
    }
    else {
      statusV = [...Object.keys(RESERVATIONS_STATUS)];
    }

    const result = await Rerservation.find({
      status: {$in: statusV},
    });

    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Find one reservation by id.
 *
 * @param req
 * @param res
 */
export const findOne = async (req: Request, res: Response) => {
  res.status(200).json({
    message: `reservation of id ${req.params.id}`,
  });
};

export default {
  listAllAction,
  findOne,
};
