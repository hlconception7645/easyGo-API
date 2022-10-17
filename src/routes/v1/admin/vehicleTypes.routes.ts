import { Router } from "express";
import validate from "../../../lib/validator";
import { vehicleTypesValidator } from "../../../middlewares/validators/vehicleTypes.validator";
import VehicleTypesController from "../../../controllers/v1/admin/vehicleTypes.controller";

const route = Router();

route.post("/", validate(vehicleTypesValidator), VehicleTypesController.create);
route.delete("/:id", VehicleTypesController.deleteAction);
route.put("/:id", validate(vehicleTypesValidator), VehicleTypesController.update);

export default route;
