import {writeConfigFile} from "./process/config";
import {updatePackageJson} from "./process/packageJson";
import {createExtensionApp} from "./process/copy";

export async function filesFlow(options) {
  writeConfigFile(options);
  updatePackageJson(options);
  await createExtensionApp(options);
}
