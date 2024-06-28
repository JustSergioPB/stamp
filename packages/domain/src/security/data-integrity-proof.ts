import { Proof, ProofBuilder } from "../core";

export type DataIntegrityProof = Omit<Proof, "criptosuite"> & {
  criptosuite: string;
};

export class DataIntegrityProofBuilder extends ProofBuilder {
  constructor(cryptosuite: string, proofPurpose: string) {
    super("DataIntegrityProof", proofPurpose);
    this._proof.cryptosuite = cryptosuite;
  }

  build(): DataIntegrityProof {
    return this._proof as DataIntegrityProof;
  }
}
