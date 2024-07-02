import { AuditLog } from "../domain/audit-log";

export type CreateAuditLogDTO = Omit<AuditLog, "id" | "timestamp">;
