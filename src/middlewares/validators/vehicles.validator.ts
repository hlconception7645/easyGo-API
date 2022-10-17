import { body } from "express-validator";
import { BusboyMwFile } from "../busboy.middleware";

export const postVehicleValidator = [
  body("name").isString().notEmpty().withMessage("Veuillez saisir un nom."),
  body("stationId")
    .notEmpty()
    .isString()
    .withMessage("Veuillez indiquer la station du vehicule."),
  body("vehicleTypeId")
    .notEmpty()
    .isString()
    .withMessage("Veuillez indiquer la station du vehicule."),
  body("files").custom((files: { photoUrl: BusboyMwFile }) => {
    if (!files) {
      throw new Error("Veuillez selectionner une photo !");
    }
    const { photoUrl } = files;
    if (
      !photoUrl ||
      photoUrl.field?.length === 0 ||
      photoUrl.path?.length === 0 ||
      photoUrl.safeSuffix?.length === 0
    ) {
      throw new Error("Veuillez selectionner une photo !");
    }

    return true;
  }),
];

export const putVehicleValidator = [
  body("name").isString().notEmpty().withMessage("Veuillez saisir un nom."),
  body("stationId")
    .notEmpty()
    .isString()
    .withMessage("Veuillez indiquer la station du vehicule."),
  body("vehicleTypeId")
    .notEmpty()
    .isString()
    .withMessage("Veuillez indiquer la station du vehicule."),
];
