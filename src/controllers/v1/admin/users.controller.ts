import { NextFunction, Request, Response } from "express";
import { E_NOT_FOUND } from "../../../constants/errors";
import User from "../../../models/User.model";
import { USER_ROLES } from "../../../types";

/**
 * List all users
 *
 * @param req
 * @param res
 * @param next
 */
const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await User.find({
      $or: [{role: USER_ROLES.USER}],
    });

    res.status(200).json({
      status: "OK",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  list,
};
