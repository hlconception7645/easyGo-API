import { Router } from "express";
import insuranceForfaitsController from "../../controllers/v1/insuranceForfait.controller";

const route = Router();

route.get("/", insuranceForfaitsController.listAllAction);
route.get("/:id", insuranceForfaitsController.findOne);

export default route;
