import { body } from "express-validator";

export const kmValidator = [
  body("minDays")
    .isNumeric()
    .withMessage("Veuillez indiquer le nombre de jour minimal pour ce forfait"),
  body("maxDays")
    .isNumeric()
    .withMessage("Veuillez indiquer le nombre de jour maximal pour ce forfait"),
  body("includedKm")
    .isNumeric()
    .withMessage(
      "Veuillez indiquer le nombre de kilomètres inclus gratuitement."
    ),
  body("maxKm")
    .isNumeric()
    .withMessage(
      "Veuillez indiquer le nombre de kilomètres maximum pour la formule."
    ),
];
