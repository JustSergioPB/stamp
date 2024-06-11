import { V2Context } from "./context";
import { CredentialSchema } from "./credential-schema";
import { CredentialSubject } from "./credential-subject";
import { Id } from "./id";
import { Issuer } from "./issuer";
import { LanguageValueObject } from "./language-value-object";
import { Type, VerifiableCredentialType } from "./types";
import { CredentialStatus } from "./credential-status";
import { Proof } from "./proof";

export type VerifiableCredentialV2 = {
  "@context": V2Context;
  id?: Id;
  type: VerifiableCredentialType;
  name?: string | LanguageValueObject;
  description?: string | LanguageValueObject;
  credentialSubject: CredentialSubject | CredentialSubject[];
  issuer: Issuer;
  proof?: Proof;
  status?: CredentialStatus | CredentialStatus[];
  credentialSchema?: CredentialSchema | CredentialSchema[];
  validFrom?: string;
  validUntil?: string;
};

export abstract class CredentialBuilder {
  protected "@context": V2Context;
  protected id?: Id;
  protected type: VerifiableCredentialType = "VerifiableCredential";
  protected name?: string | LanguageValueObject;
  protected description?: string | LanguageValueObject;
  protected credentialSubject: CredentialSubject | CredentialSubject[];
  protected issuer: Issuer;
  protected proof?: Proof;
  protected status?: CredentialStatus | CredentialStatus[];
  protected credentialSchema?: CredentialSchema | CredentialSchema[];
  protected validFrom?: string;
  protected validUntil?: string;

  constructor(
    credentialSubject: CredentialSubject | CredentialSubject[],
    issuer: Issuer
  ) {
    this.credentialSubject = credentialSubject;
    this.issuer = issuer;
  }

  withType(type: Type): CredentialBuilder {
    this.type = Array.isArray(type)
      ? ["VerifiableCredential", ...type]
      : ["VerifiableCredential", type];
    return this;
  }

  withId(id: Id): CredentialBuilder {
    this.id = id;
    return this;
  }

  withName(name: string, lang?: string): CredentialBuilder {
    this.name = lang ? { "@value": name, "@language": lang } : name;
    return this;
  }

  withDescription(description: string, lang?: string): CredentialBuilder {
    this.description = lang
      ? { "@value": description, "@language": lang }
      : description;
    return this;
  }

  withValidFrom(validFrom: Date): CredentialBuilder {
    this.validFrom = validFrom.toISOString();
    return this;
  }

  withValidUntil(validUntil: Date): CredentialBuilder {
    if (this.validFrom && new Date(this.validFrom) > validUntil) {
      throw new Error("ValidUntil date must be greater than ValidFrom date");
    }
    this.validUntil = validUntil.toISOString();
    return this;
  }

  abstract withProof(proof: Proof): CredentialBuilder;

  abstract withStatus(
    status: CredentialStatus | CredentialStatus[]
  ): CredentialBuilder;

  abstract withCredentialSchema(
    credentialSchema: CredentialSchema | CredentialSchema[]
  ): CredentialBuilder;

  build(): VerifiableCredentialV2 {
    return {
      "@context": this["@context"],
      id: this.id,
      type: this.type,
      name: this.name,
      description: this.description,
      credentialSubject: this.credentialSubject,
      issuer: this.issuer,
      proof: this.proof,
      status: this.status,
      credentialSchema: this.credentialSchema,
      validFrom: this.validFrom,
      validUntil: this.validUntil,
    };
  }
}
