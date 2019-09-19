import {getTemplateProject} from "./process/clone";
import {checkoutBranch} from "./process/checkout";
import {deleteFolderRecursive} from "../files/utils";

const local = ".tmp";

export async function gitFlow() {
  deleteFolderRecursive(local);
  await getTemplateProject();
  checkoutBranch();
  // deleteFolderRecursive(local);
}