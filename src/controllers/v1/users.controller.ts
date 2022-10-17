import { NextFunction, Request, Response } from "express";
import { move } from "fs-extra";
import { E_BAD_REQUEST, E_SERVER_ERROR } from "../../constants/errors";
import { BusboyMwFile } from "../../middlewares/busboy.middleware";
import User from "../../models/User.model";
import { IErrorMW, IUser } from "../../types";

export const addDriverLicense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { photoUrl }: { photoUrl: BusboyMwFile } = req.body.files || {};
    const { _id: userId } = req.user as IUser;

    console.log("Uploading a new Licence")
    console.log({
      photoUrl
    })

    if (!photoUrl) {
      const err: IErrorMW = {
        status: E_BAD_REQUEST,
        error: {
          msg: "Veuillez selectionner une photo",
        },
      };

      next(err);
    }

    await move(photoUrl.path, photoUrl.dest);

    const result = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          driverLicencePhotosUrl: {
            photoUrl: `/img/driverLicences/${photoUrl.safeSuffix}`,
          },
        },
      },
      { new: true }
    );

    res.status(201).json({
      msg: "Permis de conduite ajouté avec succès !",
      result,
    });
  } catch (error) {
    let msg = "Un problème est survenue, veuillez réessayer !";

    const err: IErrorMW = {
      status: E_SERVER_ERROR,
      error: msg,
      originalErr: error,
    };

    next(err);
  }
};
