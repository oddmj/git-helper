import { homedir } from 'os';
import { readFileSync, writeFileSync } from 'jsonfile';

const saveFilePath = `${homedir()}/git-helper/data`;

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
