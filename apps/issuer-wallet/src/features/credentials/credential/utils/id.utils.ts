import { IdType } from "@stamp/domain";
import { ObjectId, UUID } from "mongodb";

interface IdProvider {
  generate(): string;
}

export class UUIDIdProvider implements IdProvider {
  generate(): string {
    return UUID.generate().toString();
  }
}

export class URLIdProvider implements IdProvider {
  generate(): string {
    return `${process.env.DOMAIN}/credentials/${new ObjectId().toString()}`;
  }
}

export class DidProvider implements IdProvider {
  generate(): string {
    return "";
  }
}

export class IdFactory {
  static generate(type: IdType): string {
    let provider: IdProvider;
    switch (type) {
      case "UUID":
        provider = new UUIDIdProvider();
        break;
      case "URL":
        provider = new URLIdProvider();
        break;
      case "DID":
        provider = new DidProvider();
        break;
    }
    return provider.generate();
  }
}
