'use strict';

import {local} from "../../../utils/constants";
import {readFileToJsonObject} from "../utils";
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(local, 'package.json');

export const updatePackageJson = (options) => {
  let packageJson = readFileToJsonObject(packageJsonPath);
  packageJson.name = options.projectName;
  packageJson.description = 'New extension app';
  packageJson.repository.url = 'https://github.com';
  packageJson.author = 'author';
  packageJson.bugs.url = 'https://github.com';
  packageJson.homepage = 'https://github.com';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};
