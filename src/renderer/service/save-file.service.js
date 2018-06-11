import { homedir } from 'os';
import { join } from 'path';
import { readJsonSync, outputJsonSync } from 'fs-extra';

const saveFilePath = join(`${homedir()}/git-helper/data`);

function init() {
  try {
    readJsonSync(saveFilePath);
  } catch (e) {
    if (e.code === 'ENOENT') {
      outputJsonSync(saveFilePath, []);
    }
  }
}

function get() {
  return readJsonSync(saveFilePath);
}

function save(projects) {
  outputJsonSync(saveFilePath, projects);
}

export default {
  init,
  get,
  save,
};
