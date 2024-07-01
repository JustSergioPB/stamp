import MagicLinkEmail from "@components/email/magic-link-email";
import { useTranslation } from "@i18n/server";
import { Resend } from "resend";

export class ResendMailer {
  static async sendMagicLink(
    from: string,
    to: string,
    lang: string,
    domain: string,
    magicUrl: string,
    resendKey: string
  ): Promise<void> {
    const { t } = await useTranslation(lang, "auth");

    await new Resend(resendKey).emails.send({
      from,
      to,
      subject: "Magic link",
      react: MagicLinkEmail({
        magicUrl: magicUrl,
        domainUrl: domain,
        ignoreText: t("ignoreText"),
        redirectText: t("redirectText"),
        promoText: t("promoText"),
      }),
    });
  }
}
