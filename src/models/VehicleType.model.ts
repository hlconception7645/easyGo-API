import { Schema, model, Model } from "mongoose";
import { IVehicleType } from "../types";

interface IVehicleTypeMethods {}

export type ReservationModel = Model<IVehicleType, {}, IVehicleTypeMethods>;

const schema = new Schema<IVehicleType, ReservationModel, IVehicleTypeMethods>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model<IVehicleType>("VehicleType", schema);
