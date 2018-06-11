import { homedir } from 'os';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'jsonfile';

const saveFilePath = join(`${homedir()}/git-helper/data`);

function get() {
  return readFileSync(saveFilePath);
}

function save(projects) {
  writeFileSync(saveFilePath, projects);
}

export default {
  get,
  save,
};
