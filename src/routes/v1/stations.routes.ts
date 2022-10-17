import { Router } from "express";
import StationsController from "../../controllers/v1/stations.controller";

const route = Router();

route.get("/", StationsController.listAllAction);
route.get("/:id", StationsController.findOne);

export default route;
