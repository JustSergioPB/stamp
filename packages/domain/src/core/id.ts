export const idTypes = ["URL", "DID", "UUID"] as const;
export type IdType = (typeof idTypes)[number];
