import { EmptyTypesError, Schema } from "../src";
import {
  PET_PASSPORT_SCHEMA_MOCK,
  NON_SANITIZED_PET_PASSPORT_SCHEMA_MOCK,
  INVALID_PET_PASSPORT_SCHEMA_MOCK,
} from "../src/schema/mocks/schema.mock";

describe("Schema", () => {
  describe("create", () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date(2024, 25, 4));
    });

    afterAll(() => {
      jest.useRealTimers();
    });
    it("should work", () => {
      const schema = Schema.create(PET_PASSPORT_SCHEMA_MOCK);
      expect(schema.toPrimitive()).toEqual(PET_PASSPORT_SCHEMA_MOCK);
    });
    it("should work with non sanitized", () => {
      const schema = Schema.create(NON_SANITIZED_PET_PASSPORT_SCHEMA_MOCK);
      expect(schema.toPrimitive()).toEqual(PET_PASSPORT_SCHEMA_MOCK);
    });
    it("should throw an error if the types are empty", () => {
      expect(() => Schema.create(INVALID_PET_PASSPORT_SCHEMA_MOCK)).toThrow(
        new EmptyTypesError()
      );
    });
  });
  describe("fromPrimitive", () => {
    it("should work a schema from a primitive", () => {
      const schema = Schema.fromPrimitive(PET_PASSPORT_SCHEMA_MOCK);
      expect(schema.toPrimitive()).toEqual(PET_PASSPORT_SCHEMA_MOCK);
    });
    it("should work with no sanitized", () => {
      const schema = Schema.fromPrimitive(
        NON_SANITIZED_PET_PASSPORT_SCHEMA_MOCK
      );
      expect(schema.toPrimitive()).toEqual(PET_PASSPORT_SCHEMA_MOCK);
    });
    it("should throw an error if the types are empty", () => {
      expect(() =>
        Schema.fromPrimitive(INVALID_PET_PASSPORT_SCHEMA_MOCK)
      ).toThrow(new EmptyTypesError());
    });
  });
});
