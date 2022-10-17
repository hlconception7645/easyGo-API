import { Router } from "express";
import validate from "../../../lib/validator";
import insuranceForfaisController from "../../../controllers/v1/admin/insuranceForfaits.controller";
import { insuranceForfaitValidator } from "../../../middlewares/validators/insuranceForfait.validator";

const route = Router();

route.post(
  "/",
  validate(insuranceForfaitValidator),
  insuranceForfaisController.create
);
route.delete("/:id", insuranceForfaisController.deleteAction);
route.put("/:id", insuranceForfaisController.update);

export default route;
