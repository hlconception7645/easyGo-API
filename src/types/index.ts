
import { Types } from "mongoose";

export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const RESERVATIONS_STATUS = {
  WAITING_PAYMENT:'WAITING_PAYMENT',
  PAYMENT_DONE:'PAYMENT_DONE',
  VEHICLE_TAKEN:'VEHICLE_TAKEN',
  CLOSED:'CLOSED',
  VEHICLE_BACK: 'CLOSED',
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  firstName: string;
  email: string;
  createdAt: Date;
  photoUrl: string | null;
  driverLicencePhotosUrl: {photoUrl: string, _id: string}[];
  password: string;
  role: "USER" | "ADMIN";
}

export interface IReservation {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  vehicleId: Types.ObjectId;
  insuranceForfaitId: Types.ObjectId | null;
  kmForfaitId: Types.ObjectId;
  hasAdditionalDriver: Boolean;
  status: keyof typeof RESERVATIONS_STATUS;
  driverLicenceUrl: string;
  additionalKm: Number;
  createdAt: Date;
  startAt: Date;
  endAt: Date;
}
export interface IStation {
  _id: Types.ObjectId;
  name: string;
  ln: string | null;
  lt: string | null;
}

export interface IKmForfait {
  _id: Types.ObjectId;
  daysCountInterval: {
    min: Number;
    max: Number;
  };
  includedKm: Number;
  maxKm: Number;
}

export interface IKmPackConfig {
  _id: Types.ObjectId;
  subscribedPrice: Number;
  notSubscribedPrice: Number;
}

export interface IInsuranceForfait {
  _id: Types.ObjectId;
  name: string;
  desc: string;
  icon: string;
  price: Number;
}

export interface IVehicleType {
  _id: Types.ObjectId;
  name: string;
}

export interface IVehicle {
  _id: Types.ObjectId;
  name: string;
  photoUrl: string;
  absolutePhotoUrl?: string; 
  isAvailable: boolean;
  availableAt: Date | null;
  station: Types.ObjectId | IStation;
  vehicleType: Types.ObjectId | IVehicleType;
  createdAt: Date;
}

export interface IObjectError {
  msg: string;
  param?: string;
  location?: string;
}

export type IApiErrorObject = IObjectError | string;

export interface IErrorMW {
  status: number;
  error: IApiErrorObject | IApiErrorObject[];
  originalErr?: any
}
