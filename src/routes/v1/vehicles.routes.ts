import { Router } from "express";
import VehiclesController from "../../controllers/v1/vehicles.controller";

const route = Router();

route.get("/", VehiclesController.listAllAction);
route.get("/available", VehiclesController.listAvailable);
route.get("/:id", VehiclesController.findOne);

export default route;
