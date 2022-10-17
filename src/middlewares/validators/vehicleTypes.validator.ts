import { body } from "express-validator";

export const vehicleTypesValidator = [
  body("name").notEmpty().withMessage("veuillez renseigner un nom"),
];
