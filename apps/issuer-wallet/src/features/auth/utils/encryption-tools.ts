import { JWTPayload, SignJWT, jwtVerify } from "jose";

export class EncryptionTools {
  static async encrypt(
    payload: JWTPayload,
    ttl: string | number | Date = "1h",
    secret: string
  ): Promise<string> {
    const key = new TextEncoder().encode(secret);
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(ttl)
      .sign(key);
  }

  static async decrypt(token: string, secret: string): Promise<JWTPayload> {
    const key = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    return payload;
  }
}
