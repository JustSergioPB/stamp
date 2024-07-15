import { TemplateState } from "../models";

export const invalidTransitions: Record<TemplateState, TemplateState[]> = {
  draft: [],
  private: ["draft", "private"],
  public: ["draft", "private", "public"],
  deprecated: ["draft", "private", "public", "deprecated"],
};
