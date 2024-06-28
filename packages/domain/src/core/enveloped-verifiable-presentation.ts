import { EnvelopedVerifiablePresentationType } from "./types";

export type EnvelopedVerifiablePresentation = {
  "@context": string;
  id: string;
  type: EnvelopedVerifiablePresentationType;
};
