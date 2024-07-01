import { MagicLinkPayload } from "../models";
import { EncryptionTools } from "./encryption-tools";
import { Nonce } from "./nonce";

export class MagicLink {
  static async generate(
    domain: string,
    lang: string,
    email: string,
    secret: string
  ): Promise<string> {
    const token = await EncryptionTools.encrypt(
      { email, nonce: Nonce.generate() },
      "1m",
      secret
    );
    return `${domain}/${lang}/auth/magic-link?token=${token}`;
  }

  static async verify(
    token: string,
    secret: string
  ): Promise<MagicLinkPayload> {
    return (await EncryptionTools.decrypt(token, secret)) as MagicLinkPayload;
  }
}
