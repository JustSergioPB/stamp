import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageProvider: "v8",
  testPathIgnorePatterns: [".mock.ts"],
};

export default config;
