import { Router } from "express";
import VehicleTypesController from "../../controllers/v1/vehicleTypes.controller";

const route = Router();

route.get("/", VehicleTypesController.listAllAction);
route.get("/:id", VehicleTypesController.findOne);

export default route;
