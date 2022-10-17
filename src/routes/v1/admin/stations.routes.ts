import { Router } from "express";
import validate from "../../../lib/validator";
import { stationValidator } from "../../../middlewares/validators/station.validator";
import StationsController from "../../../controllers/v1/admin/stations.controller";

const route = Router();

route.post("/", validate(stationValidator), StationsController.create);
route.delete("/:id", StationsController.deleteAction);
route.put("/:id", StationsController.update);

export default route;
