import { z } from "zod";

export const securitySchema = z.object({
  authorization: z.boolean().optional(),
  assertion: z.boolean().optional(),
  keyAgreement: z.boolean().optional(),
  capabilityInvocation: z.boolean().optional(),
  capabilityDelegation: z.boolean().optional(),
});

export type SecuritySchema = z.infer<typeof securitySchema>;
