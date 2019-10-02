import {writeConfigFile} from "./process/config";
import {updatePackageJson} from "./process/packageJson";
import {createExtensionApp, createBotApp} from "./process/copy";

export async function extensionAppFilesFlow(options) {
  writeConfigFile(options);
  updatePackageJson(options);
  await createExtensionApp(options);
}

export async function botFilesFlow(options) {
  await createBotApp(options);
}
