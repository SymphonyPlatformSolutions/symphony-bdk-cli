'use strict';

import {readFileToJsonObject} from "../utils";
const fs = require('fs');

export const updatePackageJson = (options, targetFolder) => {
  const packageJsonPath = `${targetFolder}/package.json`;
  let packageJson = readFileToJsonObject(packageJsonPath);
  packageJson.name = (options.projectName||'');
  packageJson.description = (options.description||'New extension app');
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};
