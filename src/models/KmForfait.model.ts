import { Schema, model, Model } from "mongoose";
import { IKmForfait } from "../types";

interface IKmForfaitMethods {}

const daysCountIntervalSchema = new Schema({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

daysCountIntervalSchema.index(
  {
    min: 1,
    max: -1,
  },
  { unique: true }
);

export type ReservationModel = Model<IKmForfait, {}, IKmForfaitMethods>;

const schema = new Schema<IKmForfait, ReservationModel, IKmForfaitMethods>({
  daysCountInterval: {
    type: daysCountIntervalSchema,
    required: true,
  },
  includedKm: {
    type: Number,
    required: true,
  },
  maxKm: {
    type: Number,
    required: true,
  },
});

schema.index({});

export default model<IKmForfait>("KmForfait", schema);
