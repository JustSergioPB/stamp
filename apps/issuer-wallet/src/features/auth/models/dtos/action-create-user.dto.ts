import { CreateUserDTO } from "./create-user.dto";

export type ActionCreateUserDTO = Omit<CreateUserDTO, "nonce" | "orgId">;
