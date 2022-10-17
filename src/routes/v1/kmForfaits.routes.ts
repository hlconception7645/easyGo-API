import { Router } from "express";
import KmForfaitsController from "../../controllers/v1/kmForfaits.controller";

const route = Router();

route.get("/", KmForfaitsController.listAllAction);
route.get("/:id", KmForfaitsController.findOne);

export default route;
