import { VerifiableCredentialV2 } from "./verifiable-credential";

// === IT'S OUT OF SCOPE ===
export type ExpandableVerifiableCredentialV2 = VerifiableCredentialV2 & {
  [key: string]: unknown; //When extending context must include extended properties
};
