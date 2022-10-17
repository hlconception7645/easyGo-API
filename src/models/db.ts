import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/easyGO";

export const connectMongoose = async () => {
  try {
    console.log(`Connection to ${MONGO_URI}`);
    await mongoose.connect(MONGO_URI);
    console.log('Connection success !');
  } catch (error) {
    console.log(`Connection to ${MONGO_URI} failed`);
    throw error;
  }
}
