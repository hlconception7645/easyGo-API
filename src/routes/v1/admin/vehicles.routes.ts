import { NextFunction, Request, Response, Router } from "express";
import path from "path";
import { PUBLIC_IMG_DIR } from "../../../constants/path";
import VehicleController from "../../../controllers/v1/admin/vehicles.controller";
import validate from "../../../lib/validator";
import busboyMw from "../../../middlewares/busboy.middleware";
import { postVehicleValidator, putVehicleValidator } from "../../../middlewares/validators/vehicles.validator";

const route = Router();

route.post(
  "/",
  busboyMw({
    destination: path.resolve(PUBLIC_IMG_DIR, "vehicles"),
    mimes: ["image/jpeg", "image/png"],
    baseName: "vehicle"
  }),
  validate(postVehicleValidator),
  VehicleController.create
);
route.delete("/:id", VehicleController.deleteAction);
route.put(
  "/:id",
  busboyMw({
    destination: path.resolve(PUBLIC_IMG_DIR, "vehicles"),
    mimes: ["image/jpeg", "image/png"],
    baseName: "vehicle"
  }),
  validate(putVehicleValidator),
  VehicleController.update
);

export default route;
