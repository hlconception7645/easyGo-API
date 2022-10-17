import { Router } from "express";
import * as ReservationsController from "../../controllers/v1/reservations.controller";
import { auth } from "../../middlewares/auth.middleware";

const route = Router();

/**
 * Get all reservation.
 */
route.get("/", ReservationsController.listAllAction);
route.post("/", ReservationsController.create);

/**
 * Get one reservation by id.
 */
route.get("/:id(d+)", ReservationsController.findOne);

export default route;
