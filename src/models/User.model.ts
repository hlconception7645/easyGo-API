import { AnyARecord } from "dns";
import { Schema, model, Model } from "mongoose";
import type { IUser } from "../types";
import { SERVER_ROOT } from "../constants/path";

export interface IUserMethods {}

export type UserModel = Model<IUser, {}, IUserMethods>;

const DriverLicenceSchema = new Schema({
  photoUrl: {
    type: String,
    required: true,
  },
});

const schema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    unique: true,
  },
  photoUrl: {
    type: String,
    required: false,
    default: null,
    get: (v: any) => {
      if (typeof v === "string") {
        return `${process.env.PROXY_HOST || SERVER_ROOT}${v}` as string;
      }

      return null;
    },
  },
  driverLicencePhotosUrl: {
    type: [DriverLicenceSchema],
    required: false,
    default: [],
    get: (v: any) => {
      return v.map((photo: any) => {
        return {
          _id: photo._id,
          photoUrl: `${process.env.PROXY_HOST || SERVER_ROOT}${
            photo?.photoUrl
          }`,
        };
      });
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
  },
});

schema.set("toJSON", { getters: true });
schema.set("toObject", { getters: true });
export default model<IUser>("User", schema);
