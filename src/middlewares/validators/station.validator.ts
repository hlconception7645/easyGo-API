import { body } from "express-validator";

export const stationValidator = [
  body("name").notEmpty().withMessage("veuillez renseigner un nom"),
];
