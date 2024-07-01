import { User } from "../models";
import { cookies } from "next/headers";
import { EncryptionTools } from "./encryption-tools";

export class Session {
  static async getCurrent(): Promise<User | null> {
    const token = cookies().get("session")?.value;

    if (!token) {
      return null;
    }

    return (await EncryptionTools.decrypt(token)) as User;
  }
}
