import { Request, Response } from "express";

/**
 * List all reservations. Filterable by status.
 *
 * @param req
 * @param res
 */
export const listAllAction = async (req: Request, res: Response) => {
  res.status(200).json(["Reservations admin array"]);
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
