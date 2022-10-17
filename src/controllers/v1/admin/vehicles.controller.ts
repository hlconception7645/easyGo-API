import { NextFunction, Request, Response } from "express";
import { move, remove } from "fs-extra";
import { IErrorMW } from "../../../types";
import { E_NOT_FOUND, E_SERVER_ERROR } from "../../../constants/errors";
import { PUBLIC_DIR, PUBLIC_IMG_DIR } from "../../../constants/path";
import { BusboyMwFile } from "../../../middlewares/busboy.middleware";
import Vehicle from "../../../models/Vehicle.model";

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
  const { photoUrl }: { photoUrl: BusboyMwFile } = req.body.files || {};

  try {
    const { name, stationId, vehicleTypeId } = req.body;
    await move(photoUrl.path, photoUrl.dest);
    const vehicle = new Vehicle({
      name,
      station: stationId,
      vehicleType: vehicleTypeId,
      photoUrl: `/img/vehicles/${photoUrl.safeSuffix}`,
    });

    const result = await (
      await (await vehicle.save()).populate("station")
    ).populate("vehicleType");

    res.status(201).json({
      msg: "Vehicule created successfully",
      result,
    });
  } catch (error: any) {
    await remove(photoUrl.path);

    let msg = "Un problème est survenue, veuillez réessayer !";
    if (error?.code === 11000) {
      msg = "Un vehicule existe déjà avec ce nom";
    }

    const err: IErrorMW = {
      status: E_SERVER_ERROR,
      error: msg,
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
  const { photoUrl }: { photoUrl: BusboyMwFile } = req.body.files || {};

  try {
    const { name, stationId, vehicleTypeId } = req.body;
    const { id } = req.params;

    let vehicle = await Vehicle.findById(id);

    if (vehicle === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Vehicule introuvable !",
        },
      };

      return next(err);
    }
    const lastPhoto = vehicle.photoUrl;

    // Actually save the vehicle.
    vehicle.photoUrl = `/img/vehicles/${photoUrl.safeSuffix}`;
    vehicle.name = name;
    vehicle.station = stationId;
    vehicle.vehicleType = vehicleTypeId;

    await (
      await (await vehicle.save()).populate("station")
    ).populate("vehicleType");

    // now safely save the new photo if any and remove the last one.
    if (photoUrl) {
      await Promise.all([
        move(photoUrl.path, photoUrl.dest),
        remove(`${PUBLIC_DIR}${lastPhoto}`),
      ]);
    }

    res.status(200).json({
      status: "OK",
      msg: "Vehicule modifié avec succès !",
      result: vehicle,
    });
  } catch (error: any) {
    let msg = "Un problème est survenue, veuillez réessayer !";
    if (error?.code === 11000) {
      msg = "Un vehicule existe déjà avec ce nom";
    }

    const err: IErrorMW = {
      status: E_SERVER_ERROR,
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
    const vehicule = await Vehicle.findOneAndDelete({ _id: req.params.id });

    if (vehicule === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Vehicule introuvable !",
        },
      };

      return next(err);
    }

    res.status(200).json({
      status: "OK",
      msg: "Vehicule supprimée avec succès !",
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
