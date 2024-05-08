import mongoose from "mongoose";
import { SchemaPrimitive } from "@stamp/domain";

const SchemaSchema = new mongoose.Schema<SchemaPrimitive>({
  name: { type: String, required: true },
  version: { type: Number, required: true },
  types: { type: [String], required: true, length: { min: 1 } },
  lang: { type: String, required: true },
  credentialSubject: { type: Object, required: true },
  status: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    transform: (date: Date) => date.toISOString(),
  },
  modifiedAt: {
    type: Date,
    required: true,
    transform: (date: Date) => date.toISOString(),
  },
});

export default mongoose.models.Schema ||
  mongoose.model<SchemaPrimitive>("Schema", SchemaSchema);
