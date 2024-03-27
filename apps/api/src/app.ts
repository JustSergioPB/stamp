import * as dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import schemaRoutes from "@routes/schema.routes";
import { connectToDatabase } from "./database";

dotenv.config();
startServer();

async function startServer(): Promise<void> {
  const { SERVER_PORT, DATABASE_URI, DATABASE_NAME } = process.env;

  const app: Express = express();
  const port = SERVER_PORT || 3000;

  if (!DATABASE_URI) {
    throw new Error("DATABASE_URI must be provided");
  }

  if (!DATABASE_NAME) {
    throw new Error("DATABASE_NAME must be provided");
  }

  await connectToDatabase(DATABASE_URI, DATABASE_NAME);

  app.use(cors());
  app.use(express.json());
  app.use("/schemas", schemaRoutes);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
