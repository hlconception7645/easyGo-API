import { Router } from "express";
import usersController from "../../../controllers/v1/admin/users.controller";

const route = Router();

route.get("/", usersController.list);

export default route;
