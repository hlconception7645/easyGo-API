import { Router } from "express";
import validate from "../../../lib/validator";
import { kmValidator } from "../../../middlewares/validators/kmForfaits.validator";
import KmForfaitsController from "../../../controllers/v1/admin/kmForfaits.controller";

const route = Router();

route.post("/", validate(kmValidator), KmForfaitsController.create);
route.delete("/:id", KmForfaitsController.deleteAction);
route.put("/:id", KmForfaitsController.update);

export default route;
