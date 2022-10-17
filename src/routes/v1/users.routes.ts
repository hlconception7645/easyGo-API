import { Router } from "express";
import busboyMw from "../../middlewares/busboy.middleware";
import { PUBLIC_IMG_DIR } from "../../constants/path";
import path from "path";
import { auth } from "../../middlewares/auth.middleware";
import * as usersController from "../../controllers/v1/users.controller";

const route = Router();

route.post(
  "/",
  auth,
  busboyMw({
    destination: path.resolve(PUBLIC_IMG_DIR, "driverLicences"),
    mimes: ["image/jpeg", "image/png"],
    baseName: "driverLicence",
  }),
  usersController.addDriverLicense
);

export default route;
