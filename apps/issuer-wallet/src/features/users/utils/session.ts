import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { User } from "../models";
import { cookies } from "next/headers";

export class Session {
  private static async encrypt(payload: JWTPayload): Promise<string> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("No secret found");
    }

    const key = new TextEncoder().encode(secret);
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(key);
  }

  private static async decrypt(token: string): Promise<JWTPayload> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("No secret found");
    }

    const key = new TextEncoder().encode(secret);
    
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["ES256"],
    });

    return payload;
  }

  static async login(user: User): Promise<void> {
    const encrypted = await this.encrypt(user);

    cookies().set("session", encrypted, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }

  static async getCurrent(): Promise<User | null> {
    const token = cookies().get("session")?.value;

    if (!token) {
      return null;
    }

    return (await this.decrypt(token)) as User;
  }

  static async logout(): Promise<void> {
    cookies().set("session", "", { expires: new Date(0) });
  }
}
