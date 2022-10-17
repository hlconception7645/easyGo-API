import { NextFunction, Request, Response } from "express";
import {
  E_AUTHREQUIRED,
  E_NOT_FOUND,
  E_SERVER_ERROR,
  E_UNAUTHORIZED,
} from "../../../constants/errors";
import {
  generateJWT,
  hashPassword,
  verifyPassword,
} from "../../../lib/authLib";
import User from "../../../models/User.model";
import { IErrorMW, IUser, USER_ROLES } from "../../../types";
import { BusboyMwFile } from "../../../middlewares/busboy.middleware";
import { move, remove } from "fs-extra";
import { PUBLIC_DIR } from "../../../constants/path";

/**
 * Login action
 *
 * @param req
 * @param res
 */
export const loginAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  console.log("Admin login called");

  if (
    user === null ||
    !(await verifyPassword(password, user!.password || ""))
  ) {
    const err: IErrorMW = {
      status: E_AUTHREQUIRED,
      error: {
        msg: "Identifiants ou mot de passe invalide !",
      },
    };
    return next(err);
  }

  if (user.role != USER_ROLES.ADMIN) {
    const err: IErrorMW = {
      status: E_UNAUTHORIZED,
      error: {
        msg: "Accès refusé !",
      },
    };
    return next(err);
  }

  const uPublicData = {
    ...user!.toObject(),
    password: undefined,
    __v: undefined,
  };
  const token = await generateJWT(uPublicData);

  res.status(201).json({
    status: "OK",
    user: uPublicData,
    token: token,
  });
};

/**
 * Refresh user using the token.
 *
 * @param req
 * @param res
 * @param next
 */
export const refreshUserAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  // no need to check here since the auth mw already did.
  const token = authHeader && authHeader.split(" ")[1];
  const user = req.user as IUser;

  res.status(200).json({
    user: user,
    token: token,
  });
};

/**
 * Update user profile.
 *
 * @param req
 * @param res
 * @param next
 */
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { photoUrl }: { photoUrl: BusboyMwFile } = req.body.files || {};

  try {
    const { email, name, firstName } = req.body;

    const user = await User.findById(req.user?._id!);

    if (user === null) {
      const err: IErrorMW = {
        status: E_NOT_FOUND,
        error: {
          msg: "Utilisateur introuvable !",
        },
      };

      return next(err);
    }
    const lastPhoto = user.photoUrl;

    user.email = email;
    user.name = name;
    user.firstName = firstName;
    if (photoUrl) {
      user.photoUrl = `/img/user/${photoUrl.safeSuffix}`;
    }

    await user.save();

    if (photoUrl) {
      await Promise.all([
        move(photoUrl.path, photoUrl.dest),
        remove(`${PUBLIC_DIR}${lastPhoto}`),
      ]);
    }
    const token = await generateJWT(user.toObject());

    return res.status(200).json({
      status: "OK",
      msg: "Profile modifié avec succès !",
      user: {
        ...user.toObject(),
        password: undefined,
        __v: undefined,
      },
      toekn: token,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  loginAction,
  updateProfile,
};
