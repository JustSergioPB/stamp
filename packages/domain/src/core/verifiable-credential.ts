import { V2Context } from "./context";
import { CredentialSchema } from "./credential-schema";
import { CredentialSubject } from "./credential-subject";
import { Issuer } from "./issuer";
import { LanguageValueObject } from "./language-value-object";
import { Type, VerifiableCredentialType } from "./types";
import { CredentialStatus } from "./credential-status";
import { Proof } from "./proof";

export type VerifiableCredentialV2 = {
  "@context": V2Context;
  id?: string;
  type: VerifiableCredentialType;
  name?: string | LanguageValueObject;
  description?: string | LanguageValueObject;
  credentialSubject: CredentialSubject | CredentialSubject[];
  issuer: Issuer;
  proof?: Proof | Proof[];
  status?: CredentialStatus | CredentialStatus[];
  credentialSchema?: CredentialSchema | CredentialSchema[];
  validFrom?: string;
  validUntil?: string;
};

export class CredentialBuilder {
  protected crendential: VerifiableCredentialV2;

  constructor(
    credentialSubject: CredentialSubject | CredentialSubject[],
    issuer: Issuer
  ) {
    this.crendential = {
      "@context": ["https://www.w3.org/ns/credentials/v2"],
      type: ["VerifiableCredential"],
      credentialSubject,
      issuer,
    };
  }

  withType(type: Type): CredentialBuilder {
    this.crendential.type = Array.isArray(type)
      ? ["VerifiableCredential", ...type]
      : ["VerifiableCredential", type];
    return this;
  }

  withId(id: string): CredentialBuilder {
    this.crendential.id = id;
    return this;
  }

  withName(name: string, lang?: string): CredentialBuilder {
    this.crendential.name = lang ? { "@value": name, "@language": lang } : name;
    return this;
  }

  withDescription(description: string, lang?: string): CredentialBuilder {
    this.crendential.description = lang
      ? { "@value": description, "@language": lang }
      : description;
    return this;
  }

  withValidFrom(validFrom: Date): CredentialBuilder {
    this.crendential.validFrom = validFrom.toISOString();
    return this;
  }

  withValidUntil(validUntil: Date): CredentialBuilder {
    const validFrom = this.crendential.validFrom;
    if (!validFrom) {
      throw new Error("ValidFrom date must be set before ValidUntil date");
    }
    if (new Date(validFrom) > validUntil) {
      throw new Error("ValidUntil date must be greater than ValidFrom date");
    }
    this.crendential.validUntil = validUntil.toISOString();
    return this;
  }

  withProof(proof: Proof | Proof[]): CredentialBuilder {
    this.crendential.proof = proof;
    return this;
  }

  withStatus(status: CredentialStatus | CredentialStatus[]): CredentialBuilder {
    this.crendential.status = status;
    return this;
  }

  withCredentialSchema(
    credentialSchema: CredentialSchema | CredentialSchema[]
  ): CredentialBuilder {
    this.crendential.credentialSchema = credentialSchema;
    return this;
  }

  build(): VerifiableCredentialV2 {
    return this.crendential;
  }
}
