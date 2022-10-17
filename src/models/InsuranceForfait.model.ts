import { Schema, model, Model } from "mongoose";
import { IInsuranceForfait } from "../types";

interface IInsuranceForfaitMethods {}

export type ReservationModel = Model<IInsuranceForfait, {}, IInsuranceForfaitMethods>;

const schema = new Schema<IInsuranceForfait, ReservationModel, IInsuranceForfaitMethods>({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

export default model<IInsuranceForfait>("InsuranceForfait", schema);
