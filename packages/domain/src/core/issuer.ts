import { Id } from "./id";

export type Issuer = Id | { id: Id; [key: string]: unknown };
