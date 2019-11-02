import {local} from "../../../utils/constants";
const fs = require('fs');
const path = require('path');

const configPath = path.join(local, '/extension-app/public/config.js');
const bundlePath = path.join(local, '/extension-app/public/bundle.json');

const getConfigString = (options) => {
  return `const APP_CONFIG = {};
  Object.defineProperties(APP_CONFIG,
    {
      API_ROOT_URL: {
        value: \`https://\${window.location.host}/${options.appId.toLowerCase()}\`,
        writable: false,
      },
      LINK_PREFIX: {
        value: '/${options.appId.toLowerCase()}/app',
        writable: false,
      },
      APP_ROOT_URL: {
        value: '/',
        writable: false,
      },
      APP_ID: {
        value: '${options.appId.toLowerCase()}',
        writable: false,
      },
      APP_TITLE: {
        value: '${options.projectName}',
        writable: false,
      },
      APP_NAV_BAR_TITLE: {
        value: '${options.projectName}',
        writable: false,
      },
      APP_ICON_NAME: {
        value: 'favicon.svg',
        writable: false,
      },
    });

  window.APP_CONFIG = APP_CONFIG;`
};

export const writeConfigFile = (options) => {
  fs.writeFileSync(configPath, getConfigString(options), function (err) {
    if (err) {
      return console.log(err);
    }
  });

  try {
    const bundle = fs.readFileSync(bundlePath);
    const bundleConfig = JSON.parse(bundle);
    bundleConfig.applications[0].id = options.appId;
    bundleConfig.applications[0].name = options.projectName;
    bundleConfig.applications[0].publisher = options.publisher;
    const mangledConfig = JSON.stringify(bundleConfig, null, 2);
    fs.writeFileSync(bundlePath, mangledConfig);
  }catch (e) {
    throw new Error(`Error while processing ${botConfigPath}, with the following error: ${e}`);
  }

};
