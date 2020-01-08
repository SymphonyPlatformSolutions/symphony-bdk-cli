import {getTemplateProject} from "./process/clone";
import {checkoutBranch} from "./process/checkout";

export async function gitFlow(url, branch) {
  await getTemplateProject(url);
  await checkoutBranch(branch);
}
