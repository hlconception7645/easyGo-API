import { body } from "express-validator";

export const insuranceForfaitValidator = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Veuillez indiquer un nom pour le forfait"),
  body("desc")
    .isString()
    .notEmpty()
    .withMessage("Veuillez indiquer une description pour le forfait"),
  body("icon")
    .isString()
    .notEmpty()
    .withMessage("Veuillez indiquer une description pour le forfait"),

  body("price").isNumeric().withMessage("Veuillez indiquer le prix du forfait"),
];
  