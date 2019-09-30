import {local} from "../../../utils/constants";
const fs = require('fs');
const path = require('path');

const configPath = path.join(local, '/extension-app/public/config/config.js');

const getConfigString = (options) => {
  console.log(options);
  return `const APP_CONFIG = {};
  Object.defineProperties(APP_CONFIG,
    {
      API_ROOT_URL: {
        value: \`https://\${window.location.host}/${options.projectName.toLowerCase()}\`,
        writable: false,
      },
      LINK_PREFIX: {
        value: '/${options.projectName.toLowerCase()}/app',
        writable: false,
      },
      APP_ROOT_URL: {
        value: '/',
        writable: false,
      },
      APP_ID: {
        value: '${options.projectName.toLowerCase()}',
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
};
