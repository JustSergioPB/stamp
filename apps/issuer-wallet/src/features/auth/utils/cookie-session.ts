import { User } from "../models";
import { cookies } from "next/headers";
import { EncryptionTools } from "./encryption-tools";

export class CookieSession {
  static async getCurrent(secret: string): Promise<User> {
    const token = cookies().get("session")?.value;

    if (!token) {
      throw new Error("No session found");
    }

    return (await EncryptionTools.decrypt(token, secret)) as User;
  }

  static async login(user: User, secret: string): Promise<void> {
    const encrypted = await EncryptionTools.encrypt(user, "1h", secret);

    cookies().set("session", encrypted, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }

  static async logout(): Promise<void> {
    cookies().set("session", "", { expires: new Date(0) });
  }
}
