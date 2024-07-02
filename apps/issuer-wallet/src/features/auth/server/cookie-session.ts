import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { Session, User } from "../models";

type Cookie = {
  name: string;
  options: {
    httpOnly: boolean;
    sameSite: boolean | "lax" | "strict" | "none" | undefined;
    path: string;
    secure: boolean;
  };
  duration: number;
};

const cookie: Cookie = {
  name: "session",
  options: {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  },
  duration: 4 * 60 * 60 * 1000,
};

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifySession(): Promise<Session | null> {
  const token = cookies().get(cookie.name)?.value;
  const session = token ? await decrypt(token) : null;

  if (!session) {
    redirect("/auth");
  }

  return session;
}

export async function createSession(user: Session): Promise<void> {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt(user);
  cookies().set(cookie.name, session, { ...cookie.options, expires });
  redirect("/app/templates");
}

export function deleteSession(): Promise<void> {
  cookies().delete(cookie.name);
  redirect("/auth");
}

async function encrypt(payload: Session): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("4h")
    .sign(key);
}

async function decrypt(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (error) {
    return null;
  }
}
