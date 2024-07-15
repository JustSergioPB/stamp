"use server";

import { verifySession } from "@features/auth/server";
import { TemplateMongoRepository } from "@features/credentials/template/repositories";
import { ActionResult } from "@lib/action";
import { CredentialSubject, VerifiableCredentialV2 } from "@stamp/domain";
import { CredentialUtils } from "../utils/credential.utils";
import { CredentialMongoRepository } from "../repositories";
import { revalidatePath } from "next/cache";
import { AuditLogMongoRepository } from "@features/audit/repositories";

//TODO: Revisit if sending the credential to client side is a good idea
export async function createCredentialAction(
  templateId: string,
  value: CredentialSubject
): Promise<ActionResult<VerifiableCredentialV2>> {
  try {
    const session = await verifySession();
    const template = await TemplateMongoRepository.getById(templateId);

    if (!session || template.orgId !== session.orgId) {
      throw new Error("Forbidden");
    }

    const credential = CredentialUtils.emit(template, session.id, value);

    if (template.content.isAnonymous) {
      credential.credentialSubject = {};
    }

    const credentialId = await CredentialMongoRepository.create(credential);

    await AuditLogMongoRepository.create({
      userId: session.id,
      operation: "create",
      collection: CredentialMongoRepository.collectionName,
      documentId: credentialId,
      changes: credential,
    });

    revalidatePath(`/${templateId}/credentials/`);
    return { data: credential, errorCode: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      errorCode: "1",
    };
  }
}
