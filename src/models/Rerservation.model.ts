import { Schema, model, Model } from "mongoose";
import { IReservation } from "../types";

interface IReservationMethods {}

export type ReservationModel = Model<IReservation, {}, IReservationMethods>;

const schema = new Schema<IReservation, ReservationModel, IReservationMethods>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  vehicleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Vehicle"
  },
  kmForfaitId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "KmForfait"
  },
  insuranceForfaitId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "InsuranceForfait"
  },
  status: {
    type: String,
    required: true,
  },
  hasAdditionalDriver: {
    type: Boolean,
    default: false,
  },
  additionalKm: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
});

export default model<IReservation>("Reservation", schema);
