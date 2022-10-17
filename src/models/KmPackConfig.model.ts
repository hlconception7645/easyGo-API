import { Schema, model, Model } from "mongoose";
import { IKmPackConfig } from "../types";

interface IKmPackConfigMethods {}

export type ReservationModel = Model<IKmPackConfig, {}, IKmPackConfigMethods>;

const schema = new Schema<
  IKmPackConfig,
  ReservationModel,
  IKmPackConfigMethods
>({
  notSubscribedPrice: {
    type: Number,
    required: true,
  },
  subscribedPrice: {
    type: Number,
    required: true,
  },
});

export default model<IKmPackConfig>("KmPackConfig", schema);
