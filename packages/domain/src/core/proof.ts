export type Proof = {
  id?: string;
  type: string; //Must be a dereferenceable URL
  proofPurpose: string; //Must be a dereferenceable URL
  verificationMethod?: string; //Must be a dereferenceable URL
  cryptosuite?: string; //Must be a dereferenceable URL
  created?: string;
  expires?: string;
  domain?: string | string[];
  challenge?: string;
  proofValue?: string;
  previousProof?: string | string[];
  nonce?: string;
};

export class ProofBuilder {
  protected _proof: Proof;

  constructor(type: string, proofPurpose: string) {
    this._proof = {
      type,
      proofPurpose,
    };
  }

  withId(id: string): ProofBuilder {
    this._proof.id = id;
    return this;
  }

  withVerificationMethod(
    verificationMethod: string,
    proofValue: string
  ): ProofBuilder {
    this._proof.verificationMethod = verificationMethod;
    this._proof.proofValue = proofValue;
    return this;
  }

  withCreated(created: Date): ProofBuilder {
    this._proof.created = created.toISOString();
    return this;
  }

  withExpires(expires: Date): ProofBuilder {
    if (this._proof.created && new Date(this._proof.created) > expires)
      throw new Error("Expires date must be greater than created date");
    this._proof.expires = expires.toISOString();
    return this;
  }

  withDomain(domain: string | string[], challenge: string): ProofBuilder {
    this._proof.domain = domain;
    this._proof.challenge = challenge;
    return this;
  }

  withPreviousProof(previousProof: string | string[]): ProofBuilder {
    this._proof.previousProof = previousProof;
    return this;
  }

  withNonce(nonce: string): ProofBuilder {
    this._proof.nonce = nonce;
    return this;
  }

  build(): Proof {
    return this._proof;
  }
}
