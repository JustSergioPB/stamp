"use server";

import { CommandResult } from "@lib/command";
import { UserMongoRepository } from "../repositories";
import { Resend } from "resend";
import MagicLinkEmail from "@components/email/magic-link-email";
import { useTranslation } from "@i18n/server";
import { Session } from "../utils/session";
import { EncryptionTools } from "../utils/encryption-tools";
import { MagicLink, User } from "../models";
import { cookies } from "next/headers";

export async function sendMagicLinkCommand(
  email: string,
  lang: string
): Promise<CommandResult<void>> {
  try {
    const resendKey = process.env.RESEND_TOKEN;
    const emailFrom = process.env.EMAIL_FROM;
    const domain = process.env.DOMAIN;
    const secret = process.env.JWT_SECRET;

    if (!resendKey) {
      throw new Error("No resend key found");
    }

    if (!emailFrom) {
      throw new Error("No email from found");
    }

    if (!domain) {
      throw new Error("No domain found");
    }

    if (!secret) {
      throw new Error("No secret found");
    }

    const userExists = await UserMongoRepository.userExistsByEmail(email);
    const nonce = Math.floor(Math.random() * 1000000);
    await UserMongoRepository.rotateNonce(email, nonce);

    if (!userExists) {
      throw new Error("User not found");
    }

    const magicLink = await EncryptionTools.encrypt(
      { email, nonce },
      "1m",
      secret
    );
    const resend = new Resend(resendKey);
    const url = `${domain}/${lang}/auth/magic-link?token=${magicLink}`;

    const { t } = await useTranslation(lang, "auth");

    await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: "Magic link",
      react: MagicLinkEmail({
        magicUrl: url,
        domainUrl: domain,
        ignoreText: t("ignoreText"),
        redirectText: t("redirectText"),
        promoText: t("promoText"),
      }),
    });

    return {
      data: null,
      errorCode: null,
    };
  } catch (error: unknown) {
    console.error(error);

    if ((error as Error).message === "User not found") {
      return {
        data: null,
        errorCode: "2",
      };
    }

    return {
      data: null,
      errorCode: "1",
    };
  }
}

export async function verifyMagicLinkCommand(
  token: string
): Promise<CommandResult<void>> {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("No secret found");
    }

    const { nonce, email } = (await EncryptionTools.decrypt(
      token
    )) as MagicLink;
    const user = await UserMongoRepository.getByEmail(email);

    if (user.nonce !== nonce) {
      throw new Error("Invalid nonce");
    }

    const newNonce = Math.floor(Math.random() * 1000000);
    await UserMongoRepository.rotateNonce(email, newNonce);
    const userWithoutNonce = { ...user, nonce: undefined };
    const encrypted = await EncryptionTools.encrypt(
      userWithoutNonce,
      "1h",
      secret
    );

    cookies().set("session", encrypted, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return {
      data: null,
      errorCode: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}

export async function getCurrent(): Promise<User | null> {
  const token = cookies().get("session")?.value;

  if (!token) {
    return null;
  }

  return (await EncryptionTools.decrypt(token)) as User;
}

export async function logoutCommand(): Promise<CommandResult<void>> {
  try {
    const user = await Session.getCurrent();

    if (!user) {
      throw new Error("No user found");
    }

    const newNonce = Math.floor(Math.random() * 1000000);
    await UserMongoRepository.rotateNonce(user.email, newNonce);
    cookies().set("session", "", { expires: new Date(0) });

    return {
      data: null,
      errorCode: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}
