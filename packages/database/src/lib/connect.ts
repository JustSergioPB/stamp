import mongoose from "mongoose";

export async function connectToMongo(uri: string) {
  await mongoose.connect(uri);
}
