"use server";

import { CommandResult } from "@lib/command";
import { UserMongoRepository } from "../repositories";
import { MagicLink, Nonce, ResendMailer, CookieSession } from "../utils";

export async function sendMagicLinkCommand(
  email: string,
  lang: string
): Promise<CommandResult<void>> {
  try {
    if (!process.env.RESEND_TOKEN) {
      throw new Error("No resend key found");
    }

    if (!process.env.EMAIL_FROM) {
      throw new Error("No email from found");
    }

    if (!process.env.DOMAIN) {
      throw new Error("No domain found");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("No secret found");
    }

    const userExists = await UserMongoRepository.userExistsByEmail(email);

    if (!userExists) {
      throw new Error("User not found");
    }

    const nonce = Nonce.generate();
    await UserMongoRepository.rotateNonce(email, nonce);
    const magicUrl = await MagicLink.generate(
      process.env.DOMAIN,
      lang,
      email,
      process.env.JWT_SECRET
    );
    await ResendMailer.sendMagicLink(
      process.env.EMAIL_FROM,
      email,
      lang,
      process.env.DOMAIN,
      magicUrl,
      process.env.RESEND_TOKEN
    );

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

    const { nonce, email } = await MagicLink.verify(token, secret);
    const user = await UserMongoRepository.getByEmail(email);

    if (user.nonce !== nonce) {
      throw new Error("Invalid nonce");
    }

    const newNonce = Nonce.generate();
    await UserMongoRepository.rotateNonce(email, newNonce);
    await CookieSession.login({ ...user, nonce: newNonce }, secret);

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

export async function logoutCommand(): Promise<CommandResult<void>> {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("No secret found");
    }

    const user = await CookieSession.getCurrent(process.env.JWT_SECRET);
    const newNonce = Nonce.generate();
    await UserMongoRepository.rotateNonce(user.email, newNonce);
    await CookieSession.logout();

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
