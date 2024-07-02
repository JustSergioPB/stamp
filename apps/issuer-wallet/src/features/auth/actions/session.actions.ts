"use server";

import { ActionResult } from "@lib/action";
import { UserMongoRepository } from "../repositories";
import {
  createSession,
  deleteSession,
  generateMagicLink,
  verifyMagicLink,
  verifySession,
} from "../server";
import { Nonce } from "../models";
import MagicLinkEmail from "@components/email/magic-link-email";
import { Resend } from "resend";
import { useTranslation } from "@i18n/server";

export async function sendMagicLinkAction(
  email: string,
  lang: string
): Promise<ActionResult<void>> {
  try {
    if (!process.env.DOMAIN) {
      throw new Error("No domain found");
    }

    if (!process.env.RESEND_TOKEN) {
      throw new Error("No resend key found");
    }

    if (!process.env.EMAIL_FROM) {
      throw new Error("No email from found");
    }

    const user = await UserMongoRepository.getByEmail(email);
    const magicUrl = await generateMagicLink(user.email, user.nonce, lang);
    const { t } = await useTranslation(lang, "auth");

    const mailConfig = {
      magicUrl: magicUrl,
      domainUrl: process.env.DOMAIN,
      ignoreText: t("magicLink.email.ignoreText"),
      redirectText: t("magicLink.email.redirectText"),
      promoText: t("magicLink.email.promoText"),
    };

    await new Resend(process.env.RESEND_TOKEN).emails.send({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Magic link",
      react: MagicLinkEmail(mailConfig),
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

export async function verifyMagicLinkAction(
  token: string
): Promise<ActionResult<void>> {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("No secret found");
    }

    const magicLinkPayload = await verifyMagicLink(token);

    if (!magicLinkPayload) {
      throw new Error("Invalid token");
    }

    const user = await UserMongoRepository.getByEmail(magicLinkPayload.email);

    if (user.nonce !== magicLinkPayload.nonce) {
      throw new Error("Invalid nonce");
    }

    console.log(user);
    await UserMongoRepository.update(user.id, { nonce: Nonce.generate() });
    await createSession(user);

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

export async function logoutAction(): Promise<ActionResult<void>> {
  try {
    const session = await verifySession();

    if (!session) {
      throw new Error("No session found");
    }

    await UserMongoRepository.update(session.id, { nonce: Nonce.generate() });
    deleteSession();

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
