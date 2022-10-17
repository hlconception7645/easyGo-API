import { body } from "express-validator";

export const kmPackConfigValidator = [
  body("notSubscribedPrice")
    .isNumeric()
    .withMessage("Veuillez renseigner le prix du kilometre sans forfait"),
  body("subscribedPrice")
    .isNumeric()
    .withMessage("Veuillez renseigner le prix du kilometre avec forfait"),
];
