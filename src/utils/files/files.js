import {writeConfigFile} from "./process/config";
import {updatePackageJson} from "./process/packageJson";
import { createBotApp} from "./process/copy";

export async function extensionAppFilesFlow(options, targetFolder) {
  writeConfigFile(options, targetFolder);
  updatePackageJson(options, targetFolder);
}

export async function botFilesFlow(options) {
  await createBotApp(options);
}
