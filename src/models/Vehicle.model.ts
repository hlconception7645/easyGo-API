import { Schema, model, Model } from "mongoose";
import { IVehicle } from "../types";
import { SERVER_ROOT } from "../constants/path";
import StationModel from "./Station.model";
import VehicleTypeModel from "./VehicleType.model";

interface IVehicleMethods {}

export type ReservationModel = Model<IVehicle, {}, IVehicleMethods>;

const schema = new Schema<IVehicle, ReservationModel, IVehicleMethods>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  station: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Station",
  },
  vehicleType: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "VehicleType",
  },
  photoUrl: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: false,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  availableAt: {
    type: Date,
    default: null,
  },
});
schema.set("toJSON", { getters: true, virtuals: true });

schema.virtual("absolutePhotoUrl").get(function () {
  if (!this.photoUrl) {
    return "";
  }
  return `${process.env.PROXY_HOST || SERVER_ROOT}${this.photoUrl}`;
});


export default model<IVehicle>("Vehicle", schema);
