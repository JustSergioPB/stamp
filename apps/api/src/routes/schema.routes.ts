import express, { Router } from "express";
import { SchemaController } from "@controllers/schema.controller";
import { SchemaMongoRepository } from "@repositories/schema.mongo-repository";
import { SchemaQuery } from "@domain/schema";

const router: Router = express.Router();
const repository = new SchemaMongoRepository();
const controller = new SchemaController(repository);

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query["page"]);
    const pageSize = Number(req.query["pageSize"]);
    const result = await controller.searchSchemas(
      new SchemaQuery(pageSize, page)
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const result = await controller.getSchema(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
