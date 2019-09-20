'use strict';

import {local} from "../../utils/constants";
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(local, 'package.json');

export const updatePackageJson = (options) => {
  let rawdata = fs.readFileSync(packageJsonPath);
  let packageJson = JSON.parse(rawdata);
  packageJson.name = options.projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};
