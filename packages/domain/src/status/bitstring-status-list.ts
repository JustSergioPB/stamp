import { StatusMessage } from "./status-message";
import { BitstringStatusListType } from "./types";

export type BitstringStatusList = {
  type: BitstringStatusListType;
  statusPurpose: string | string[];
  statusSize?: number;
  statusMessage?: StatusMessage[];
  encodedList: string;
};
