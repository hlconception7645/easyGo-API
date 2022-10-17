import { Router } from "express";
import {
  loginAction,
  // signupAction,
} from "../../../controllers/v1/admin/auth.controller";

const route = Router();

route.post("/connexion", loginAction);
// route.post("/inscription", signupAction);

export default route;
