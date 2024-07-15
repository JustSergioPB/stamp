import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { MagicLinkPayload } from "../models";

const key = new TextEncoder().encode(process.env.MAGIC_SECRET);
const domain = process.env.DOMAIN;

export async function generateMagicLink(
  email: string,
  nonce: number,
  lang: string
): Promise<string> {
  const token = await encrypt({ email, nonce });
  return `${domain}/${lang}/auth/magic-link?token=${token}`;
}

export async function verifyMagicLink(
  token: string
): Promise<MagicLinkPayload | null> {
  return await decrypt(token);
}

async function encrypt(payload: MagicLinkPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1m")
    .sign(key);
}

async function decrypt(token: string): Promise<MagicLinkPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as MagicLinkPayload;
  } catch (error) {
    return null;
  }
}
