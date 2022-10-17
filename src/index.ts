import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, Application } from "express";
import cors from "cors";
import { connectMongoose } from "./models/db";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { errorMiddleWare } from "./middlewares/error.middleware";
import { adminRequired, auth } from "./middlewares/auth.middleware";
import { V1AdminRoutes } from "./routes/v1/admin";
import { V1Routes } from "./routes/v1";
import path from "path";
import { PUBLIC_DIR } from "./constants/path";
const PORT = process.env.PORT;

async function main() {
  try {
    await connectMongoose();

    const app: Application = express();

    // Register-middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      cors({
        allowedHeaders: [
          "Accept",
          "Authorization",
          "Content-Type",
          "Origin",
          "X-Requested-With",
        ],
        origin: "*",
      })
    );

    // API DOCS
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, {
        explorer: true,
      })
    );

    // Api Routes.
    app.get("/", async (req: Request, res: Response) => {
      res.status(200).json({
        message: "EasyGo Api.",
      });
    });
    app.use(express.static(PUBLIC_DIR));

    app.use("/api/v1/", V1Routes.authRoute);
    app.use("/api/v1/admin", V1AdminRoutes.authRoute);

    // Secure routes.
    app.use(auth);
    app.use("/api/v1/vehicles", V1Routes.vehiclesRoute);
    app.use("/api/v1/reservations", V1Routes.reservationsRoute);
    app.use("/api/v1/stations", V1Routes.stationsRoute);
    app.use("/api/v1/vehicleTypes", V1Routes.vehicleTypesRoute);
    app.use("/api/v1/kmForfaits", V1Routes.kmForfaitsRoute);
    app.use("/api/v1/kmPriceConfig", V1Routes.kmPackConfigRoute);
    app.use("/api/v1/insurances", V1Routes.insuranceForfaitRoute);
    app.use("/api/v1/driverLicences", V1Routes.usersRoute);

    // Admin routes.
    app.use(adminRequired);
    app.use("/api/v1/admin/stations", V1AdminRoutes.stationsRoute);
    app.use("/api/v1/admin/vehicleTypes", V1AdminRoutes.vehicleTypesRoute);
    app.use("/api/v1/admin/vehicles", V1AdminRoutes.vehiclesRoute);
    app.use("/api/v1/admin/kmForfaits", V1AdminRoutes.kmForfaitsRoute);
    app.use("/api/v1/admin/kmPriceConfig", V1AdminRoutes.kmPackConfigRoute);
    app.use("/api/v1/admin/insurances", V1AdminRoutes.insuranceForfaitRoute);
    app.use("/api/v1/admin/users", V1AdminRoutes.usersRoute);

    // Error middleware
    app.use(errorMiddleWare);

    app.listen(PORT, () =>
      console.log(`listening on http://127.0.0.1:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
