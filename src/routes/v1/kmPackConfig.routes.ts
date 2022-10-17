import { Router } from "express";
import KmPackConfigController from "../../controllers/v1/kmPackConfig.controller";

const route = Router();

route.get("/", KmPackConfigController.getConfig);

export default route;
