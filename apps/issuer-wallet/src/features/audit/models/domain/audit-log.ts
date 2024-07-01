export const auditOperations = ["create", "update"] as const;
export type AuditOperation = (typeof auditOperations)[number];

export type AuditLog = {
  id: string;
  timestamp: string;
  userId: string;
  operation: AuditOperation;
  collection: string;
  documentId: string;
  changes: object;
};
