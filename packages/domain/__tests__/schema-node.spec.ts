import { SchemaNode } from "../src";
import {
  VACCINES_SCHEMA_NODE_MOCK,
  NON_SANITIZED_BREED_SCHEMA_NODE_MOCK,
  BREED_SCHEMA_NODE_MOCK,
} from "../src/schema/mocks/schema-node.mock";

describe("SchemaNode", () => {
  describe("create", () => {
    it("should work", () => {
      const schemaNode = SchemaNode.create(VACCINES_SCHEMA_NODE_MOCK);
      expect(schemaNode.toPrimitive()).toEqual(VACCINES_SCHEMA_NODE_MOCK);
    });
    it("should work with non sanitized", () => {
      const schemaNode = SchemaNode.create(
        NON_SANITIZED_BREED_SCHEMA_NODE_MOCK
      );
      expect(schemaNode.toPrimitive()).toEqual(BREED_SCHEMA_NODE_MOCK);
    });
  });
  describe("fromPrimitive", () => {
    it("should work", () => {
      const schemaNode = SchemaNode.fromPrimitive(VACCINES_SCHEMA_NODE_MOCK);
      expect(schemaNode.toPrimitive()).toEqual(VACCINES_SCHEMA_NODE_MOCK);
    });
    it("should work with no sanitized", () => {
      const schemaNode = SchemaNode.fromPrimitive(
        NON_SANITIZED_BREED_SCHEMA_NODE_MOCK
      );
      expect(schemaNode.toPrimitive()).toEqual(BREED_SCHEMA_NODE_MOCK);
    });
  });
});
