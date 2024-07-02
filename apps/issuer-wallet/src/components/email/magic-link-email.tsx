import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Tailwind,
  Img,
} from "@react-email/components";
import * as React from "react";
import * as TailwindConfig from "tailwind.config";

type Props = {
  magicUrl: string;
  domainUrl: string;
  ignoreText: string;
  redirectText: string;
  promoText: string;
};

export default function MagicLinkEmail({
  magicUrl,
  domainUrl,
  ignoreText,
  redirectText,
  promoText,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Log in with this magic link</Preview>
      <Tailwind config={TailwindConfig}>
        <Body className="bg-slate-50">
          <Container className="px-3 my-0 mx-auto">
            <Heading className="text-2xl font-bold my-10 mx-0 p-0">
              Login
            </Heading>
            <Link
              href={magicUrl}
              target="_blank"
              className="text-blue-500 text-sm underline block mb-4"
            >
              {redirectText}
            </Link>
            <Text className="text-sm m-6 mx-0">{ignoreText}</Text>
            <Img
              src={`${domainUrl}/logo.png`}
              width="32"
              height="32"
              alt="Vericert's Logo"
            />
            <Text className="text-xs leading-5 mt-3 mb-6">
              <Link
                href={domainUrl}
                target="_blank"
                className="text-blue-500 text-sm underline"
              >
                Vericert Issuer
              </Link>
              {promoText}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
