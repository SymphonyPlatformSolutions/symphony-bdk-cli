const fs = require('fs');

const getConfigString = (options) => {
  return `const APP_CONFIG = {};
  Object.defineProperties(APP_CONFIG,
    {
      API_ROOT_URL: {
        value: 'http://localhost:3000',
        writable: false,
      },
      API_EXT_URL: {
        value: 'http://localhost:8080/${options.backendId.toLowerCase()}',
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
        value: 'favicon.png',
        writable: false,
      },
    });

  window.APP_CONFIG = APP_CONFIG;`
};

export const writeConfigFile = (options, targetFolder) => {
  const configPath = `${targetFolder}/extension-app/public/config.js`;
  const bundlePath = `${targetFolder}/extension-app/public/bundle.json`;

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
