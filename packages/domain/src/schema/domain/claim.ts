import { EmptyClaimError } from "../errors";
import { SchemaNode, SchemaNodePrimitive } from "./schema-node";

export type ClaimPrimitive = {
  [key: string]: SchemaNodePrimitive;
};

export class Claim {
  private properties: { [key: string]: SchemaNode };

  private constructor(claim: { [key: string]: SchemaNode }) {
    this.properties = claim;
  }

  static create(create: ClaimPrimitive): Claim {
    return Claim.fromPrimitive(create);
  }

  static fromPrimitive(props: ClaimPrimitive): Claim {
    const sanitized: { [key: string]: SchemaNode } = {};
    for (const key in props) {
      const sanitizedKey = Claim.sanitize(key);
      sanitized[sanitizedKey] = SchemaNode.fromPrimitive(props[key]);
    }
    Claim.validate(props);
    return new Claim(sanitized);
  }

  toPrimitive(): ClaimPrimitive {
    const claim: { [key: string]: SchemaNodePrimitive } = {};
    for (const key in this.properties) {
      claim[key] = this.properties[key].toPrimitive();
    }
    return claim;
  }

  private static sanitize(key: string): string {
    return key.toLowerCase().replace(/\s/g, "");
  }

  private static validate(claim: ClaimPrimitive): void {
    const keys = Object.keys(claim);
    if (keys.length === 0) {
      throw new EmptyClaimError();
    }
  }
}
