import {getTemplateProject} from "./process/clone";

export async function gitFlow(url, absoluteTargetFolder) {
  await getTemplateProject(url, absoluteTargetFolder);
}
