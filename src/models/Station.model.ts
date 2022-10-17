import { Schema, model, Model } from "mongoose";
import { IStation } from "../types";

interface IStationMethods {}

export type ReservationModel = Model<IStation, {}, IStationMethods>;

// TODO: validation rules for ln & lt.
const schema = new Schema<IStation, ReservationModel, IStationMethods>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ln: {
    type: String,
    default: null,
  },
  lt: {
    type: String,
    default: null,
  },
});

export default model<IStation>("Station", schema);
