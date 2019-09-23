import {getTemplateProject} from "./process/clone";
import {checkoutBranch} from "./process/checkout";

export async function gitFlow() {
  await getTemplateProject();
  await checkoutBranch();
}
