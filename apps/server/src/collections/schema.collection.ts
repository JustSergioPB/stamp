import * as mongodb from "mongodb";

export type SchemaDocument = {
  _id?: mongodb.ObjectId;
  name: string;
};

export const SchemaValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name"],
    properties: {
      name: {
        bsonType: "string",
        description: "'name' must be a string and is required",
      },
    },
  },
};
