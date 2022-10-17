import { Router } from "express";
import path from "path";
import { PUBLIC_IMG_DIR } from "../../constants/path";
import * as authController from "../../controllers/v1/auth.controller";
import validate from "../../lib/validator";
import { auth } from "../../middlewares/auth.middleware";
import busboyMw from "../../middlewares/busboy.middleware";
import {
  loginVaidator,
  signinValidator,
  updateProfilValdiator,
} from "../../middlewares/validators/authValidator";

const route = Router();

route.post("/connexion", validate(loginVaidator), authController.loginAction);
route.post(
  "/inscription",
  validate(signinValidator),
  authController.signupAction
);
route.post(
  "/profil",
  auth,
  busboyMw({
    destination: path.resolve(PUBLIC_IMG_DIR, "profilePhotos"),
    mimes: ["image/jpeg", "image/png"],
    baseName: "profile_user",
  }),
  validate(updateProfilValdiator),
  authController.updateProfile
);
route.get("/refresh", auth, authController.refreshUserAction);

export default route;
