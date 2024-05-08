import { Claim, EmptyClaimError } from "../src";
import {
  EMPTY_CLAIM,
  NON_SANITIZED_PET_PASSPORT_CLAIM_MOCK,
  PET_PASSPORT_CLAIM_MOCK,
} from "../src/schema/mocks";

describe("Claim", () => {
  describe("create", () => {
    it("should work", () => {
      const schema = Claim.create(PET_PASSPORT_CLAIM_MOCK);
      expect(schema.toPrimitive()).toEqual(PET_PASSPORT_CLAIM_MOCK);
    });
    it("should work with no sanitized", () => {
      const schema = Claim.create(NON_SANITIZED_PET_PASSPORT_CLAIM_MOCK);
      expect(schema.toPrimitive()).toEqual(PET_PASSPORT_CLAIM_MOCK);
    });
    it("should throw an error if the types are empty", () => {
      expect(() => Claim.create(EMPTY_CLAIM)).toThrow(new EmptyClaimError());
    });
  });
  describe("fromPrimitive", () => {
    it("should work a schema from a primitive", () => {
      const schema = Claim.fromPrimitive(PET_PASSPORT_CLAIM_MOCK);
      expect(schema.toPrimitive()).toEqual(PET_PASSPORT_CLAIM_MOCK);
    });
    it("should work with no sanitized", () => {
      const schema = Claim.fromPrimitive(NON_SANITIZED_PET_PASSPORT_CLAIM_MOCK);
      expect(schema.toPrimitive()).toEqual(PET_PASSPORT_CLAIM_MOCK);
    });
    it("should throw an error if empty", () => {
      expect(() => Claim.fromPrimitive(EMPTY_CLAIM)).toThrow(
        new EmptyClaimError()
      );
    });
  });
});
