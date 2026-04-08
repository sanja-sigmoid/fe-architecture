export interface AIModel {
  modelName: string;
  huggingFaceModelName: string;
  dateUpdated: number;
  version: string;
  status: number;
  archiveLocation: string;
  setupScripts: Array<string> | null;
}
