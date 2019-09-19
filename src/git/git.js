import {getTemplateProject} from "./process/clone";
import {checkoutBranch} from "./process/checkout";
import {deleteFolderRecursive} from "../files/utils";
import {local} from "../../utils/constants";

export async function gitFlow() {
  deleteFolderRecursive(local);
  await getTemplateProject();
  await checkoutBranch();
}
