import { z } from "zod";

export const securityZod = z.object({
  authorization: z.boolean().optional(),
  assertion: z.boolean().optional(),
  keyAgreement: z.boolean().optional(),
  capabilityInvocation: z.boolean().optional(),
  capabilityDelegation: z.boolean().optional(),
});

export type SecurityZod = z.infer<typeof securityZod>;

export const defaultSecuritySchema: SecurityZod = {
  authorization: false,
  assertion: false,
  keyAgreement: false,
  capabilityInvocation: false,
  capabilityDelegation: false,
};
