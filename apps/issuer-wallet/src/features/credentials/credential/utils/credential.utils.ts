import { Template } from "@features/credentials/template/models";
import {
  CredentialBuilder,
  CredentialSchema,
  CredentialSubject,
  Issuer,
  VerifiableCredentialV2,
} from "@stamp/domain";
import { IdFactory } from "./id.utils";
import { ValidityUtils } from "./validity.utils";

export class CredentialUtils {
  static emit(
    template: Template,
    issuer: Issuer,
    content: CredentialSubject
  ): VerifiableCredentialV2 {
    //TODO: Think about i18n content and related schema
    if (template.content.id && template.content.id.type) {
      const id = IdFactory.generate(template.content.id.type);
      content.id = id;
    }

    const builder = new CredentialBuilder(
      content,
      `${process.env.DOMAIN}/issuer/${issuer}`
    );

    if (template.base?.name) {
      builder.withName(template.base.name, template.base.lang);
    }

    if (template.base?.description) {
      builder.withDescription(template.base.description, template.base.lang);
    }

    if (template.base?.type) {
      builder.withType(template.base.type);
    }

    if (template.base?.id && template.base.id.type) {
      const id = IdFactory.generate(template.base.id.type);
      builder.withId(id);
    }

    //TODO: Add support for statusList initialization on default value

    if (template.validity) {
      //TODO: Add support for custom start dates
      const { validFrom, validUntil } = ValidityUtils.getRange(
        template.validity
      );
      builder.withValidFrom(validFrom);
      builder.withValidUntil(validUntil);
    }

    //TODO: Content should be validated against the schema
    const schema: CredentialSchema = {
      id: `${process.env.DOMAIN}/json-schema/${template.jsonSchemaId}`,
      type: "JsonSchema",
    };

    builder.withCredentialSchema(schema);

    return builder.build();
  }
}
