import { Router } from "express";
import validate from "../../../lib/validator";
import { kmPackConfigValidator } from "../../../middlewares/validators/kmPackConfig.validator";
import kmPackConfigController from "../../../controllers/v1/admin/kmPackConfig.controller";

const route = Router();

route.post("/", validate(kmPackConfigValidator), kmPackConfigController.create);
route.put("/:id", kmPackConfigController.update);

export default route;
