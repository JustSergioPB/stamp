import { EnvelopedVerifiableCredential } from "./enveloped-verifiable-credential";
import { Holder } from "./holder";
import { Id } from "./id";
import { Proof } from "./proof";
import { VerifiablePresentationType } from "./types";
import { VerifiableCredentialV2 } from "./verifiable-credential";

export type VerifiablePresentation = {
  id?: Id;
  type: VerifiablePresentationType;
  verifiableCredential: (
    | VerifiableCredentialV2
    | EnvelopedVerifiableCredential
  )[];
  holder?: Holder;
  proof?: Proof;
};

export class VerifiablePresentationBuilder {
  private id?: Id;
  private type: VerifiablePresentationType = "VerifiablePresentation";
  private verifiableCredential: (
    | VerifiableCredentialV2
    | EnvelopedVerifiableCredential
  )[];
  private holder?: Holder;
  private proof?: Proof;

  constructor(
    verifiableCredential: (
      | VerifiableCredentialV2
      | EnvelopedVerifiableCredential
    )[]
  ) {
    this.verifiableCredential = verifiableCredential;
  }

  public withId(id: Id): VerifiablePresentationBuilder {
    this.id = id;
    return this;
  }

  public withType(
    type: VerifiablePresentationType
  ): VerifiablePresentationBuilder {
    this.type = type;
    return this;
  }

  public withHolder(holder: Holder): VerifiablePresentationBuilder {
    this.holder = holder;
    return this;
  }

  public withProof(proof: Proof): VerifiablePresentationBuilder {
    this.proof = proof;
    return this;
  }

  public build(): VerifiablePresentation {
    return {
      id: this.id,
      type: this.type,
      verifiableCredential: this.verifiableCredential,
      holder: this.holder,
      proof: this.proof,
    };
  }
}
