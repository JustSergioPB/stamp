// ===== IT'S OUT OF SCOPE =====
//This is a proposal for the to create new types of VCs
export type SpecificationCategory =
  | "credentialStatus"
  | "credentialSchema"
  | "evidence"
  | "media-type"
  | "securing"
  | "refreshService"
  | "termsOfUse"
  | "vc";

export type CredentialSpecification = {
  name: string;
  summary: string;
  specification: string; //It must be a dereferenceable URL
  category: SpecificationCategory;
  maintainerName: string;
  maintainerEmail: string;
  maintainerWebsite: string;
  vocabulary: string[]; //It must be a dereferenceable URL
};
